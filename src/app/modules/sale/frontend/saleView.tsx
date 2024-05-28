/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: SaleView

   ========================================================== */

/**
 * Read Only View for Module Sale.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns SaleView
 */
function SaleView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const moduleId = 'sale';

  const requests = RequestFactory.getViewRequestsFor(moduleId, 'ipc-database');

  /* ----------------------------------------------------------

    Standard View Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  const fieldsSale: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'saleType',
      mapKeyTo: {
        dataIndex: 'saleTypes',
        showFields: ['name'],
      },
      label: 'Type',
    },
    {
      dataIndex: 'customer',
      mapKeyTo: {
        dataIndex: 'addresses',
        showFields: ['name'],
      },
      label: 'Kunde',
    },
    {
      dataIndex: 'publication',
      mapKeyTo: {
        dataIndex: 'publications',
        showFields: ['title'],
      },
      condition: {
        field: 'saleType',
        selector: '$eq',
        value: '2932a605-48aa-4368-96b7-21aed8103e38', // Buchverkauf
        action: 'showif',
      },
      label: 'Publikation',
    },
    {
      dataIndex: 'artwork',
      mapKeyTo: {
        dataIndex: 'artworks',
        showFields: ['title'],
      },
      condition: {
        field: 'saleType',
        selector: '$eq',
        value: '0ae7570a-603c-43f3-9667-5aa019dd27eb', // Print (Standard)
        action: 'showif',
      },
      label: 'Artwork',
    },
    {
      dataIndex: 'edition',
      mapKeyTo: {
        dataIndex: 'editions',
        showFields: ['title'],
      },
      condition: {
        field: 'saleType',
        selector: '$eq',
        value: '0ad711be-179b-4fd6-b069-3ee8ada9591a', // Fineartprint (Edition)
        action: 'showif',
      },
      label: 'Edition',
    },
    {
      dataIndex: 'editionNumber',
      label: 'Nummer der Edition',
      condition: {
        field: 'saleType',
        selector: '$eq',
        value: '0ad711be-179b-4fd6-b069-3ee8ada9591a', // Fineartprint (Edition)
        action: 'showif',
      },
    },
    {
      dataIndex: 'calculatedPrice',
      label: 'Kalkulierter Preis',
    },
    {
      dataIndex: 'paid',
      label: 'Bezahler Preis',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const segmentSales: MyBasicViewSegmentParameterI = {
    segment: 'sales',
    label: 'Verkauf',
    fields: fieldsSale,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentSales];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Verkauf"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default SaleView;
