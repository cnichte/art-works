/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import { MyBasicViewFieldParameterI, MyBasicViewSegmentParameterI } from '../../../common/types/MyBasicViewTypes';
import MyBasicView from '../../../frontend/myBasicView';

import { TagI } from '../../../common/types/DocTag';
import { modul_props } from '../modul_props';

/* ==========================================================

    * ReactNode: TagView

   ========================================================== */

/**
 * Read Only View for Module Tag.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns TagView
 */
export function TagView() {
  const { id } = useParams();

  const fieldsTag: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'parent',
      label: 'Gehört zu Tag',
      mapKeyTo: 'tags',
      useChilds: ['name'],
    },
    {
      dataIndex: 'name',
      label: 'Name',
    },
    {
      dataIndex: 'color',
      label: 'Farbe',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const segmentTags: MyBasicViewSegmentParameterI = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsTag,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentTags];

  return (
    <MyBasicView<TagI>
    id={id}
    modul_props={modul_props}
    segmentSets={segmentSets}
    />
  );
}