/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: ArtworkView

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
 * @returns ArtworkView
 */
function ArtworkView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const moduleId = 'artwork';

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

/*
   TODO condition: {
    field: 'category',
    selector: '$eq',
    value: 'werk', // Zeige nur Attachment-Bilder
    action: 'showif',
  },
*/
  const fieldsArtwork: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'title',
      label: 'Titel',
    },
    {
      dataIndex: 'title_addition',
      label: 'Untertitel',
    },
    {
      dataIndex: 'artists',
      label: 'Künstler',
      mapKeyTo: {
        dataIndex: 'artists',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'attachmentsMeta',
      label: 'Bilder vom Kunstwerk',
      condition: {
        scope:'childs',
        field: 'category',
        selector: '$eq',
        value: 'werk', 
        action: 'showif',
      }
    },
    {
      dataIndex: 'dateCreation', // TODO Keine Objekte erlaubt. 'date' ist array, wird nicht ausgegeben
      label: 'Erstellungsdatum',
    },
    {
      dataIndex: 'topic',
      label: 'Themen',
    },
    {
      dataIndex: 'genres',
      label: 'Genres',
      mapKeyTo: {
        dataIndex: 'genres',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'description_short',
      label: 'Beschreibung kurz',
    },
    {
      dataIndex: 'description_long',
      label: 'Beschreibung lang',
    },
    {
      dataIndex: 'implementation',
      label: 'Umsetzung',
    },
    {
      dataIndex: 'tool',
      label: 'Werkzeuge',
    },
    {
      dataIndex: 'forsale',
      label: 'Verkäuflich',
    },
    {
      dataIndex: 'price',
      label: 'Preis',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
    {
      dataIndex: 'tags',
      label: 'Tags',
      mapKeyTo: {
        dataIndex: 'tags',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'labels',
      label: 'Markierungen',
    },
    {
      dataIndex: 'attachmentsMeta',
      label: 'Dateianhänge',
      condition: {
        scope:"childs",
        field: 'category',
        selector: '$eq',
        value: 'document', 
        action: 'showif',
      }
    },
  ];

  const segmentArtworks: MyBasicViewSegmentParameterI = {
    segment: 'artworks',
    label: 'Werk',
    fields: fieldsArtwork,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentArtworks];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Werk"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default ArtworkView;
