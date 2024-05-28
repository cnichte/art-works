import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { ReactNode } from "react";

import RequestFactory from "../../../common/backend/RequestFactory";
import { MyBasicList } from "../../../common/frontend/myBasicList";
import { WhiteboardI } from "../types/WhiteboardInterface";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

/**
 * Ein Liste der Whiteboards.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function WhiteboardList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = "whiteboard";

  const requests = RequestFactory.getListRequestsFor(moduleId, "ipc-database");

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */
  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    navigate(`/${moduleId}/view/${record.id}`);
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Die Spaltendefinition für die Tabelle

    ---------------------------------------------------------- */
  const columns: ColumnsType<WhiteboardI> = [
    {
      title: "Bild",
      dataIndex: "image_small",
      key: "id",
    },
    {
      title: "Titel",
      dataIndex: "title",
      key: "id",
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Thema",
      dataIndex: "topic",
      key: "id",
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
    <>
      <MyBasicList
        moduleLabel="Whiteboard"
        moduleId={moduleId}
        requests={requests}
        segment="whiteboards"
        columns={columns}
      />
      
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw />
		</div>
    </>
  );
}

export default WhiteboardList;
