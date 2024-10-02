import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Form, Button, Upload } from "antd";

import type { RcFile } from "antd/es/upload";

import { PlusOutlined } from "@ant-design/icons";

//* above are the default imports

//* Room for additional imports
import ImgCrop from "antd-img-crop";

//* Application imports
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { DocType } from "../../../common/types/DocType";
import { modul_props } from "../modul_props";
import { FormTool_IPC } from "../../../frontend/tools/FormTool_IPC";
import { Artist } from "../../../common/custom/types/documents/DocArtist";
import { IPC_DATABASE } from "../../../common/framework/types/system/IPC_Channels";
import { DB_Request, Action_Request } from "../../../common/framework/types/system/RequestTypes";
import { MyInputURLField } from "../../../frontend/custom/components/myInputFields";

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function ArtistForm() {

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string = modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Artist>(new Artist());
  const triggerSaveRef = React.useRef(null);

  const [uploading, setUploading] = useState(false);

    useEffect(() => {
    // Beim laden der Seite...
    //* Wird einmalig beim Laden der Seite ausgeführt.
    const request: DB_Request = {
      request_type: "request:data-from-id",
      doctype: modul_props.doctype,
      id: id,
      request_options: ["use_relation"],
    };

    const buaUnsubscribe_func = FormTool_IPC.init_and_load_data<any>({
      // TODO <Artist> statt <any>
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
    FormTool_IPC.save_data<Artist>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Artist) => {
      //! has new rev from backend
      setDataOrigin(result);
    });
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  const [dataAvatarImageAsBase64, setDataAvatarImageAsBase64] =
    useState<string>();

  /**
   * Encodes the Avatar Image as a bas64 string.
   *
   * @param file The File
   * @returns Promise
   */
  function getAvatarImageAsBase64(file: RcFile): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Validating the Avatar Image, and load manually.
   *
   * @param file
   * @returns
   */
  const onAvatarBeforeUpload = (file: RcFile) => {
    console.log(`onAvatarBeforeUpload`);
    console.log(file);

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      // TODO: message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // TODO: message.error('Image must smaller than 2MB!');
    }

    // Upload files manually after 'onAvatarBeforeUpload' returns false.
    getAvatarImageAsBase64(file as RcFile)
      .then((value) => {
        setDataAvatarImageAsBase64(value);
        return value;
      })
      .catch((value) => console.log(`error: ${value}`));

    return false;
  };

  /**
   * I do the Upload the Avatar Image manually, and do not use the internal Ajax upload,
   * so this function does nothing?
   *
   * @param info
   * @returns
   */
  function onAvatarHandleUpload(info: UploadChangeParam<UploadFile>) {
    // TODO Sind die Pakete korrekt?
    console.log(`onAvatarHandleUpload`);
    console.log(info);
  }

  /**
   * The Avatar Images Upload Button.
   */
  const buttonUploadAvatar = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
        initialValues={{ remember: true }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Bild" name="image">
          <ImgCrop rotationSlider>
            <Upload
              maxCount={1}
              listType="picture-card"
              className="avatar-uploader"
              action=""
              showUploadList={false}
              beforeUpload={onAvatarBeforeUpload}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={onAvatarHandleUpload}
            >
              {dataAvatarImageAsBase64 ? (
                <img
                  src={dataAvatarImageAsBase64}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                buttonUploadAvatar
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Namen eingeben." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Künstlername" name="alias">
          <Input />
        </Form.Item>
        <Form.Item label="Geburtstag" name="birthdate">
          <Input />
        </Form.Item>
        <Form.Item label="Postleitzahl" name="postalCode">
          <Input />
        </Form.Item>
        <Form.Item label="Ort" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Strasse und Hausnummer" name="street">
          <Input />
        </Form.Item>
        <Form.Item label="Webseite" name="url">
          <MyInputURLField />
        </Form.Item>
        <Form.Item label="eMail" name="mail">
          <Input />
        </Form.Item>
        <Form.Item label="Telefon" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a note." />
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