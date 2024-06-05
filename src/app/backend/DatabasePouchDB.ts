// import { Whiteboard } from './../modules/whiteboard/backend/docs/Whiteboard';

/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

// https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
// https://stackoverflow.com/questions/52800286/cant-use-pouchdb-with-typescript-types-problem
// import PouchDB from 'pouchdb';
// import { Console } from 'node:console'; // https://nodejs.org/api/console.html
import rel from 'relational-pouch'; // https://github.com/pouchdb-community/relational-pouch
import find from 'pouchdb-find';

import { v4 as uuidv4 } from 'uuid';

// TODO Dieser emet import von pouchdb-browser ist nicht so doll...
// https://pouchdb.com/custom.html#presets
// import { emit } from 'pouchdb-browser';

import { Address } from '../modules/address/backend/docs/Address';
import { AddressType } from '../modules/address/backend/docs/AddressType';
import { Artist } from '../modules/artist/backend/docs/Artist';
import { Artwork } from '../modules/artwork/backend/docs/Artwork';
import { Award } from '../modules/award/backend/docs/Award';
import { Calculation } from '../modules/calculation/backend/docs/Calculation';
import { CalculationGroup } from '../modules/calculation/backend/docs/CalculationGroup';
import { CalculationItem } from '../modules/calculation/backend/docs/CalculationItem';
import { Compilation } from '../modules/compilation/backend/docs/Compilation';
import { Edition } from '../modules/edition/backend/docs/Edition';
import { EditionPrice } from '../modules/edition/backend/docs/EditionPrice';
import { EditionType } from '../modules/edition/backend/docs/EditionType';
import { Exhibition } from '../modules/exhibition/backend/docs/Exhibition';
import { ExhibitionType } from '../modules/exhibition/backend/docs/ExhibitionType';
import { Genre } from '../modules/genre/backend/docs/Genre';
import { GroupOfWork } from '../modules/groupofwork/backend/docs/GroupOfWork';
import { Note } from '../modules/note/backend/docs/Note';
import { Publication } from '../modules/publication/backend/docs/Publication';
import { PublicationType } from '../modules/publication/backend/docs/PublicationType';
import { PublicationWhat } from '../modules/publication/backend/docs/PublicationWhat';
import { PublicationMedium } from '../modules/publication/backend/docs/PublicationMedium';
import { Resume } from '../modules/artist/backend/docs/Resume';
import { ResumeType } from '../modules/artist/backend/docs/ResumeType';
import { Sale } from '../modules/sale/backend/docs/Sale';
import { SaleRightsOfUse } from '../modules/salerightsofuse/backend/docs/SaleRightsOfUse';
import { SaleRightsOfUseType } from '../modules/salerightsofuse/backend/docs/SaleRightsOfUseType';
import { SaleType } from '../modules/sale/backend/docs/SaleType';
import { Tag } from '../modules/tag/backend/docs/Tag';
// import { Whiteboard } from '../modules/tag/backend/docs/Whiteboard';

import { DatabaseCRUDI } from '../common/backend/types/DatabaseCRUDInterface';

import PouchDB from 'pouchdb';

/**
 * Datei: /src/app/backend/Database.ts
 * Das ist ein Wrapper um die PouchDB für den Datenbankzugriff.
 *
 * TODO https://github.com/pouchdb-community/relational-pouch
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @class DatabasePouchDB
 * @implements {DatabaseCRUDInterface}
 */
export class DatabasePouchDB implements DatabaseCRUDI {
  serverUri: string;

  databaseName: string;

  db: any;

  /**
   * Creates an instance of DatabasePouchDB, that syncs to the remote.
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} serverUri - The Server URI
   * @param {string} databaseName - The Database Name
   * @memberof DatabasePouchDB
   */
  constructor(serverUri: string, databaseName: string) {
    this.databaseName = databaseName;

    // PouchDB.plugin(require('pouchdb-authentication'));
    PouchDB.plugin(rel);
    PouchDB.plugin(find);

    this.serverUri = serverUri + (serverUri.endsWith('/') ? '' : '/');

    if (serverUri.length > 0 && serverUri.startsWith('http')) {
      console.log('create remote store');
      this.db = new PouchDB(serverUri + databaseName, {
        skip_setup: false,
      });
    } else {
      const localStore = `${serverUri}catalogs/${databaseName}`;
      console.log(`create local store${localStore}`);

      this.db = new PouchDB(localStore, {
        skip_setup: false,
      });
    }

    // db will not be created until you do an API call, like this...
    // Database information
    this.db
      .info()
      .then(function handleResult(info: any) {
        console.info('########## Database Information - start');
        console.info(info);
        console.info('########## Database Information - end');
      })
      .catch(function handleError(err: any) {
        console.error('########## Database Error - start');
        console.error(err);
        console.error('########## Database Error - end');
      });

    //* constructor()
    // ----------------------------------------------------------
  }

