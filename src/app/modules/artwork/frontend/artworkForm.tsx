import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import { Typography, Input, Form, Button, Switch } from "antd";

import { DocType } from "../../../common/types/DocType";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { DB_Request } from "../../../common/types/RequestTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Action_Request } from "../../../common/types/RequestTypes";
import { FormTool } from "../../../frontend/FormTool";
import { Artwork } from "../../../common/types/DocArtwork";
import { MySelectMulti_Input } from "../../../frontend/mySelectMulti_Input";
import { MyAttachments_ImagesMeta_Input } from "../../../frontend/myAttachments_ImagesMeta_Input";
import { AttachmentMeta } from "../../../common/types/AttachmentTypes";
import { MyDatePickerInput } from "../../../frontend/myDatePickerInput";
import { My_Price_Input } from "../../../frontend/myPrice_Input";

import MyTags_Input from "../../../frontend/myTags_Input";
import { My_Marker_Input } from "../../../frontend/myMarker_Input";

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
 * siehe: AttachmentTool.performActionsBeforeUpload()
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @return {ArtworkForm}
 */
function ArtworkForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const doclabel: string = "Werk";
  const doctype: DocType = "artwork";
  const segment: string = "artworks";

  const [form] = Form.useForm();
  // The id is passed as a parameter, and is
  // either: 'new', or a uuid
  const { id } = useParams();

  const [dataOrigin, setDataOrigin] = useState<Artwork>(null);
  const [uploading, setUploading] = useState(false);
  const triggerSaveRef = React.useRef(null);

  useEffect(() => {
    // Executed once when the page is loaded.
    // behavier depends on id, which is an uuid, or 'new'
    // we request form data,
    // or a new empty Formdata-Object with an fresh uuid.
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info("Request some data from backend...");
    Header_Buttons_IPC.request_buttons({
      viewtype: "form",
      doctype: doctype,
      doclabel: doclabel,
      id: id, // is perhaps id='new'
      surpress: false,
      options: {},
    });

    if (id != "new") {
      //! Request Document from Database
      const request: DB_Request = {
        type: "request:data",
        doctype: doctype,
        id: id,
        options: {},
      };

      window.electronAPI
        .invoke_request(IPC_DATABASE, [request])
        .then((result: any) => {
          setDataOrigin(result[segment][0]); //
          form.setFieldsValue(result[segment][0]);
          App_Messages_IPC.request_message(
            "request:message-info",
            App_Messages_IPC.get_message_from_request(request.type, doclabel)
          );
        })
        .catch(function (error: any) {
          App_Messages_IPC.request_message(
            "request:message-error",
            error instanceof Error ? `Error: ${error.message}` : ""
          );
        });
    }

    //! Listen for Header-Button Actions.
    // Register and remove the event listener
    const buaUnsubscribe = window.electronAPI.listen_to(
      "ipc-button-action",
      (response: Action_Request) => {
        if (response.target === doctype && response.view == "form") {
          console.log("AddressForm says ACTION: ", response);
          triggerSaveRef.current?.click();
          // message.info(response.type);
        }
      }
    );

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    let ft: FormTool<Artwork> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Artwork) => {
        //! has new _rev from backend
        setDataOrigin(result);
        // update header-button-state because uuid has changed from 'new' to uuid.
        Header_Buttons_IPC.request_buttons({
          viewtype: "form",
          doctype: doctype,
          doclabel: doclabel,
          id: result.id, // is perhaps id='new'
          surpress: false,
          options: {},
        });
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
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
          <MySelectMulti_Input ipc_request="request:artists-find-custom" />
        </Form.Item>
        <Form.Item label="Bilder vom Kunstwerk" name="attachmentsMeta">
          <MyAttachments_ImagesMeta_Input
            doc_id={id}
            module_id={doctype}
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
          <Input />
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
          <My_Marker_Input />
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

export default ArtworkForm;
