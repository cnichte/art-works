import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Descriptions } from "antd";
import { DocType } from "../../../common/types/DocType";
import { modul_props } from "../modul_props";
import { RequestData_IPC } from "../../../frontend/tools/RequestData_IPC";
import { DocUserType } from "../../../common/framework/types/documents/DocUser";
import { DB_Request, Action_Request } from "../../../common/framework/types/system/RequestTypes";

export function User_View() {

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const navigate = useNavigate();
  const { id } = useParams();

  const [dataObject, setDataObject] = useState<DocUserType>(null);

  useEffect(() => {

    const request: DB_Request = {
      request_type: "request:data-from-id",
      doctype: modul_props.doctype,
      id: id,
      request_options: [], // "use_relation"
    };

    const buaUnsubscribe_func = RequestData_IPC.init_and_load_data<DocUserType>({
      viewtype: "view",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-database",
      
      surpress_buttons: false,
      setDataCallback: function (result: DocUserType): void {
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
      <Descriptions layout="vertical" bordered title="User View">
        <Descriptions.Item label="Benutzer Name">
          {dataObject?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Benutzer UserID / AD-Kennung">
          {dataObject?.userid}
        </Descriptions.Item>
        <Descriptions.Item label="Benutzer Rechte">
          {dataObject?.userrights}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions layout="horizontal" title="">
        <Descriptions.Item label="id">{dataObject?._id}</Descriptions.Item>
        <Descriptions.Item label="rev">{dataObject?._rev}</Descriptions.Item>
      </Descriptions>
    </>
  );
}
