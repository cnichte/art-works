/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Descriptions, Space, Col, Row, Tabs, Table } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

import {
  MyBasicViewFieldParameterI,
  MyBasicViewProps,
  MyBasicViewSegmentParameterI,
} from './types/MyBasicViewTypes';
import ViewTool from './ViewTools';
import RelationResolver from './RelationResolver';
import { Condition } from './Condition';

/* ==========================================================

    * RenderDescriptions - React Component

   ========================================================== */

/**
 ** RenderDescriptions - ReactNode / React Component.
 ** Renders a record into a Descriptions block.
 *
 * Todo: Was ist der Return typ von so einer React Komponente?
 * https://stackoverflow.com/questions/44133420/what-is-the-typescript-return-type-of-a-react-stateless-component
 *
 * TODO Arrays (Zb die Preise bei den Editions, 
 * TODO könnten automatisch unterhalb in einer Tabelle ausgegeben werden.)
 * TODO Ich könnte auch für ein Feld einen custom-renderer übergeben.
 * 
 * @param reactParams { id, segmentParams, record, data }
 * @returns
 */
function RenderDescriptions(reactParams: {
  segmentParams: MyBasicViewSegmentParameterI;
  record: any;
  data: any;
}) {
  const { segmentParams, record, data } = reactParams;

  function checkConditions(field: MyBasicViewFieldParameterI): boolean {
    return Condition.showField(field, record, 'field');
  }

  return (
    <Row>
      <Col span={24}>
        <Descriptions layout="horizontal" bordered column={3}>
          {segmentParams.fields.map((field) => {
            // console.log('##################################################');
            // console.log('CONDITION FIELDS: ', segmentParams.fields);
            // console.log('CONDITION FIELD  : ', field);
            // console.log('CONDITION RECORD : ', record);
            if (checkConditions(field)) {
              return (
                <Descriptions.Item label={field.label} span={3} key={field.label}>
                  {ViewTool.getMyFuckingValueFrom(
                    field,
                    segmentParams.segment,
                    record,
                    data
                  )}
                </Descriptions.Item>
              );
            }
          })}
        </Descriptions>
      </Col>
    </Row>
  );
} //* ReactNode: RenderDescriptions - Renders a record into a Descriptions block.

/**
 * ReactNode: RenderTable
 *
 * @param reactParams { id, segmentParams, data }
 * @returns
 */
function RenderTable(reactParams: {
  id: string;
  segmentParams: MyBasicViewSegmentParameterI;
  data: any;
}) {
  const { id, segmentParams, data } = reactParams;

  function getColumns(): Array<any> {
    let result = [];

    // { title: 'Name', dataIndex: 'name', key: 'name',},
    result = segmentParams.fields.map((field: any) => {
      return {
        title: field.label,
        dataIndex: field.dataIndex,
        key: 'id',
      };
    });

    return result;
  }

  function getContent(): Array<any> {
    const result = [];
    const filterField = segmentParams.relationFilterIdField;
    const { segment } = segmentParams;
    const { fields } = segmentParams;

    if (segment in data) {
      for (let i = 0; i < data[segment].length; i += 1) {
        //* Relations: Fishes only the entries from the data assigned to the ID.
        // The database returns imho too much here.
        const filterFieldContent = data[segment][i][filterField];

        if (RelationResolver.isIdRelatedTo(id, filterFieldContent)) {
          const obj:any = {};
          for (let x = 0; x < fields.length; x += 1) {
            const field = fields[x];
            obj.id = data[segment][i].id;
            // resolve some uuids
            let value:any = data[segment][i][field.dataIndex];
            if (RelationResolver.uuidValidateV4(value)) {
              value = RelationResolver.resolve(data,field,value);
            }

            obj[field.dataIndex] = value;
          }

          result.push(obj);
        }
      }
    }
    return result;
  }

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={getColumns()}
          dataSource={getContent()}
          rowKey={(record) => record.id}
        />
      </Col>
    </Row>
  );
} //* ReactNode: RenderTable

/* ==========================================================

   * RenderData - React Component

   ========================================================== */

/**
 ** ReactNode: Renders the specified segments,
 ** and all contained records.
 ** in Descriptions or Table.
 *
 * @param reactParams { id, segmentParams, data }
 * @returns
 */
function RenderData(reactParams: {
  id: string;
  segmentParams: MyBasicViewSegmentParameterI;
  data: any;
}) {
  const { id, segmentParams, data } = reactParams;

  function getContent(): Array<any> {
    let result: any = [];

    // TODO Das kann doch nur ein Hack sein.
    ViewTool.createKeyFieldFrom('dataIndex', segmentParams.fields);

    if (segmentParams.render === 'component') {
      return segmentParams.component;
    }
    if (segmentParams.segment in data) {
      switch (segmentParams.render) {
        case 'table': {
          result = RenderTable({ id, segmentParams, data });
          break;
        }
        case 'description': {
          // finde meinen Datensatz. Den mit der 'id'...
          result = data[segmentParams.segment].map((aRecord: any) => {
            //* Relations: Fishes only the entries from the data assigned to the ID.
            if (
              RelationResolver.isIdRelatedTo(
                id,
                aRecord[segmentParams.relationFilterIdField]
              )
            ) {
              // console.log(`RenderData Descriptions: ${id} === ${aRecord[segmentParams.relationFilterIdField]} `, aRecord); // ${aRecord.id}
              //* The property 'key' is necessary for lists.
              // ViewTool.createKeyFieldFrom('dataIndex', segmentParams.fields);

              //* Liefere den gefundenen Datensatz fein gerendert zurück...
              // <RenderDescriptions segmentParams={segmentParams} record={aRecord} data={data} />
              return RenderDescriptions({
                segmentParams,
                record: aRecord,
                data,
              });
            }
            // else { console.log(`RenderData Descriptions: dropped ${id} !== ${aRecord[segmentParams.relationFilterIdField]}`, aRecord); }
          });
          break;
        }
        default: {
          // statements;
          break;
        }
      }
    }

    return result;
  }

  //* Render segments with headings and descriptions.
  // <Title>{label}</Title>
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      {getContent()}
    </Space>
  );
} //* RenderData - Renders all records in the segment or table.

