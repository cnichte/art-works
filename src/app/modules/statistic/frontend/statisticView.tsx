import React, { PureComponent } from 'react';
import CountUp from 'react-countup';
import { Card, Col, Row, Space, Statistic } from 'antd';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const { Meta } = Card;

const formatter = (value: number) => <CountUp end={value} separator="." />;

// TODO Statistics
// https://ant.design/components/statistic
// https://www.npmjs.com/package/react-countup

// TODO Charts
//! SecurityError Failed to construct 'Worker': Access to the script at 'blob:http://localhost:1212/625e553b-7e20-40e1-adfb-f253b88dfb67' is denied by the document's Content Security Policy.
// import { TinyLine } from '@ant-design/plots';
// https://github.com/ant-design/ant-design-charts/issues/1689

// https://recharts.org/en-US/examples/TinyBarChart
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

/**
 * This is just a placeholder for development.
 * @returns EmptyList
 */
function StatisticView() {
  return (
    <Space>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Anzahl der Werke"
            value={1345}
            formatter={formatter}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Anzahl der Notizen"
            value={156}
            precision={2}
            formatter={formatter}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <BarChart
              width={300}
              height={250}
              data={data}
              margin={{
                top: 1,
                right: 1,
                left: 1,
                bottom: 1,
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
    </Space>
  );
}
export default StatisticView;

/*

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