  /**
   ** Initialisiert die Datenbank.
   *
   ** Für mich ist Compilation == Collection
   *       ...also eine Sammlung
   *
   ** Define Entities and Relationships:
   * https://mermaid.js.org/syntax/entityRelationshipDiagram.html
   * https://github.com/pouchdb-community/relational-pouch#many-to-one-relationships
   * https://guides.emberjs.com/release/models/defining-models/
   *
   * Es gibt im Grunde die zwei Varianten:
   *
   * to-one  : 'profile': {belongsTo: 'profile'}
   * to-Many : 'books': {hasMany: 'book'}
   *
   * in den Ausprägungen: 1:1, 1:n, n:m
   * -------------------------------------------
   *
   * Address ||--|| AddressType : "1:1"
   * Address ||--o{ Sale : "1:n"
   *
   * AddressType ||--o{ Address : "1:n"
   *
   * Artist ||--o{ Resume : "1:n"
   * Artist ||--o{ Artwork : "1:n"
   *
   * Artwork ||--o{ Artist : "1:n (originator)"
   * Artwork ||--o{ GroupOfWork : "1:n"
   * Artwork ||--o{ Compliation : "1:n"
   * Artwork ||--o{ Publication : "1:n"
   * Artwork ||--o{ Edition : "1:n"
   * Artwork ||--o{ Sale : "1:n"
   * Artwork ||--o{ Exhibition : "1:n"
   * Artwork ||--o{ Award : "1:n"
   * Artwork ||--o{ Genre : "1:n"
   * Artwork ||--o{ Tag : "1:n"
   * Artwork ||--o{ Note : "1:n"
   *
   * Award ||--o{ Artwork : "1:n"
   * Award ||--|| Compliation : "1:1"
   * Award ||--|| Publication : "1:1"
   * Award ||--o{ Note : "1:n"
   *
   * Compilation ||--o{ Artwork : "1:n"
   * Compilation ||--o{ Award : "1:n"
   * Compilation ||--o{ Note : "1:n"
   *
   * TODO Edition stimmt so noch nicht...
   * Das ist eine Art Template,
   * das auf ein Artwork angewendet wird...
   * Jedes Bild einer Edition benötigt
   * ja seinen individuellen Zähler
   ** -> Das wird im Sale gemacht?!
   *
   * TODO Ich brauch ein Objekt das artwork und editon verknüpft?
   *
   * Edition ||-- Artwork : "1:1"
   * Edition ||--|| EditionType : "1:1"
   * Edition ||--o{ Note : "1:n"
   *
   * EditionType  ||--o{ Edition : "1:n"
   *TODO ...
   * Exhibition ||--o{ Artwork : "1:n"
   * Exhibition ||--|| ExhibitionType : "1:1"
   *
   * ExhibitionType ||--o{ Exhibition : "1:n"
   *
   * Genre ||--o{ Artwork : "1:n"
   *
   * GroupOfWork ||--o{ Artwork : "1:n"
   * GroupOfWork ||--o{ Note : "1:n"
   *
   * Note ||--o{ Artwork : "1:n"
   * Note ||--o{ GroupOfWork : "1:n"
   * Note ||--o{ Publication : "1:n"
   *
   * Publication ||--o{ Artwork : "1:n"
   * Publication ||--o{ Award : "1:n"
   * Publication ||--o{ Note : "1:n"
   *
   * PublicationType
   * PublicationWhat
   * PublicationMedium
   *
   * Resume ||--|| Artist : "1:1"
   * Resume ||--|| ResumeType : "1:1"
   *
   * ResumeType ||--o{ Resume : "1:n"
   *
   * Sale ||--|| Address : "1:1"
   * Sale ||--|| Artwork : "1:1"
   * Sale ||--|| SaleType : "1:1"
   * Sale ||--|| SaleRightsOfUse : "1:1"
   * Sale ||--|| SaleRightsOfUseType : "1:n"
   *
   * SaleRightsOfUse ||--o{ Sale : "1:n"
   * SaleRightsOfUseType ||--o{ Sale : "1:n"
   *
   * SaleType ||--o{ Sale : "1:n"
   *
   * Tag ||--o{ Artwork : "1:n"
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {boolean} [insertExampleData=false]
   * @param {boolean} [createViews=false]
   * @return {*}  {Promise<any>}
   * @memberof DatabasePouchDB
   */
  async initialize(
    insertExampleData: boolean = false,
    createViews: boolean = false
  ): Promise<any> {
    // TODO Überprüfe die Relationen...
    this.db.setSchema([
      {
        singular: 'address',
        plural: 'addresses',
        relations: {
          addressType: { belongsTo: 'addressType' },
          sales: { hasMany: 'sale' },
        },
      },
      {
        singular: 'addressType',
        plural: 'addressTypes',
      },
      {
        singular: 'artist',
        plural: 'artists',
        relations: {
          resumes: { hasMany: 'resume' },
          artworks: { hasMany: 'artwork' },
        },
      },
      {
        singular: 'artwork',
        plural: 'artworks',
        relations: {
          artists: { hasMany: 'artist' },
          groupsofwork: { hasMany: 'groupofwork' },
          compliations: { hasMany: 'compilation' },
          publications: { hasMany: 'publication' },
          editions: { hasMany: 'edition' },
          sales: { hasMany: 'sale' },
          exhibitions: { hasMany: 'exhibitions' },
          awards: { hasMany: 'award' },
          genres: { hasMany: 'genre' },
          tags: { hasMany: 'tag' },
          notes: { hasMany: 'note' },
        },
      },
      {
        singular: 'award',
        plural: 'awards',
        relations: {
          artwork: { hasMany: 'artwork' },
          compilation: { belongsTo: 'compilation' },
          publication: { belongsTo: 'publication' },
          notes: { hasMany: 'note' },
        },
      },
      {
        singular: 'calculation',
        plural: 'calculations',
        relations: {
          calculationgroup: { belongsTo: 'calculationgroup' },
          calculationitems: { hasMany: 'calculationitem' },
          notes: { hasMany: 'note' },
        },
      },
      {
        singular: 'calculationgroup',
        plural: 'calculationgroups',
        relations: {
          calculations: { hasMany: 'calculation' },
        },
      },
      {
        singular: 'calculationitem',
        plural: 'calculationitems',
        relations: {
          calculations: { hasMany: 'calculation' },
        },
      },
      {
        singular: 'compilation',
        plural: 'compilations',
        relations: {
          artworks: { hasMany: 'artwork' },
          awards: { hasMany: 'award' },
          notes: { hasMany: 'note' },
        },
      },
      {
        singular: 'edition',
        plural: 'editions',
        relations: {
          editionType: { belongsTo: 'editionType' },
          artworks: { hasMany: 'artwork' },
          sales: { hasMany: 'sale' },
        },
      },
      {
        singular: 'editionType',
        plural: 'editionTypes',
        relations: {
          editions: { hasMany: 'edition' },
        },
      },
      {
        singular: 'exhibition',
        plural: 'exhibitions',
        relations: {
          artworks: { hasMany: 'artwork' },
          exhibitionType: { belongsTo: 'exhibitionType' },
        },
      },
      {
        singular: 'exhibitionType',
        plural: 'exhibitionTypes',
        relations: {
          exhibitions: { hasMany: 'exhibition' },
        },
      },
      {
        singular: 'genre',
        plural: 'genres',
        relations: {
          artworks: { hasMany: 'artwork' },
        },
      },
      {
        singular: 'groupofwork',
        plural: 'groupsofwork',
        relations: {
          artworks: { hasMany: 'artwork' },
        },
      },
      {
        singular: 'note',
        plural: 'notes',
        relations: {
          artworks: { hasMany: 'artwork' },
          tags: { hasMany: 'tag' },
        },
      },
      {
        singular: 'publication',
        plural: 'publications',
        relations: {
          publicationType: { belongsTo: 'publicationType' },
          publicationWhat: { belongsTo: 'publicationWhat' },
          publicationMedium: { belongsTo: 'publicationMedium' },
          artworks: { hasMany: 'artwork' },
          sales: { hasMany: 'sale' },
        },
      },
      {
        singular: 'publicationType',
        plural: 'publicationTypes',
        relations: {
          publications: { hasMany: 'publication' },
        },
      },
      {
        singular: 'publicationWhat',
        plural: 'publicationWhats',
        relations: {
          publications: { hasMany: 'publication' },
        },
      },
      {
        singular: 'publicationMedium',
        plural: 'publicationMediums',
        relations: {
          publications: { hasMany: 'publication' },
        },
      },
      {
        singular: 'resume',
        plural: 'resumes',
        relations: {
          resumeType: { belongsTo: 'resumeType' },
          artist: { belongsTo: 'artist' },
        },
      },
      {
        singular: 'resumeType',
        plural: 'resumeTypes',
        relations: {
          resumes: { hasMany: 'resume' },
        },
      },
      {
        singular: 'sale',
        plural: 'sales',
        relations: {
          saleType: { belongsTo: 'saleType' },
          customer: { belongsTo: 'address' },
          artwork: { belongsTo: 'artwork' },
          edition: { belongsTo: 'edition' },
          SaleRightsOfUse: { belongsTo: 'salerightsofuse' },
        },
      },
      {
        singular: 'saleType',
        plural: 'saleTypes',
        relations: {
          sales: { hasMany: 'sale' },
        },
      },
      {
        singular: 'salerightsofuse',
        plural: 'salerightsofuses',
        relations: {
          saleRightsOfUseType: { belongsTo: 'salerightsofuseType' },
          sales: { hasMany: 'sale' },
        },
      },
      {
        singular: 'salerightsofuseType',
        plural: 'salerightsofuseType',
        relations: {
          saleRightsOfUses: { hasMany: 'salerightsofuse' },
        },
      },
      {
        singular: 'tag',
        plural: 'tags',
        relations: {
          parent: { belongsTo: 'tag' },
          childs: { hasMany: 'tag' },
          artworks: { hasMany: 'artwork' },
          notes: { hasMany: 'note' },
        },
      },
    ]);

    // TODO Index
    //  https://github.com/apache/couchdb/issues/1852
    this.db
      .createIndex({
        index: {
          name: 'tagsIndex',
          fields: ['_id', 'data.name'],
          partial_filter_selector: {
            'data.doctype': { $eq: 'tag' },
            'data.parent': { $eq: '' },
          },
        },
      })
      .then(function (result: any) {
        console.log('############ - INDEX CREATED', result);
      })
      .catch(function (err: any) {
        console.log('############ - INDEX ERROR', err);
      });

    this.db.on('indexing', function (event: any) {
      console.log('############ - INDEX UPDATED', event);
    });

    if (insertExampleData) {
      console.info('CREATE CONTENT IN DATABASE...');

      // /*
      Address.loadTo(this);
      AddressType.loadTo(this);
      Artist.loadTo(this);
      Artwork.loadTo(this);
      Award.loadTo(this);
      Calculation.loadTo(this);
      CalculationGroup.loadTo(this);
      CalculationItem.loadTo(this);
      Compilation.loadTo(this);
      Edition.loadTo(this);
      // EditionPrice.loadTo(this);
      // EditionType.loadTo(this);
      Exhibition.loadTo(this);
      ExhibitionType.loadTo(this);
      Genre.loadTo(this);
      GroupOfWork.loadTo(this);
      Note.loadTo(this);
      Publication.loadTo(this);
      PublicationType.loadTo(this);
      PublicationWhat.loadTo(this);
      PublicationMedium.loadTo(this);
      Resume.loadTo(this);
      ResumeType.loadTo(this);
      Sale.loadTo(this);
      SaleRightsOfUse.loadTo(this);
      SaleRightsOfUseType.loadTo(this);
      SaleType.loadTo(this);
      Tag.loadTo(this);
      // Whiteboard.loadTo(this);
      // */
    }

    // TODO create some Views?
    if (createViews) {
      /*
      // https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html
      // document that tells PouchDB/CouchDB
      // to build up an index on doc.name
      const index = {
        _id: '_design/my_index',
        views: {
          my_index: {
            map: function (doc: { name: string | symbol }) {
              // emit(doc.name);
            }.toString(),
          },
        },
      };

      // save it
      this.db.put(index).then(function handleThen(this: any) {
        // kick off an initial build, return immediately
        return this.db.query('my_index', { stale: 'update_after' });
      });
  */
    }

    /** Kooperation?
    {
      docType: 'kooperation',
      description: 'Zusammenarbeit mit Andrea Schwelle',
      note: 'Thema sowieso',
      kuenstler: [],
      artworks: [],
    }

    Das ist eigentlich Historie: Verkäufe, Verleihungen, Wettbewerbpreise,...

    */

    return Promise.resolve(true);

    // initialize()
    // ----------------------------------------------------------
  }

