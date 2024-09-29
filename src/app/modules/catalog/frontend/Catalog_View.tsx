import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Descriptions, Tabs } from "antd";
import {
  Action_Request,
  Settings_Request,
} from "../../../common/types/RequestTypes";
import { DocCatalogType } from "../../../common/types/DocCatalog";

import { RequestData_IPC } from "../../../frontend/RequestData_IPC";
import { modul_props } from "../modul_props";

export function Catalog_View() {
  const { id } = useParams();

  const [dataObject, setDataObject] = useState<DocCatalogType>(null);
  
    useEffect(() => {
    // Beim laden der Seite...

    const request: Settings_Request = {
      type: "request:get-connection",
      doctype: modul_props.doctype,
      id: id,
      options: {},
    };

    const buaUnsubscribe_func = RequestData_IPC.init_and_load_data<DocCatalogType>({
      viewtype: "view",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-settings",
      
      surpress_buttons: false,
      setDataCallback: function (result: DocCatalogType): void {
        setDataObject(result);
      },
      doButtonActionCallback: function (response: Action_Request): void {
        // only used in form so far.
      },
    });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  return (
    <>
      <Tabs
        type="card"
        items={[
          {
            label: modul_props.doclabel,
            key: "0",
            children: (
              <Descriptions title="">
                <Descriptions.Item label="Bezeichnung">
                  {dataObject?.templateName}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  {dataObject?.templateDescription}
                </Descriptions.Item>
                <Descriptions.Item label="Art der Datenbank">
                  {dataObject?.dbOption}
                </Descriptions.Item>
                <Descriptions.Item label="Host">
                  {dataObject?.dbHost}
                </Descriptions.Item>
                <Descriptions.Item label="Port">
                  {dataObject?.dbPort}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {dataObject?.dbName}
                </Descriptions.Item>
                <Descriptions.Item label="User">
                  {dataObject?.dbUser}
                </Descriptions.Item>
                <Descriptions.Item label="Password">
                  {dataObject?.dbPassword}
                </Descriptions.Item>
                <Descriptions.Item label="Template">
                  {dataObject?.dbTemplate}
                </Descriptions.Item>
              </Descriptions>
            ),
          },
        ]}
      ></Tabs>
    </>
  );
}
