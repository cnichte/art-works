import { useParams } from 'react-router-dom';

import { MyBasicViewFieldParameterI, MyBasicViewSegmentParameterI } from '../../../common/types/MyBasicViewTypes';
import MyBasicView from '../../../frontend/myBasicView';
import { DocType } from '../../../common/types/DocType';

import { AddressI } from '../../../common/types/DocAddress';
import { modul_props } from '../modul_props';

/* ==========================================================

    * ReactNode: ArtistView

   ========================================================== */

/**
 * Read Only View for Module Address.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns AddressView
 */
export function AddressView() {
  const { id } = useParams();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;
  
  const fieldsAddress: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'name',
      label: 'Name',
    },
    {
      dataIndex: 'birthdate',
      label: 'Geburttag',
    },
    {
      dataIndex: 'postalCode',
      label: 'Postleitzahl',
    },
    {
      dataIndex: 'city',
      label: 'Ort',
    },
    {
      dataIndex: 'street',
      label: 'Strasse und Hausnummer',
    },
    {
      dataIndex: 'url',
      label: 'Webseite',
    },
    {
      dataIndex: 'mail',
      label: 'eMail',
    },
    {
      dataIndex: 'phone',
      label: 'Telefon',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const segmentAddresses: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsAddress,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentAddresses];

  return (
    <MyBasicView<AddressI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}