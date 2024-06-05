/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Slider,
  message,
  Input,
  Divider,
  Form,
  Switch,
  Tooltip,
} from "antd";
import type { GetRef } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  EyeFilled,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { AttachmentMeta } from "./types/AttachmentTypes";
import FormTools from "./FormTools";
import { FormItem_Props } from "./types/FormPropertiesInterface";

const { Meta } = Card;
const { TextArea } = Input;
type FormInstance = GetRef<typeof Form>;

/* ==========================================================

    * MyAttachmentCard - Modales Formular

   ========================================================== */

interface ModalFormProps {
  id: string;
  data: AttachmentMeta;
  open: boolean;
  onCancel: () => void;
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({
  form,
  open,
}: {
  form: FormInstance;
  open: boolean;
}) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

const ModalForm: React.FC<ModalFormProps> = ({ id, data, open, onCancel }) => {
  const [form] = Form.useForm();

  form.setFieldsValue(data);

  useResetFormOnCloseModal({
    form,
    open,
  });

  const onOk = () => {
    console.log("Modal-Form Ok");
    form.submit();
  };

  return (
    <Modal
      title="Metadaten bearbeiten"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name={id}>
        <Form.Item name="title" label="Titel">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Kurze Beschreibung">
          <TextArea placeholder="Kurze Beschreibung" autoSize />
        </Form.Item>
        <Form.Item name="is_cover" label="Benutze das Bild als Cover">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

/* ==========================================================

    * MyAttachment_Image_Card - Attachment-Card

   ========================================================== */

interface MyAttachment_Image_Card_Props {
  value: AttachmentMeta;
  onChange: any;
  doc_id: string;
  module_id: string;
}

/**
 * MyAttachment_Image_Card - React Component.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @param {{
 *   value: AttachmentMeta;
 *   onChange: any;
 * }} {
 *   value, //  image
 *   onChange, // callback
 * }
 * @return {*}
 */
function MyAttachment_Image_Card({
  value, //  AttachmentMeta
  onChange, // callback
  doc_id,
  module_id,
}: MyAttachment_Image_Card_Props) {

  const [open, setModalOpen] = useState(false);
  
  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const confirm_RemoveImageAttachment: PopconfirmProps["onConfirm"] = (e) => {
    console.log("removeImageAttachment", e);
    message.success(
      "Das Bild wurde zum löschen vorgemerkt, und wird beim speichern des Dokumentes entfernt."
    );
    // Das bedeutet 'zum löschen vorgemerkt'
    // in dem eine action hinzu gefügt wird.
    // Beim Speichern wird das Attachment dann aus dem Dokument entfernt.
    // Siehe AttachmentTool.ts
    value["action"] = {
      name: "delete",
      attachment: {
        id: value.id,
        content_type: value.mimetype,
        data: "", // nur bei upload
      },
    };

  };


  const requestDownloadImageAttachment = () => {
    console.log("button clicked: request:attachment-download-custom");
    // Der Save-Dialog kann nur vom main prozess aus geöffnet werden.
    // TODO download original attachment: Hier fehlen noch genaue parameter.
    FormTools.customRequest(
      "ipc-database",
      "request:attachment-download-custom",
      "",
      {
        doc_id: doc_id,
        module_id: module_id,
        attachment_id: value.id,
        filename: value.filename,
        mimeteype: value.mimetype,
      }
    );
  };

  FormTools.customResponse(
    "ipc-database",
    "request:attachment-download-custom",
    (data: any) => {
      message.info("Download erledigt.");
    }
  );

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          console.log("Modal-Form finished...", name);
          if (name === value.id) {
            value.title = values.title;
            value.description = values.description;
            value.is_cover = values.is_cover;
            setModalOpen(false);
          }
        }}
      >
        <ModalForm
          id={value.id}
          data={value}
          open={open}
          onCancel={hideModal}
        />
      </Form.Provider>

      <Card
        style={{ padding: 0 }}
        hoverable
        bordered={false}
        cover={<img alt={value.filename} src={value.preview} />}
        actions={[
          <Tooltip title="Als Coverbild verwenden">
            <Button
              icon={!value.is_cover ? <EyeOutlined /> : <EyeFilled />}
            />
          </Tooltip>,
          <Tooltip title="Original herunterladen">
            <Button
              onClick={() => requestDownloadImageAttachment()}
              icon={<DownloadOutlined />}
            />
          </Tooltip>,
          <Tooltip title="Metadaten bearbeiten">
            <Button onClick={() => showModal()} icon={<EditOutlined />} />
          </Tooltip>,
          <Tooltip title="Bild löschen">
            <Popconfirm
              title="Bild entfernen"
              description="Möchstes du das Bild wirklich entfernen?"
              onConfirm={confirm_RemoveImageAttachment}
              onCancel={undefined}
              okText="Ja"
              cancelText="Nein"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>,
        ]}
      >
        <Meta title={value.title} description={value.description} />
      </Card>
    </>
  );
}

