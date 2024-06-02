/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Space, Typography, Input, Form, Button } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";

//* above are the default imports

//* Room for additional imports

//* Application imports
import RequestFactory from "../../../common/backend/RequestFactory";

import FormTools from "../../../common/frontend/FormTools";
import FormPropertiesInterface from "../../../common/frontend/types/FormPropertiesInterface";
import MyDatePickerInput from "../../../common/frontend/myDatePickerInput";
import MyTagsInput from "../../../common/frontend/myTagsInput";
import MyAttachmentsMetaInput from "../../../common/frontend/myAttachmentsMetaInput";
import {
  AttachmentTool,
  AttachmentToolReturnValue,
} from "../../../common/frontend/AttachmentTool";

// TODO Test Logger
import log from "electron-log/renderer";
import { AttachmentMeta } from "../../../common/frontend/types/AttachmentTypes";
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

  const moduleId = "artwork";

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const [form] = Form.useForm();

  // The id is passed as a parameter, and is
  // either: 'new', or a uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState(null);
  const props: FormPropertiesInterface = {
    id,
    moduleLabel: "Werk",
    moduleId,
    requests: RequestFactory.getFormRequestsFor(moduleId, "ipc-database"),
    segment: `${moduleId}s`,
  };

  const [uploading, setUploading] = useState(false);

  // Custom Title and Save-Button
  // depends on Formulars Modus ('new' or 'edit' content from uuid)
  const theTitle =
    id === "new"
      ? `Neues ${props.moduleLabel} hinzufügen`
      : `${props.moduleLabel} bearbeiten`;
  const theSaveButtonLabel =
    id === "new" ? "Werk anlegen" : "Änderungen speichern";

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */

  useEffect(() => {
    // Executed once when the page is loaded.
    // behavier depends on id, which is an uuid, or 'new'
    // we request form data,
    // or a new empty Formdata-Object with an fresh uuid.
    FormTools.loadDataRequest(props.requests, id);
  }, []);

  // TODO dataOrigin brauch ich ier nicht - es sei denn...
  // ich ziehe die callback logik auch noch in die Funktion.
  // Das wäre vielleicht sinnvoll weil das echt für alle Forms gleich ist? 
  FormTools.loadDataResponse(dataOrigin, props, (data: any) => {
    // We keep the original data,
    // to check later if anything has changed.
    setDataOrigin(data);

    // TODO: Das ich hier auf .segment][0] gehe ist auch gefährlich.
    // Ich sollte das Dokument mit der ID suchen statt die [0] zu nehmen...
    console.log("####### SET FIELDS VALUE", data[props.segment][0]);
    form.setFieldsValue(data[props.segment][0]);
  });

  const onFormFinish = (valuesForm: any) => {
    // Lets submit the Formdata to the backend.

    // before, we have to add the
    // new Attachment Metadata & Attachments to the Form-Data
    // and identify and separate the attachment-actions
    const result: AttachmentToolReturnValue =
      AttachmentTool.performActionsBeforeUpload(valuesForm, dataOrigin[props.segment][0]);

    valuesForm.attachmentsMeta = result.attachmentsMeta;
    const { attachmentActions } = result; //* this Equals: const attachmentActions: AttachmentActions[] = result.attachmentActions;

    setUploading(true);

    FormTools.saveDataRequest(
      id,
      dataOrigin,
      valuesForm,
      attachmentActions, // TODO: Nutze ich momentan im Backend nicht ...
      props
    );
  };

  FormTools.saveDataResponse(dataOrigin, props, (result: any) => {
    setUploading(false);
    // We keep the original data,
    // to check later if anything has changed.
    if (dataOrigin !== undefined && dataOrigin !== null) {
      if (dataOrigin[props.segment][0].id === result.data.id) {
        //* update rev
        // The ID should of course match...
        // The rev ID is transferred so that I can save again...
        // TODO wie mit einem Konflikt umgehen... (Konfliktmeldung)
        // TODO dataOrigin ist possibly nicht definiert:
        dataOrigin[props.segment][0].rev = result.data.rev;

        //! setDataOrigin(dataOrigin);
        // TODO: Das ich hier auf .segment][0] gehe ist auch gefährlich.
        // Ich sollte das Dokument mit der ID suchen statt die [0] zu nehmen...

        // TODO Hier gibt es data nicht:
        //! console.log('####### SET FIELDS VALUE', data[props.segment][0]);
        //! form.setFieldsValue(data[props.segment][0]);
      }
    }
  });

  const onFormFinishFailed = (errorInfo: any) => {
    // TODO ? {error, reason, status, name, message, stack, docId }
    console.info("Failed:", errorInfo);
  };

  const onFormReset = () => {
    form.resetFields();
  };

  const onFormFill = () => {
    form.setFieldsValue({
      title: "Eine Notiz",
    });
  };

  const onFormClose = (key: any) => {
    console.log("---------- onFormClose", key);
    navigate(FormTools.getGotoViewPath(props.moduleId, id));
  };

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */

  return (
    <div>
      <Title level={3}>{theTitle}</Title>
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space wrap>
            <Button type="dashed" htmlType="button" onClick={onFormClose}>
              <CloseCircleOutlined /> Close Form
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              // disabled={fileList.length === 0}
              loading={uploading}
            >
              <UploadOutlined /> {theSaveButtonLabel}
            </Button>
            <Button htmlType="button" onClick={onFormReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFormFill}>
              Fill form
            </Button>
          </Space>
        </Form.Item>

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

        <Form.Item label="Bilder vom Kunstwerk" name="attachmentsMeta">
          <MyAttachmentsMetaInput
            onChange={(value:AttachmentMeta[] ) => {
              console.log(
                "artworkForm -> MyAttachments -> ValueChanged:", value
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
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote." />
        </Form.Item>
        <Form.Item label="Beschreibung lang" name="description_long">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote." />
        </Form.Item>
        <Form.Item label="Implementation" name="implementation">
          <Input />
        </Form.Item>
        <Form.Item label="Werkzeuge" name="tool">
          <Input />
        </Form.Item>
        <Form.Item label="Unverkäuflich" name="forsale">
          <Input />
        </Form.Item>
        <Form.Item label="Preis" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote." />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <MyTagsInput
            onChange={(value: any) => {
              console.log("artworkForm -> MyTags -> ValueChanged:", value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

/*

        <Form.Item
          label="Hidden Attachments Fields (to get them into the formData)"
          name="attachments"
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>

*/

export default ArtworkForm;
