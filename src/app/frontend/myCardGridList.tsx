import { useEffect } from "react";
import { Modul_Props_I } from "../common/Modul_Props";
import { Card, Col, Empty } from "antd";
import Meta from "antd/es/card/Meta";

type ListType = "list" | "grid"; // Der gehört in eigene Datei

// https://www.nadershamma.dev/blog/2019/how-to-access-object-properties-dynamically-using-bracket-notation-in-typescript/
// credit: Typescript documentation, src
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
function getTheProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}

export interface MyCardGridList_DataItem {
  title: string;
  description: string;
  cover: string;
}

export interface MyCardGridList_Props<T> {
  modul_props: Modul_Props_I;
  data: Array<T>;
  cardSize: number;
  render: (record: T) => MyCardGridList_DataItem;
}

export function MyCardGridList<T>({
  modul_props,
  cardSize,
  data,
  render,
}: MyCardGridList_Props<T>) {
  useEffect(() => {}, []);

  // TODO Render a Grid of Cards
  const result: any[] = [];
  const gap = 20;

  for (let i = 0; i < data.length; i += 1) {
    const key = `col-${i}`;

    let di: MyCardGridList_DataItem = {
      title: "Title",
      description: "Descriptiond",
      cover: "",
    };

    if (render) {
      di = render(data[i]);
    }

    // const title: any = data[i][data_keys.dataIndex_title as any];
    // const desc: any = data[i][data_keys.dataIndex_description as any];
    // const cover: any = data[i][data_keys.dataIndex_cover as any];

    result.push(
      <div style={{ marginBottom: `${gap}px` }}>
        <Col
          key={key}
          xs={{ flex: "100%" }}
          sm={{ flex: "50%" }}
          md={{ flex: "40%" }}
          lg={{ flex: "20%" }}
          xl={{ flex: "10%" }}
        >
          <Card
            hoverable
            style={{ width: cardSize }}
            cover={<img alt="example" src={di?.cover} />}
          >
            <Meta title={di?.title} description={di?.description} />
          </Card>
        </Col>
      </div>
    );
  }

  return (
    <>
      {result.length > 0 ? (
        result
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
}