/* ==========================================================

    * MyAttachmentsMetaView - React Component

   ========================================================== */

const colCounts: Record<PropertyKey, number> = {};
[1, 2, 3, 4, 5, 6, 7].forEach((v, i) => {
  colCounts[i] = v;
});

interface AttachmentMetaView_Props extends FormItem_Props<AttachmentMeta[]> {
  doc_id: string;
  module_id: string;
  columns: number;
  gap: number;
  textNoImages: string;
}

/**
 ** MyAttachmentsMetaView - React Component
 *
 * TODO: Sowas brauch ich auch für die Artwork-Views selber... ListView Option: [table | grid]
 *
 * Displays attachments (preferably images for now)
 * in a Masonry-Style Grid-Layout.
 * The number of columns can be freely selected between 1 and 7.
 *
 * https://masonry.desandro.com
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @param {{
 *   value?: AttachmentMeta[];
 *   onChange?: (value: any) => void;
 *
 *   columns: number;
 *   gap: number;
 *   textNoImages: string;
 * }} props
 * @return {*}
 */
export function MyAttachments_ImagesMeta_View(props: AttachmentMetaView_Props) {
  const {
    value = [],
    columns = 1,
    gap = 20,
    textNoImages = "Noch keine Bilder vorhanden.",
    doc_id,
    module_id,
  } = props;

  // TODO Der Parameter 'children' ist reserviert für eingebettet React-Childs <MyAttachmentsMetaView><c1/><c2/>...</MyAttachmentsMetaView>
  // Da noch eine Unterscheidung einbauen...
  // https://medium.com/the-andela-way/how-to-create-a-masonry-layout-component-using-react-f30ec9ca5e99

  const [colCountKey, setColCountKey] = useState(columns);
  const cc = colCounts[colCountKey];
  const formatter = (n: number) => `${n + 1} ${n > 0 ? "Spalten" : "Spalte"}`;

  const columnWrapper: any = {};
  const result: any[] = [];

  // create columns
  for (let i = 0; i < cc; i += 1) {
    columnWrapper[`column${i}`] = [];
  }

  // Zeige nur Items ohne actions (to add or removed)
  let filtered = value.filter((item: AttachmentMeta) => {
    return !("action" in item);
  });

  // Divide the children into columns
  for (let i = 0; i < filtered.length; i += 1) {
    const columnIndex = i % cc;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${gap}px` }}>
        {getCardFrom(filtered[i])}{" "}
      </div>
    );
  }

  // wrap the items in each column with a div and push them into the result array.
  if (filtered.length > 0) {
    for (let i = 0; i < cc; i += 1) {
      result.push(
        <div
          key={i}
          style={{
            marginLeft: `${i > 0 ? gap : 0}px`,
            flex: 1,
          }}
        >
          {columnWrapper[`column${i}`]}
        </div>
      );
    }
  }

  const onCardChanged = () => {
    console.log("a card has changed");
  };

  function getCardFrom(meta: AttachmentMeta): any {
    return (
      <MyAttachment_Image_Card
        value={meta}
        doc_id={doc_id}
        module_id={module_id}
        onChange={undefined} // onCardChanged -> error
      />
    );
  }

  return (
    <>
      <Divider />
      <Slider
        min={0}
        max={Object.keys(colCounts).length - 1}
        value={colCountKey}
        onChange={setColCountKey}
        marks={colCounts}
        step={null}
        // TODO tooltip={{ formatter }}
      />
      <Divider />
      <div style={{ display: "flex" }}>
        {result.length > 0 ? result : textNoImages}
      </div>
      <Divider />
    </>
  );
}