  /**
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @memberof DatabasePouchDB
   */
  logout() {
    this.db.logOut();
  }

  /**
   * Erzeugt neue, leere JSON-Objekte.
   * Für das Formular für den mode 'new'.
   * Im pouchdb / relational-pouch Datenbank-Style.
   * TODO Die anderen Objekte noch erzeugen...
   * TODO Das geht auch eleganter...
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} the_type
   * @return {*}  {Promise<any>}
   * @memberof DatabasePouchDB
   */
  objectFactory(the_type: string): Promise<any> {
    const obj:any = {};
    let json:any = {};
    let name = '';

    switch (the_type) {
      case 'address': {
        json = new Address().toJson();
        name = 'addresses'; // json.docType
        break;
      }
      case 'artist': {
        json = new Artist().toJson();
        name = 'artists';
        break;
      }
      case 'artwork': {
        json = new Artwork().toJson();
        name = 'artworks';
        break;
      }
      case 'award': {
        json = new Award().toJson();
        name = 'awards';
        break;
      }
      case 'calculation': {
        json = new Calculation().toJson();
        name = 'calculations';
        break;
      }
      case 'calculationgroup': {
        json = new CalculationGroup().toJson();
        name = 'calculationgroups';
        break;
      }
      case 'calculationitem': {
        json = new CalculationItem().toJson();
        name = 'calculationitems';
        break;
      }
      case 'compilation': {
        json = new Compilation().toJson();
        name = 'compilations';
        break;
      }
      case 'edition': {
        json = new Edition().toJson();
        name = 'editions';
        break;
      }
      case 'exhibition': {
        json = new Exhibition().toJson();
        name = 'exhibitions';
        break;
      }
      case 'genre': {
        json = new Genre().toJson();
        name = 'genres';
        break;
      }
      case 'groupofwork': {
        json = new GroupOfWork().toJson();
        name = 'groupsofwork';
        break;
      }
      case 'note': {
        json = new Note().toJson();
        name = 'notes';
        break;
      }
      case 'publication': {
        json = new Publication().toJson();
        name = 'publication';
        break;
      }
      case 'resume': {
        json = new Resume().toJson();
        name = 'resumes';
        break;
      }
      case 'sale': {
        json = new Sale().toJson();
        name = 'sales';
        break;
      }
      case 'salerightsofuse': {
        json = new SaleRightsOfUse().toJson();
        name = 'salerightsofuses';
        break;
      }
      case 'tags': {
        json = new Tag().toJson();
        name = 'tags';
        break;
      }
      default: {
        // statements;
        console.log(
          `########## DatabasePouchDB.objectFactory() couldnt create an Object for ${the_type}`
        );
        break;
      }
    }

    // TODO Meine Dokumente sollten noch eine Art 'Identifiable' Interface bekommen?

    json.id = uuidv4();
    obj[name] = [json]; //! Wichtig: Der Name muss stimmen!
    // und zwar mit dem Namen des Properties übereinstimmen,
    // das relational-pouch bei Abfragen aus der datenbank zurück liefert...
    return Promise.resolve(obj);
  }