/* ==========================================================

    * RenderAllDataInTab - ReactNode / Subnode

   ========================================================== */

/**
 ** ReactNode: Renders the specified segments in tabs,
 ** and all contained records optionally as descriptions, or table.
 *
 * @param reactParams { id, fieldset, data }
 * @returns
 */
function RenderSegmentsInTabs(reactParams: {
  id: string;
  fieldset: MyBasicViewSegmentParameterI[];
  data: any;
}) {
  const { id, fieldset, data } = reactParams;

  function getContent(segmentParams: MyBasicViewSegmentParameterI): any {
    //* <RenderData id={id} segmentParams={segmentParams} data={data} />
    return RenderData({ id, segmentParams, data });
  }

  function getItems(): Array<any> {
    let result:any = [];

    if (fieldset != null) {
      result = fieldset.map((aSegment: MyBasicViewSegmentParameterI) => {
        console.log('RenderSegmentsInTabs:', aSegment);
        return {
          label: aSegment.label,
          key: aSegment.segment,
          children: getContent(aSegment),
          closable: false,
        };
      });
    }

    return result;
  }

  // style={{ color: '#efefef' }}
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Tabs type="card" items={getItems()} />
    </Space>
  );
} //* RenderSegmentsInTabs - Renders all records in the segment.

/* ==========================================================

    * MyBasicView - ReactNode / Main Component.

   ========================================================== */

/**
 ** MyBasicView - React Component.
 *
 * TODO: Funktionen (close, edit) sind für alle Module gleich - also auch auslagern in eine Komponente.
 *
 * For each relation (toOne) = uuid, resolve the relation.
 * For each relation (toMany) = Array
 *     Open a tab with uuids
 *     and display the content as usual?
 *     or display in table form?
 *     ...
 *
 * https://stern.sh/blog/2018/daten-zwischen-react-komponenten-austauschen.html
 * https://ant.design/components/descriptions
 *
 * @param param0 MyBasicViewPropertiesI
}
 * @returns
 */
function MyBasicView({
  id,
  moduleLabel,
  moduleId,
  requests,
  segmentSets: fieldset, // [{ key: 'city', label: 'Stadt'}]
}: MyBasicViewProps) {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);

  /* ----------------------------------------------------------

    Actions

    ---------------------------------------------------------- */

  useEffect(() => {
    //* Fordere Daten vom Backend, an.
    // eslint-disable-next-line prettier/prettier
    console.log(`---- ${moduleId}-view - requests data from backend ${requests.viewData}.`);
    window.my_app_api.ipc.sendMessage(requests.channel, [
      requests.viewData,
      id,
    ]);
  }, []);

  //* Erhalte die Daten vom Backend.
  window.my_app_api.ipc.once(requests.channel, (arg:any) => {
    if (arg.request === requests.viewData) {
      console.log(
        `---- ${moduleId}-view - receives data from backend`,
        arg.data
      );
      setData(arg.data);
      // TODO: Abfragen sollen weniger Daten liefern - filtern...
      // Hier wird momentan viel zu viel geliefert, da relational-pouch die Relationen auflöst
      // und alles in das Ergebnis packt. Vor allem bei Zirkelbezügen wirkt sich das aus.
      // Das könnte ich evtl schon im Backend mit einem Filter vor/in/nach Datenbankafrage lösen.
    }
  });

  const handleEdit = () => {
    // URL Pattern in frontend_main.tsx definiert: <Route path="/artist-view/artist-form/:id"
    // so bekomme ich die id übergeben
    // https://ui.dev/react-router-url-parameters
    //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
    console.log(
      `##### Navigate from VIEW ${id} to FORM: /${moduleId}/form/${data[fieldset[0].segment][0].id}`
    );

    navigate(`/${moduleId}/form/${data[fieldset[0].segment][0].id}`); // /${activeTab}
  };

  const onViewClose = (key: any) => {
    console.log('---------- onViewClose', key);
    navigate(`/${moduleId}/list`);
  };

  /* ----------------------------------------------------------

     View -  Data gets dynamically adjusted

    ---------------------------------------------------------- */
  return (
    <div>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        <Space wrap>
          <Button type="dashed" htmlType="button" onClick={onViewClose}>
            <CloseCircleOutlined /> Close View
          </Button>
          <Button onClick={handleEdit}>
            <EditOutlined /> {moduleLabel} bearbeiten
          </Button>
        </Space>
        <RenderSegmentsInTabs id={id} fieldset={fieldset} data={data} />
      </Space>
    </div>
  );
} //* MyBasicView - Rendert den View.

export default MyBasicView;
