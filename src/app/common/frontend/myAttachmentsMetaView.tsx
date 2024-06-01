/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Card, Slider } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { AttachmentMeta } from './types/AttachmentTypes';

/* ==========================================================

    * MyAttachmentCard - React Component

   ========================================================== */

/**
 * MyAttachmentCard - React Component.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @param {{
 *   value: string;
 *   onChange: any;
 * }} {
 *   value, //  image
 *   onChange, // callback
 * }
 * @return {*}
 */
function MyAttachmentCard({
  value, //  image
  onChange, // callback
}: {
  value: string;
  onChange: any;
}) {
  return (
    <Card
      style={{ padding: 0 }}
      hoverable
      bordered={false}
      cover={<img alt="example" src={value} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    />
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
  onChange?: (value: any) => void;

  columns: number;
  gap: number;
  textNoImages: string;
}) {
  const {
    value = [],
    columns = 1,
    gap = 20,
    textNoImages = 'Noch keine Bilder vorhanden.',
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

  function getCardFrom(meta: AttachmentMeta): any {
    return <MyAttachmentCard value={meta.preview} onChange={undefined} />;
  }

  // Divide the children into columns
  for (let i = 0; i < value.length; i += 1) {
    const columnIndex = i % cc;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${gap}px` }}>{getCardFrom(value[i])}</div>
    );
  }

  // wrap the items in each column with a div and push them into the result array.
  if (value.length > 0) {
    for (let i = 0; i < cc; i += 1) {
      result.push(
        <div key={i}
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

  const formatter = (n: number) => `${n + 1} ${n > 0 ? 'Spalten' : 'Spalte'}`;

  return (
    <>
      <Slider
        min={0}
        max={Object.keys(colCounts).length - 1}
        value={colCountKey}
        onChange={setColCountKey}
        marks={colCounts}
        step={null}
        // TODO tooltip={{ formatter }}
      />
      <div style={{ display: 'flex' }}>
        {result.length > 0 ? result : textNoImages}
      </div>
    </>
  );
}

export default MyAttachmentsMetaView;
