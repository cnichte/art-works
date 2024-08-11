import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Input, Form, Button, Upload } from "antd";

import type { RcFile } from "antd/es/upload";

import { PlusOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router";
//* above are the default imports

//* Room for additional imports
import ImgCrop from "antd-img-crop";

//* Application imports
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { FormPropertiesInterface } from "../../../common/types/FormPropertiesInterface";
import { DocType } from "../../../common/types/DocType";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { DB_Request } from "../../../common/types/RequestTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Action_Request } from "../../../common/types/RequestTypes";
import { Artist } from "../../../common/types/DocArtist";
import { FormTool } from "../../../frontend/FormTool";
import { MyInputURLField } from "../../../frontend/myInputFields";
import { modul_props } from "../modul_props";

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function ArtistForm() {
  const navigate = useNavigate();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string = modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Artist>(null);
  const triggerSaveRef = React.useRef(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
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
    let ft: FormTool<Artist> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Artist) => {
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