import { useParams } from 'react-router-dom';

import { MyBasicViewFieldParameterI, MyBasicViewSegmentParameterI } from '../../../common/types/MyBasicViewTypes';
import MyBasicView from '../../../frontend/myBasicView';
import { DocType } from '../../../common/types/DocType';

import { AddressI } from '../../../common/types/DocAddress';

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
export default function AddressView() {
  const { id } = useParams();

  const doclabel:string = "Kontakt";
  const doctype:DocType = "address";
  const segment:string ="addresses";
  
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