  /* ----------------------------------------------------------

    CRUD - start
    TODO https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
    TODO https://pouchdb.com/2015/02/28/efficiently-managing-ui-state-in-pouchdb.html

    ---------------------------------------------------------- */

  /**
   * Creates a record in the database, using relational-pouch.
   *
   ** https://github.com/pouchdb-community/relational-pouch
   * const _id = this.db.rel.makeDocID({ type: data.docType, id: data.id });
   *
   * use standard pouchdb: this.db.put(data);
   *
   * @param {*} data
   * @return {*}  {Promise<any>}
   * @memberof DatabasePouchDB
   */
  create(data: any): Promise<any> {
    return this.db.rel.save(data.docType, data);
  }

  /**
   * Read from Query, using standard pouchdb.
   * https://pouchdb.com/api.html#query_index
   *
   * @param query The Mango Query
   * @returns A Promise
   */
  readFromQuery(query: Object): Promise<any> {
    return this.db.find(query);
  }

  /**
   * Read from ID, using standard pouchdb.
   * https://pouchdb.com/api.html#fetch_document
   *
   * @param uuid The UUID
   * @param options
   * @returns
   */
  // eslint-disable-next-line no-dupe-class-members
  readFromID(uuid: string, options: any): Promise<any> {
    return this.db.get(uuid, options);
  }

