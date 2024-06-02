/* eslint-disable no-unused-vars */
import { useState } from "react";
import Resizer from "react-image-file-resizer";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  Button,
  Upload,
  message,
  Card,
  Col,
  Row,
  Space,
  Slider,
  Divider,
  GetProp,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { AttachmentMeta } from "./types/AttachmentTypes";
import MyAttachmentsMetaView from "./myAttachmentsMetaView";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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

/**
 * Resize my Images
 *
 * @param file
 * @returns
 */
const resizeImage = (file: RcFile) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file, // the image file object
      1000, // the new maxWidth
      1000, // the new maxHeight
      "JPEG", // the compression format (JPEG, PNG, WEBP)
      100, // the quality of the new image (0 to 100)
      0, // the rotation degree (0 to 360)
      (uri) => {
        // the callback function to get the URI
        resolve(uri);
      },
      "base64", // the desired output type (base64, blob, file.)
      1000, // the new minWidth
      1000 // the new minHeight
    );
  });

const onChange = async (file: RcFile) => {
  try {
    const image = await resizeImage(file);
    console.log(image);
  } catch (err) {
    console.log(err);
  }
};

// TODO: Ich würde gern previewFile verwenden, aber es funktioniert nicht:
// const previewFile:PreviewFileHandler = null;

/* ==========================================================

    * MyAttachmentsMetaInput - ReactNode / Main Component.

   ========================================================== */

/**
 * The React-Property Definition of MyAttachmentsMetaInput React-Component.
 *
 * 'value' and 'onChange' must necessarily be called exactly that,
 * because they are used by the parent Andt Form.Item.
 *! Dont rename them.
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

  /**
   * The Upload-Properties.
   */
  const uploadProps: UploadProps = {
    listType: "picture",
    // showUploadList: true,
    multiple: true,
    accept: ".png,.jpg,.jpeg",
    className: "upload-list-inline",
    defaultFileList: fileList,
    // fileList,
    beforeUpload(file) {
      //* Upload-Properties Callback
      console.log("Upload - beforeUpload - rcfile", file);

      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG or PNG file!");
      }

      // Maximal Filesize
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        message.error("Image must smaller than 50 MB.");
        // TODO sollte natürich  nicht zur Liste hinzugefügt werden
      }

      // get the original unresized image.
      getImageAsBase64(file)
        .then((b64URLdata) => {
          // generate a preview Image.
          resizeImage(file)
            .then((uri) => {
              const previewImage = uri as string;

              // create a nice uuid
              const uuid = uuidv4();

              // prepare the Attachment-Metadata
              let meta: AttachmentMeta = {
                id: uuid,
                filename: file.name,
                mimetype: file.type,
                title: "A Title",
                description: "A brief description...",
                is_cover: false,
                preview: previewImage,

                // action is my temporary 'sidecar' until formular is saved
                // see: AttachmentTool
                action: {
                  name: "upload",
                  attachment: {
                    id: uuid,
                    content_type: file.type,
                    data: b64URLdata,
                  },
                },
              };

              value.push(meta);
              triggerChange(value);
            })
            .catch((error: any) => console.log(`error: ${error}`)); // resizeImage

          // Sollte auch ein Preview Bild rendern und zurückliefern.
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const img = document.createElement("img");
              img.src = reader.result as string;
              img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d")!;
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = "red";
                ctx.textBaseline = "middle";
                ctx.font = "33px Arial";
                ctx.fillText("Ant Design", 20, 20);
                canvas.toBlob((result) => resolve(result as any));
              };
            };
          });
        })
        .catch((error: any) => console.log(`error: ${error}`)); // getImageAsBase64

      setFileList([...fileList, file]);

      return false; // surpresses auto upload?
    }, //* Upload-Properties beforeUpload

    // name: 'imageUpload',
    // maxCount: 1,
    // action: '',
    onChange(info: { file: { status?: any; name?: any }; fileList: any }) {
      //* Upload-Properties Callback
      console.log("Upload - onChange", info);

      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: (file) => {
      //* Upload-Properties Callback
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
      //* Upload-Properties Callback
      console.log("Upload - onDrop", e.dataTransfer.files);
    },
    onPreview: async (file: UploadFile) => {
      //* Upload-Properties Callback
      // handles the click on th preview Image
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as FileType);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      //! const imgWindow = window.open(src);
      //! imgWindow?.document.write(image.outerHTML);
    },
    // TODO previewFile: () => {}
  }; // uploadProps

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
