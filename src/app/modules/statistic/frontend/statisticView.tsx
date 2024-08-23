import { useEffect } from "react";

import { Card, Col, Row } from "antd";
import { Bar } from "@ant-design/plots";

import { DocType } from "../../../common/types/DocType";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { Action_Request } from "../../../common/types/RequestTypes";
import { modul_props } from "../modul_props";

const { Meta } = Card;

// https://ant-design-charts.antgroup.com/en/examples

const DemoBar = () => {
  const config = {
    data: [
      { letter: "Catalogs", frequency: 0.08167 },
      { letter: "Werke", frequency: 0.01492 },
      { letter: "Notizen", frequency: 0.02782 },
      { letter: "Werkgruppen", frequency: 0.04253 },
      { letter: "Zusammenstellungen", frequency: 0.12702 },
      { letter: "Editionen", frequency: 0.02288 },
      { letter: "Genres", frequency: 0.02015 },
      { letter: "Tags", frequency: 0.06094 },
      { letter: "Whiteboards", frequency: 0.06966 },
      { letter: "Publikationen", frequency: 0.00153 },
      { letter: "Ausstellungen", frequency: 0.00772 },
      { letter: "Auszeichnungen", frequency: 0.04025 },
      { letter: "Kalkulationen", frequency: 0.02406 },
      { letter: "Verleih", frequency: 0.06749 },
      { letter: "Verkauf", frequency: 0.07507 },
      { letter: "Nutzungsrechte", frequency: 0.01929 },
      { letter: "Kontakte", frequency: 0.00095 },
    ],
    xField: "letter",
    yField: "frequency",
    sort: {
      reverse: true,
    },
    label: {
      text: "frequency",
      formatter: ".1%",
      style: {
        textAlign: (d: { frequency: string | number }) =>
          +d.frequency > 0.008 ? "right" : "start",
        fill: (d: { frequency: string | number }) =>
          +d.frequency > 0.008 ? "#fff" : "#000",
        dx: (d: { frequency: string | number }) =>
          +d.frequency > 0.008 ? -5 : 5,
      },
    },
    axis: {
      y: {
        labelFormatter: ".0%",
      },
    },
  };
  return <Bar {...config} />;
};

/**
 * This is just a placeholder for development.
 * @returns EmptyList
 */
export function StatisticView() {

    useEffect(() => {
    // Beim laden der Seite...
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info("Request some data from backend...");
    Header_Buttons_IPC.request_buttons({
      viewtype: "list",
      doctype: modul_props.doctype,
      doclabel: modul_props.doclabel,
      id: "", // is perhaps id='new'
      surpress: true,
      options: {},
    });

    //! Listen for Header-Button Actions.
    // Register and remove the event listener
    const buaUnsubscribe = window.electronAPI.listen_to(
      "ipc-button-action",
      (response: Action_Request) => {
        if (response.type == "request:save-action") {
          // console.log("AddressForm says ACTION: ", response);
          // triggerSaveRef.current?.click();
          // message.info(response.type);
        }
        if (response.type === "request:show-settings-dialog-action") {
          console.log(
            `Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`
          );
        }
      }
    );

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe();
    };
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card cover={<DemoBar />} title="Anzahl der Elemente" bordered={true}>
            <Meta
              title="Beschreibung"
              description="Anzahl der Elemente in der Datenbank."
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{paddingTop:"15px"}}>
        <Col span={12}>
          <Card cover={null} title="Pi 1" bordered={true}>
            <Meta
              title="Beschreibung"
              description="Eine Beschreibung"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card cover={null} title="Pi 2" bordered={true}>
            <Meta
              title="Beschreibung"
              description="Eine Beschreibung"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

/*

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
          Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>


    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>



*/
