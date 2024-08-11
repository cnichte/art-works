import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { DocWhiteboard, WhiteboardI } from "../../../common/types/DocWhiteboard";
import { MyBasicList } from "../../../frontend/myBasicList";
import { DocType } from "../../../common/types/DocType";
import { modul_props } from "../modul_props";


// import { getAssetUrls } from 'tldraw/dist-cjs/lib/'
// const assetUrls = getAssetUrls()


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

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */
  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${doctype}/view/${record.id}'`);
    navigate(`/${doctype}/view/${record.id}`);
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */


  /* ----------------------------------------------------------

    Die Spaltendefinition für die Tabelle

    ---------------------------------------------------------- */
  const columns: ColumnsType<WhiteboardI> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    }
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
    doclabel={doclabel}
    doctype={doctype}
    segment={segment}
    columns={columns}
  />
  );
}