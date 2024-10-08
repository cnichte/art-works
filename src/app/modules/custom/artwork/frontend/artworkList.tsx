import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { Button, ColorPicker } from "antd";
import {
  StarFilled,
  FlagOutlined,
  FlagFilled,
  BgColorsOutlined,
} from "@ant-design/icons";
import { modul_props } from "../modul_props";

import { ArtworkI, Artwork } from "../../../../common/custom/types/documents/DocArtwork";
import { Image_Cover } from "../../../../frontend/custom/components/Image_Cover";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";
import { MyCardGridList_DataItem } from "../../../../frontend/custom/components/myCardGridList";
import { Image_Util } from "../../../../frontend/framework/tools/Image_Util";

function MyExtaButton() {
  const handleMyExtaButton = () => {
    console.log("handleMyExtaButton");
  };

  return <Button onClick={handleMyExtaButton}>Mehrere Werke hinzufügen</Button>;
}

/**
 * Ein Liste der Artwork.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function ArtworkList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const handleExtra = () => {
    console.log("handleExtra in ArtworkList");
  };

  const table_columns: ColumnsType<ArtworkI> = [
    {
      title: "Bild",
      dataIndex: "attachmentsMeta",
      key: "id",
      render: (text, record) => <Image_Cover attachment_meta={record.attachmentsMeta} />,
    },
    {
      title: "Titel",
      dataIndex: "title",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Thema",
      dataIndex: "topic",
      key: "id",
    },
    {
      title: <StarFilled />,
      dataIndex: "labels",
      key: "id",
      render: (text, record) => record.labels.rating,
    },
    {
      title: <BgColorsOutlined />,
      dataIndex: "labels",
      key: "id",
      render: (text, record) =>
        record.labels.color != "" ? (
          <ColorPicker defaultValue={record.labels.color} disabled />
        ) : (
          ""
        ),
    },
    {
      title: <FlagFilled />,
      dataIndex: "labels",
      key: "id",
      render: (text, record) => (record.labels.flag ? <FlagOutlined /> : ""),
    },
  ];

  // TODO Übergebe einen extraButton, oder mehrere...
  // https://www.developerway.com/posts/react-component-as-prop-the-right-way

  // Fall 1 - als React Element: extraButton={<Button onClick={handleButton()}>Mehrere Werke hinzufügen</Button>}
  //* Fall 2 - als Component    : ExtraButton={MyExtaButton}
  // Fall 3 - als Function     : extraButton={() => <Button onClick={handleButton()}>Mehrere Werke hinzufügen</Button>}

  return (
    <MyBasicList<Artwork>
      listTypes={["list", "grid"]}
      modul_props={modul_props}
      columns={table_columns}
      columns_search_exclude={["attachmentsMeta", "labels"]}
      map_record_callback={function (record: Artwork): MyCardGridList_DataItem {
        const d: MyCardGridList_DataItem = {
          preview: Image_Util.get_coverImage_src(record.attachmentsMeta),
          id: record.id,
        };
        return d;
      }}
    />
  );
}