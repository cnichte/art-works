/* eslint-disable no-unused-vars */
import { useState } from "react";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { Button, Upload, message, Card, Col, Row, Space, Slider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { AttachmentMeta } from "./types/AttachmentTypes";
import MyAttachmentsMetaView from "./myAttachmentsMetaView";

/* Momentan arbeitet das mit Bildern. */

/* ==========================================================

    * Helper Functions

   ========================================================== */

/**
 * Helper Function, to load an Image via Filereader
 * from the Filesysten, and return it as Base64 String
 *
 * @param {RcFile} file
 * @return {*}  {Promise<string>}
 */
const getImageAsBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/* ==========================================================

    * MyAttachmentsMetaInput - ReactNode / Main Component.

   ========================================================== */

/**
 * The React-Property Definition of MyAttachmentsMetaInput React-Component.
 *
 * 'value' and 'onChange' must necessarily be called exactly that,
 * because they are used by the parent Andt Form.Item.
 * Dont rename them.
 *
 * @interface Props
 */
interface Props {
  id?: string;
  value?: AttachmentMeta[];
  onChange?: (value: AttachmentMeta[]) => void;
}

/**
 ** MyAttachmentsMetaInput - React Component.
 *
 * When I work with attachments, I work with my own extended metadata, because the
 * PouchDB attachments don't offer enough options.
 *
 * So I only work with the metadata in the view,
 * until the original document is to be downloaded,
 * or until actions are performed: upload, remove, download.
 *
 ** This is a 'Customized or third-party form control'
 * https://ant.design/components/form
 * Customized or third-party form controls can be used in Form, too. Controls must follow these conventions:
 * It has a controlled property value or other name which is equal to the value of valuePropName.
 * It has event onChange or an event which name is equal to the value of trigger.
 * Forward the ref or pass the id property to dom to support the scrollToField method.
 *
 * @param {Props} - React / Antd Properties
 * @return {*}  {*}
 */
function MyAttachmentsMetaInput({ id, value = [], onChange }: Props): any {
  // console.log('MyAttachmentsMeta - value', value);

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  // { uid: '-1', name: 'image.png', status: 'done | uploading | error', url: '', },
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  /* ----------------------------------------------------------

    Actions

    ---------------------------------------------------------- */

  const triggerChange = (changedValue: any) => {
    // https://www.mediaevent.de/javascript/spread-operator.html
    // mixe das geänderte Objekt zusammen...
    onChange?.(changedValue);
  };

  const uploadProps: UploadProps = {
    listType: "picture",
    // showUploadList: true,
    multiple: true,
    accept: ".png,.jpg,.jpeg",
    className: "upload-list-inline",
    defaultFileList: fileList,
    // fileList,
    beforeUpload(file) {
      console.log("Upload - beforeUpload", file);

      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }

      getImageAsBase64(file as RcFile)
        .then((b64URLdata) => {
          // create a nice uuid
          const uuid = uuidv4();

          // Prepare Attachment
          // TODO create a smaller preview as base64String...
          value.push({
            id: uuid,
            filename: file.name,
            mimetype: file.type,
            title: "A Title",
            description: "A brief description...",
            is_cover: false,
            preview: b64URLdata, // TODO smaller preview image

            // action is a temporary 'sidecar'
            action: {
              name: "upload",
              attachment: {
                id: uuid,
                content_type: file.type,
                data: b64URLdata,
              },
            },
          });
/*
          [
            {
              id: "1617958d-20db-440d-b590-5aff396e521a",
              filename: "carsten-nichte-binary-voids-9432-web.jpg",
              mimetype: "image/jpeg",
              title: "A Title",
              description: "A brief description...",
              preview: "...",
              action: {
                name: "upload",
                id: "1617958d-20db-440d-b590-5aff396e521a",
                attachment: { content_type: "image/jpeg", data: "..." },
              },
            },
          ];
*/
          triggerChange(value);

          return value;
        })
        .catch((v: any) => console.log(`error: ${v}`));

      setFileList([...fileList, file]);
      
      /*
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob((result) => resolve(result as any));
        };
      };
*/
      return false; // surpresses auto upload?
    },
    // name: 'imageUpload',
    // maxCount: 1,
    // action: '',
    onChange(info: { file: { status?: any; name?: any }; fileList: any }) {
      console.log("Upload - onChange", info);
      // setFileList(fileList);
      /*
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
*/
    },
    onRemove: (file) => {
      console.log("Upload - onRemove", file);

      // Remove Meta/Job from the list.
      value?.every((metaItem) => {
        if (file.name === metaItem.filename) {
          const index = value.indexOf(metaItem);
          const newMetaList = value.slice();
          newMetaList.splice(index, 1);
          triggerChange(newMetaList);
          return false; // break
        }
        return true; // continue next
      });
    },
    onDrop(e) {
      console.log("Upload - onDrop", e.dataTransfer.files);
    },
  };

  /* ----------------------------------------------------------

     View -  Data gets dynamically adjusted

    ---------------------------------------------------------- */
  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<PlusOutlined />}>Bilder hinzufügen</Button>
      </Upload>

      <MyAttachmentsMetaView
        value={value}
        columns={3}
        gap={10}
        textNoImages="Noch keine Bilder vorhanden. Füge Bilder hinzu in dem du sie einfach auf den [+ Bilder hinzufügen] Button ziehst."
      />
    </>
  );
}

export default MyAttachmentsMetaInput;
