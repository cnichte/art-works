import { useEffect } from "react";
import { Modul_Props_I } from "../common/Modul_Props";
import { Empty } from "antd";
import { useNavigate } from "react-router";
import { DocItentifiable } from "../common/types/DocType";
import { Image_Cover2 } from "./Image_Cover";
import { Masonry } from "masonic";

type ListType = "list" | "grid"; // Der gehört in eigene Datei

// https://www.nadershamma.dev/blog/2019/how-to-access-object-properties-dynamically-using-bracket-notation-in-typescript/
// credit: Typescript documentation, src
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
function getTheProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}

export interface MyCardGridList_DataItem {
  title?: string;
  description?: string;
  href?: string;
  preview?: string;
  id: string;
}

export interface MyCardGridList_Props<T> {
  modul_props: Modul_Props_I;
  data: Array<T>;
  cardSize: number;
  render: (record: T) => MyCardGridList_DataItem;
}

export interface My_Masonry_Props {}

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export function MyCardGridList<T>({
  modul_props,
  cardSize,
  data,
  render,
}: MyCardGridList_Props<T>) {
  const navigate = useNavigate();
  // not used so here
    useEffect(() => {
    // Beim laden der Seite...}, []);

  //* open view
  const handleView = (record: any | DocItentifiable) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  // TODO Render a Grid of Cards
  const grid_data: any[] = [];
  const gap = 20;

  for (let i = 0; i < data.length; i += 1) {
    const col_key = `col-${i}`;
    const img_key = `img-${i}`;

    let di: MyCardGridList_DataItem = {
      id: "",
    };

    if (render) {
      di = render(data[i]);
    } else {
    }

    const test: string = `${cardSize}`;

    grid_data.push(di);
  }


  //! https://github.com/jaredLunde/masonic
  const My_Masonry_Grid = (props: My_Masonry_Props) => (
    <Masonry
      items={grid_data}
      render={My_Masonry_Card}
      columnWidth={cardSize}
      columnGutter={15}
      rowGutter={15}
      role="list"
      style={{margin:"20px", padding:"20px"}}
    />
  );

  const My_Masonry_Card = ({
    index,
    data,
    width,
  }: {
    index: any;
    data: any;
    width: any;
  }) => (
    <a key={index} onClick={() => handleView(data)}>
      <Image_Cover2 image_string={data?.preview} width={width}/>
    </a>
  );

  return (
    <>
      {grid_data.length > 0 ? (
        <My_Masonry_Grid />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
}
