import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { modul_props } from "../modul_props";
import { WhiteboardI, DocWhiteboard } from "../../../common/custom/types/documents/DocWhiteboard";
import { Image_Cover2 } from "../../../frontend/custom/components/Image_Cover";
import { MyBasicList } from "../../../frontend/custom/components/myBasicList";
import { MyCardGridList_DataItem } from "../../../frontend/custom/components/myCardGridList";

/**
 * Ein Liste der Whiteboards.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function WhiteboardList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Die Spaltendefinition für die Tabelle

    ---------------------------------------------------------- */
  const columns: ColumnsType<WhiteboardI> = [
    {
      title: "Vorschau",
      dataIndex: "preview",
      key: "id",
      render: (text, record) => <Image_Cover2 image_string={record.preview} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */

  // TODO Übergebe einen extraButton, oder mehrere...
  // https://www.developerway.com/posts/react-component-as-prop-the-right-way

  // Fall 1 - als React Element: extraButton={<Button onClick={handleButton()}>Mehrere Werke hinzufügen</Button>}
  //* Fall 2 - als Component    : ExtraButton={MyExtaButton}
  // Fall 3 - als Function     : extraButton={() => <Button onClick={handleButton()}>Mehrere Werke hinzufügen</Button>}

  return (
    <MyBasicList<DocWhiteboard>
      listTypes={["list", "grid"]}
      modul_props={modul_props}
      columns={columns}
      columns_search_exclude={["preview"]}
      map_record_callback={function (record: DocWhiteboard): MyCardGridList_DataItem {
        const d: MyCardGridList_DataItem = {
          preview: record.preview,
          id: record.id,
        };
        return d;
      }}
    />
  );
}
