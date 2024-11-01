import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Input, Form, Button, Switch } from "antd";

import { DocType } from "../../../../common/types/DocType";
import { FormTool_IPC } from "../../../../frontend/framework/tools/FormTool_IPC";
import { AttachmentMeta } from "../../../../common/types/AttachmentTypes";

import { modul_props } from "../modul_props";
import { Artwork } from "../../../../common/custom/types/documents/DocArtwork";
import { IPC_DATABASE } from "../../../../common/framework/types/system/IPC_Channels";
import { DB_Request, Action_Request } from "../../../../common/framework/types/system/RequestTypes";
import { MyAttachments_ImagesMeta_Input } from "../../../../frontend/custom/components/myAttachments_ImagesMeta_Input";
import { My_Marker_Input } from "../../../../frontend/custom/components/myMarker_Input";
import { My_Price_Input } from "../../../../frontend/custom/components/myPrice_Input";
import { MySelectMulti_Input } from "../../../../frontend/custom/components/mySelectMulti_Input";
import MyTags_Input from "../../../../frontend/custom/components/myTags_Input";
import { AttachmentTool, AttachmentToolReturnValue } from "../../../../frontend/framework/tools/AttachmentTool";

import { MyDatePickerInput } from "../../../../frontend/custom/components/myDatePickerInput";

// log.info('########################################### Log from the renderer process');
// log.info() wird auf der Konsole im Backend ausgegeben.
// Der electron-log hab ich in main.ts so konfiguriert, das er die console.log('') einfängt und ins backend weiter leitet.
// so kann ich die Ausgaben auch weiterhin im Browser angucken.
/*
ipcRenderer.send('__ELECTRON_LOG__', {
  // LogMessage-like object
  data: ['Log from a renderer'],
  level: 'info',
  // ... some other optional fields like scope, logId and so on
});
*/

/**
 * React Component: Formular for the Modul Artwork.
 *
 * Die Attachments selber werden nicht aus dem Daten-Obekt in das Formluar übernommen.
 * Ich arbeite ua. deshalb mit eigenen AttachmentMeta Daten im Formular,
 * die immer den aktuellen Stand spiegeln,
 * und actions enthalten, die vor dem Speichern ausgeführt werden können,
 * oder später im Backend.
 *
 * @see AttachmentTool.performActionsBeforeUpload()
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @return {ArtworkForm}
 */
export function ArtworkForm() {

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string = modul_props.segment;

  const [form] = Form.useForm();
  // The id is passed as a parameter, and is
  // either: 'new', or a uuid
  const { id } = useParams();

  const [dataOrigin, setDataOrigin] = useState<Artwork>(new Artwork());
  const [uploading, setUploading] = useState(false);
  const triggerSaveRef = React.useRef(null);

    useEffect(() => {
    // Beim laden der Seite...
    // Executed once when the page is loaded.
    // behavier depends on id, which is an uuid, or 'new'
    // we request form data,
    // or a new empty Formdata-Object with an fresh uuid.
    //* Wird einmalig beim Laden der Seite ausgeführt.
    const request: DB_Request = {
      request_type: "request:data-from-id",
      doctype: modul_props.doctype,
      id: id,
      request_options: ["use_relation"],
    };

    const buaUnsubscribe_func = FormTool_IPC.init_and_load_data<any>({
      // TODO <Address> statt <any>
      viewtype: "form",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-database",

      surpress_buttons: false,
      setDataCallback: function (result: any): void {
        setDataOrigin(result[segment][0]);
        form.setFieldsValue(result[segment][0]);
      },
      doButtonActionCallback: function (response: Action_Request): void {
        if (response.request_type === "request:save-action") {
          triggerSaveRef.current?.click();
        }
        if (response.request_type === "request:show-settings-dialog-action") {
          console.log(
            `Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`
          );
        }
      },
    });


    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {

    //! Error: Error invoking remote method 'ipc-database': {"status":409,"name":"conflict","message":"Document update conflict"}
    // https://stackoverflow.com/questions/24450495/pouchdb-conflict-resolution

    // before, we have to add the
    // new Attachment Metadata & Attachments to the Form-Data
    // and identify and separate the attachment-actions
    const result: AttachmentToolReturnValue =
      AttachmentTool.performActionsBeforeUpload(valuesForm, dataOrigin);
    valuesForm.attachmentsMeta = result.attachmentsMeta;

    //TODO Hier passiert ein conflict-fehler wenn nix am Datensatz geändert wurde, aber ein neues Attachment angehängt wird. 
    const request: DB_Request = {
      request_type: "request:save",
      doctype: modul_props.doctype,
      request_options: ["use_relation"],
    };
    
    FormTool_IPC.save_data<Artwork>({
      request: request,
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Artwork) => {
      //! has new rev from backend
      setDataOrigin(result);
    });
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
  };

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{
          dateCreation: {
            dateMode: "dateMoment",
            dateType: "year",
            dateFormat: "YYYY",
            date: ["2023-01-01"],
          },
        }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Werktitel"
          name="title"
          rules={[
            { required: true, message: "Bitte den Titel des Werkes angeben!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Untertitel" name="title_addition">
          <Input />
        </Form.Item>
        <Form.Item label="Künstler" name="artists">
          <MySelectMulti_Input doctype="artist" segment="artists" />
        </Form.Item>
        <Form.Item label="Bilder vom Kunstwerk" name="attachmentsMeta">
          <MyAttachments_ImagesMeta_Input
            id={id}
            doctype={doctype}
            onChange={(value: AttachmentMeta[]) => {
              console.log(
                "artworkForm -> MyAttachments -> ValueChanged:",
                value
              );
            }}
          />
        </Form.Item>

        <Form.Item label="Datum" name="dateCreation">
          {/* @ts-ignore */}
          <MyDatePickerInput
            onChange={(value: any) => {
              console.log(
                "artworkForm -> MyDatePicker -> ValueChanged:",
                value
              );
            }}
          />
        </Form.Item>

        <Form.Item label="Thema" name="topic">
          <Input />
        </Form.Item>
        <Form.Item label="Genres" name="genres">
          <MySelectMulti_Input doctype="genre" segment="genres" />
        </Form.Item>
        <Form.Item label="Beschreibung kurz" name="description_short">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>
        <Form.Item label="Beschreibung lang" name="description_long">
          <Input.TextArea rows={4} placeholder="Please enter a Description" />
        </Form.Item>
        <Form.Item label="Implementation" name="implementation">
          <Input />
        </Form.Item>
        <Form.Item label="Werkzeuge" name="tool">
          <Input />
        </Form.Item>
        <Form.Item label="Verkäuflich?" name="forsale">
          <Switch />
        </Form.Item>
        <Form.Item label="Preis" name="price">
          <My_Price_Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <MyTags_Input
            onChange={(value: any) => {
              console.log("artworkForm -> MyTags -> ValueChanged:", value);
            }}
          />
        </Form.Item>
        <Form.Item label="Markierungen" name="labels">
          <My_Marker_Input />
        </Form.Item>
        <Form.Item label="Dateianhänge" name="labels">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            ref={triggerSaveRef}
            style={{ display: "none" }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
