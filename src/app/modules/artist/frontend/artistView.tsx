/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';
import Segments from '../../../common/frontend/Segments';

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
 * @returns ArtistView
 */
function ArtistView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const moduleId = 'artist';

  const requests = RequestFactory.getViewRequestsFor(moduleId, 'ipc-database');

  /* ----------------------------------------------------------

    Standard View Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Fields (rendered in Tables, or Descriptions)

   ---------------------------------------------------------- */
  const fieldsArtist: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'name',
      label: 'Name',
    },
    {
      dataIndex: 'alias',
      label: 'Künstlername',
    },
    {
      dataIndex: 'birthdate',
      label: 'Geburtstag',
    },
    {
      dataIndex: 'phone',
      label: 'Telefon',
    },
    {
      dataIndex: 'url',
      label: 'Webadresse',
    },
    {
      dataIndex: 'mail',
      label: 'EMail Adresse',
    },
    {
      dataIndex: 'street',
      label: 'Strasse',
    },
    {
      dataIndex: 'postalCode',
      label: 'Postleitzahl',
    },
    {
      dataIndex: 'city',
      label: 'Stadt',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const fieldsResume: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'title',
      label: 'Titel',
    },
    {
      dataIndex: 'resumeType',
      label: 'Typ',
      mapKeyTo: {
        dataIndex: 'resumeTypes',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'what',
      label: 'Was',
    },
    {
      dataIndex: 'where',
      label: 'Wo',
    },
    {
      dataIndex: 'from',
      label: 'von',
    },
    {
      dataIndex: 'to',
      label: 'bis',
    },
  ];

  /* ----------------------------------------------------------

    Segmente (rendered in Tabs)

   ---------------------------------------------------------- */

  const segmentArtists: MyBasicViewSegmentParameterI = {
    segment: 'artists',
    label: 'Künstler',
    fields: fieldsArtist,
    relationFilterIdField: 'id',
    render: 'description',
  };

  const segmentResumes: MyBasicViewSegmentParameterI = {
    segment: 'resumes',
    label: 'Lebenslauf',
    fields: fieldsResume,
    relationFilterIdField: 'artist',
    render: 'table',
  };

  const segments = new Segments(); // Relation Backlink to

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentArtists,
    segmentResumes,
    Segments.getSegmentArtworks('artists'),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicView
      id={id}
      moduleLabel="Künstler"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}

export default ArtistView;

/*
        <Timeline>
          {data.resumes.map((resume) => (
            <Timeline.Item>{resume.title}</Timeline.Item>
          ))}
        </Timeline>
*/
