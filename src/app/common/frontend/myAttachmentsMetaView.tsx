/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Slider,
  message,
  Input,
  Flex,
  Checkbox,
  CheckboxProps,
  Image,
  Divider,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  EyeFilled,
  SettingOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { AttachmentMeta } from "./types/AttachmentTypes";

const { Meta } = Card;
const { TextArea } = Input;

/* ==========================================================

    * MyAttachmentCard - React Component

   ========================================================== */

/**
 * MyAttachmentCard - React Component.
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
function MyAttachmentCard({
  value, //  AttachmentMeta
  onChange, // callback
}: {
  value: AttachmentMeta;
  onChange: any;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [use_as_cover, setUseAsCover] = useState<boolean>(false);

  // effect runs on component mount
  useEffect(() => {
    setTitle(value.title);
    setDescription(value.description);
    setUseAsCover(value.is_cover);
  }, []);

  // effect runs when specific state is updated
  useEffect(() => {}, [use_as_cover]);

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Das Bild wurde entfernt.");
    // TODO Das bedeutet 'zum löschen vorgemerkt' in dem eine action hinzu gefügt wurde.
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  const onCoverChange: CheckboxProps["onChange"] = (e) => {
    setUseAsCover(e.target.checked);
  };

  return (
    <>
      <Modal
        title="Metadaten bearbeiten"
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Flex vertical={false} gap={12}>
          <Image width={100} src={value.preview} />

          <Flex vertical gap={12} align="flex-end" justify="space-between">
            <Input placeholder="Titel" value={title} />
            <TextArea
              placeholder="Kurze Beschreibung"
              autoSize
              value={description}
            />
            <Checkbox onChange={onCoverChange} value={use_as_cover}>
              Benutze das Bild als Cover.
            </Checkbox>
          </Flex>
        </Flex>
      </Modal>
      <Card
        style={{ padding: 0 }}
        hoverable
        bordered={false}
        cover={<img alt="example" src={value.preview} />}
        actions={[
          <Button
            onClick={() => setUseAsCover(!use_as_cover)}
            icon={!use_as_cover ? <EyeOutlined /> : <EyeFilled />}
          />,
          <Button icon={<DownloadOutlined />} />,
          <Button onClick={() => setModalOpen(true)} icon={<EditOutlined />} />,
          <Popconfirm
            title="Bild entfernen"
            description="Möchstes du das Bild wirklich entfernen?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Ja"
            cancelText="Nein"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>,
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
function MyAttachmentsMetaView(props: {
  // eslint-disable-next-line react/require-default-props
  value?: AttachmentMeta[];
  // eslint-disable-next-line react/require-default-props
  onChange?: (value: AttachmentMeta) => void;

  columns: number;
  gap: number;
  textNoImages: string;
}) {
  const {
    value = [],
    columns = 1,
    gap = 20,
    textNoImages = "Noch keine Bilder vorhanden.",
  } = props;

  // TODO Der Parameter 'children' ist reserviert für eingebettet React-Childs <MyAttachmentsMetaView><c1/><c2/>...</MyAttachmentsMetaView>
  // Da noch eine Unterscheidung einbauen...
  // https://medium.com/the-andela-way/how-to-create-a-masonry-layout-component-using-react-f30ec9ca5e99

  const [colCountKey, setColCountKey] = useState(columns);

  const cc = colCounts[colCountKey];

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

  const formatter = (n: number) => `${n + 1} ${n > 0 ? "Spalten" : "Spalte"}`;

  function getCardFrom(meta: AttachmentMeta): any {
    return <MyAttachmentCard value={meta} onChange={undefined} />;
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

export default MyAttachmentsMetaView;