  // TODO readFromRelations ...das alle ausprobieren...
  readFromRelations(type: string, options: Object): Promise<any> {
    return this.db.rel.find(type, options);
  }

  /**
   * Read from the database, using relational-pouch.
   * @param type
   * @param id
   * @returns
   */
  readFromRelationsID(type: string, id: string): Promise<any> {
    return this.db.rel.find(type, id);
  }

  /**
   * Update a record in the database, using relational-pouch.
   *
   * @param type
   * @param data
   * @returns
   */
  update(type: string, data: any): Promise<any> {
    /*
    if (!Object.prototype.hasOwnProperty.call(data, '_rev')) {
      throw new Error(
        `Update kann nicht durchgeführt werden. Das Property _rev fehlt im Datenobjekt!`
      );
    }
*/
    return this.db.rel.save(type, data); // this.db.put(data);
  }

  /**
   * Delete a record in the database, using relational-pouch.
   *
   * @param type
   * @param data
   * @returns
   */
  delete(type: string, data: any): Promise<any> {
    return this.db.rel.del(type, data);
  }

  /**
   * Das benutze ich nicht, weil ich die Attachments direkt im document übergebe.
   * 
   * https://github.com/pouchdb-community/relational-pouch?tab=readme-ov-file#dbrelputattachmenttype-object-attachmentid-attachment-attachmenttype
   * 
   * @param doc_type 
   * @param doc_id -  {id:1, rev:"1-..."}
   * @param attachment_id 
   * @param attachment_data 
   * @param attachment_content_type 
   * @returns 
   */
  addAttachment(
    doc_type: string,
    doc_id: any,
    attachment_id:string,
    attachment_data: any,
    attachment_content_type: string
  ): Promise<any> {
    return this.db.rel.putAttachment(
      doc_type,
      doc_id,
      attachment_id,
      attachment_data,
      attachment_content_type
    );
  }

