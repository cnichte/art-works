// import { shell } from 'electron';
import React, { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Upload,
  // UploadProps,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import MyTags_Input from "../../../../frontend/custom/components/myTags_Input";


/**
 *
 * @return {*}
 */
function ArtworkBulkUpload() {
  const [useForm, setUseForm] = useState<boolean>(true);
  const [useSidecar, setUseSidecar] = useState<boolean>(false);
  const [useList, setUseList] = useState<boolean>(false);

  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  /**
   * TODO: Open url in external Browser
   *  https://www.pluralsight.com/resources/blog/guides/understanding-links-in-reactjs
   * @param url https://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser
   */
  const openURLExternal = (url: string): void => {
    // shell.openExternal(url);
  };

  const handleImportOptionsChange = (value: string) => {
    console.log(`selected ${value}`);

    switch (value) {
      case "useForm": {
        setUseForm(true); // false = 'optional'
        setUseSidecar(false);
        setUseList(false);
        break;
      }
      case "useSidecar": {
        setUseForm(false); // false = 'optional'
        setUseSidecar(true);
        setUseList(false);
        break;
      }
      case "useList": {
        setUseForm(false); // false = 'optional'
        setUseSidecar(false);
        setUseList(true);
        break;
      }
      default: {
        setUseForm(true); // false = 'optional'
        setUseSidecar(false);
        setUseList(false);
        break;
      }
    }
  };

  /* ----------------------------------------------------------

      Upload Actions

    ---------------------------------------------------------- */

  // TODO Ich muss mir einen vollständigen Datensatz
  // aus den Formulardaten zusammen basteln, inclusive
  // attachmentsMeta und attachments ... und dem Rest...

  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
      return false; // surpresses auto upload?
    },
    // name: 'imageUpload',
    // maxCount: 1,
    // action: '',
    onChange(info: { file: { status?: any; name?: any }; fileList: any }) {
      console.log("Upload - onChange", info);
    },
    onRemove: (file) => {
      console.log("Upload - onRemove", file);
    },
    onDrop(e) {
      console.log("Upload - onDrop", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Button type="dashed" onClick={showDrawer}>
        <PlusOutlined />
        Mehrere Werke hinzufügen
      </Button>
      <Drawer
        title=""
        placement="left"
        onClose={closeDrawer}
        open={openDrawer}
        width={450}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button onClick={closeDrawer} type="primary">
              <UploadOutlined /> Upload
            </Button>
          </Space>
        }
      >
        <p>
          Hier hast du die Möglichkeit in einem Rutsch mehrere Werke an zu
          legen.
        </p>
        <Form layout="vertical">
          <Form.Item label="Import Optionen" name="importOptions">
            <Select
              defaultValue="useForm"
              onChange={handleImportOptionsChange}
              options={[
                {
                  value: "useForm",
                  label: "Bilder importieren mit Formular (Standard)",
                },
                {
                  value: "useSidecar",
                  label: "Beachte Sidecar zu jedem Bild.",
                },
                { value: "useList", label: "Benutze Excel-Datei zum Import" },
              ]}
            />
          </Form.Item>
          <Form.Item style={useForm ? {} : { display: "none" }}>
            <ul>
              <li>
                Zu jedem Bild wird ein Werk im Katalog angelegt. Es können
                später weitere Bilder zu den Werken hinzugefügt werden.
              </li>
              <li>Der Dateiname wird als Werk-Titel verwendet.</li>
              <li>Die folgenden Einstellungen werden für alle übernommen.</li>
              <li>
                Ps. vielleicht kann ich weitere Infos aus den Exif entnehmen.
              </li>
            </ul>
          </Form.Item>
          <Form.Item style={useSidecar ? {} : { display: "none" }}>
            <ul>
              <li>
                Die Sidecar-Datei muss den selben Namen haben wie das Bild.
                Beispiel:
                <br />
                bild001.jpg
                <br />
                bild001.json
              </li>
              <li>
                Aufbau der Sidecar Dateien ist{" TODO "} wie hier beschrieben.
              </li>
            </ul>
          </Form.Item>
          <Form.Item style={useList ? {} : { display: "none" }}>
            <ul>
              <li>Die Liste muss als Excel-Datei .xls vorliegen.</li>
              <li>
                Die Bilder müssen im selben Verzeichnis liegen wie die
                Excel-Datei.
              </li>
              <li>
                Aufbau der Excel Datei ist{" TODO "} wie hier beschrieben.
              </li>
            </ul>
          </Form.Item>
          <Form.Item
            style={useForm ? {} : { display: "none" }}
            label="Tags"
            name="tags"
          >
            <MyTags_Input
              onChange={(value: any) => {
                console.log("artworkForm -> MyTags -> ValueChanged:", value);
              }}
            />
          </Form.Item>
          <Form.Item
            style={useForm ? {} : { display: "none" }}
            label="Genres"
            name="genres"
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={useForm ? {} : { display: "none" }}
            label="Werkgruppe"
            name="genres"
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={useForm || useSidecar ? {} : { display: "none" }}
            label="Bilder"
            name="bilder"
          >
            <Space wrap>
              <Upload {...uploadProps}>
                <Button icon={<PlusOutlined />}>Bilder hinzufügen</Button>
              </Upload>
              <Button>
                <DeleteOutlined />
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default ArtworkBulkUpload;