  /**
   * 
   * @param doc_type 
   * @param doc_id 
   * @param attachment_id 
   * @returns 
   */
  getAttachment(
    doc_type: string,
    doc_id: string,
    attachment_id: string
  ): Promise<any> {
    return this.db.rel.getAttachment(doc_type, doc_id, attachment_id);
  }

  /**
   * Das benutze ich nicht weil  ich das Attachment direkt im Dokument übergebe.
   * @param type 
   * @param data 
   * @param attachmentId 
   * @returns 
   */
  removeAttachment(
    type: string,
    data: any,
    attachmentId: string
  ): Promise<any> {

    return new Promise<String>((resolve, reject) => {
      //saving MyClass using http service
      //return the saved MyClass or error
      // var savedPackage : Package = updatedPackage;
      // if (isSomeCondition) {
      //   throw new Error('No reason but to reject');
      //}

      setTimeout( () => {
          resolve("savedPackage");
      }, 1500);
  });
  }

  /* ----------------------------------------------------------

    CRUD - end

    ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    From here is test stuff

    ---------------------------------------------------------- */

  /**
   * Delete all Files.
   */
  deleteAll(): Promise<any> {
    return this.db
      .allDocs({ include_docs: true })
      .then((allDocs: { rows: any[] }) => {
        return allDocs.rows.map((row: { id: any; doc: { _rev: any } }) => {
          return { id: row.id, _rev: row.doc._rev, _deleted: true };
        });
      })
      .then((deleteDocs: any) => {
        return this.db.bulkDocs(deleteDocs);
      });
  }
}
