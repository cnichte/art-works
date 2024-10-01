import { Conf } from "electron-conf/main";
import { FileTool } from  "../../tools/FileTool";
import { DocCatalogType } from "../../../common/types/documents/DocCatalog";

/**
 * this.conf.set("foo", "🌈");
 * console.log(this.conf.get("foo")); // => 🌈
 * Use dot-notation to access nested properties
 * this.conf.set("a.b", true);
 * console.log(this.conf.get("a")); // => {b: true}
 *
 * https://github.com/alex8088/electron-conf
 * https://json-schema.org/
 * 
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 */
export class Database_Settings {
  // implements DatabaseCRUD_Interface

  public conf: Conf;

  constructor() {
    // TODO schema
    let schema: any = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: "https://example.com/product.schema.json",
      title: "Art.Works Settings",
      description: "Alle Settings von Art.Works!",
      type: "object",
      properties: {
        catalog: {
          type: "object",
          properties: {
            startoptionSelected: {
              description: "Die ausgewählte Startoption.",
              type: "string",
            },
            startoptions: {
              description: "Die Startoptionen.",
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    description: "Name der Option",
                    type: "string",
                  },
                  id: {
                    description: "UUID der Option",
                    type: "string",
                  },
                },
              },
            },
            opensOnStartup: {
              description:
                "Die uuid des Katalogs der beim starten geöffnet wird.",
              type: "string",
            },
            dbOptions: {
              description:
                "Die Optionen für eine Datenbank Verbindung (local oder remote).",
              type: "array",
              items: {
                type: "string",
              },
            },
            connections: {
              description: "Sammlung von Datenbank Verbindungen.",
              type: "array",
              items: {
                id: {
                  description: "Die uuid.",
                  type: "string",
                },
                templateName: {
                  description: "Der Name des Templates.",
                  type: "string",
                },
                templateDescription: {
                  description: "Eine Beschreibung des Templates.",
                  type: "string",
                },
                dbOption: {
                  description: "Art der Datenbank",
                  type: "string",
                },
                dbHost: {
                  description: "Der Name des Datenbank-Servers.",
                  type: "string",
                },
                dbPort: {
                  description: "Der Port des Datenbank-Servers.",
                  type: "string",
                },
                dbName: {
                  description: "Der Name der Datenbank.",
                  type: "string",
                },
                dbUser: {
                  description: "Der Username des Datenbank-Nutzers.",
                  type: "string",
                },
                dbPassword: {
                  description: "Das Passwort des Datenbank-Nutzers.",
                  type: "string",
                },
                dbTemplate: {
                  description: "Das URL-Template für die Datenbank-Verbindung.",
                  type: "string",
                },
              },
            },
          },
        },
        address: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        artist: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        artwork: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        award: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        calculation: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        compilation: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        edition: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        exhibition: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        genre: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        groupofwork: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        note: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        publication: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        rental: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        resume: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        sale: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        salerightsofuse: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        tag: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
        whiteboard: {
          type: "object",
          properties: {
            active: {
              description: "Modul aktiv?",
              type: "boolean",
            },
          },
        },
      },
      required: [],
    };

    this.conf = new Conf({
      dir: FileTool.get_apps_home_path(),
      name: "settings",
      ext: ".json",
      // serializer: // i use the default here
      // schema: schema, // TODO Schema gives an exception
      defaults: {
        currentuser: "ec910785479da9e2057e3f5b740ca12c471bcfbcc580b2f2bf37388263523910c771293595c07904da79a7a6228c079d81fa5bc3cc7e0c5bd6758bfb8561bdbf0d968e12828d87dad3866f55ba5168c2a7f831028979db86019b7ae8830bb5973e3298bf49a97dce23beda590ff1129e1e6a6ea1a9f0c8840ea37cb2b2c13a07c88702a7fd7a45672db2b57b8031728a274072c98b06c15d1701c60cefbf0266639bd8a168f7d553dd03b7887854eb4ba93e7a4b81dedaeceb21eb693766cf8cc8835e89e2b647344f056ab8e8249378c6b57866fcbf71165b0501d07250fd5bf0496b7823f275d257cae1ee80382e011e592bd55187e56a4cb8a25062d052d12d366737cf528fba68397858d1bf2592fc42d255029a48fb9ac791a2c3fa5bd6f47fb8e8c7bbd2872fa3aba933e54fa67e355d21fc8f228e7155205c20a7be274fa9167c9fc8bfe24e441e7d97ba500c45b6c6469bb3d5a8e55ba7888ee5abd9e40ee0223dd0901300f523ffa109b2faf1e0f14b07f52f95be4d92f4825e1cb6e9b22598c8e47e8303d1843b083232040d0a9d17af914f5fec1a231f4bb0cf18", // encrypted
        catalog: {
          //! the setting-name is equivalent to the doctype
          startoptions: {
            selected: "98673942-8fd5-4d9e-82c3-e24ddf03d9f3",
            options: [
              {
                name: "Open the last used catalogue on startup.",
                id: "d0254d49-cf47-45a1-9b66-7ae8ad32f131",
              },
              {
                name: "Open a specific catalogue on startup.",
                id: "32fe3517-161c-4146-86c8-8bd5e993d671",
              },
            ],
            opensOnStartup: "4f44e5f7-3e11-43d9-aed5-0c2b9633a64",
          },

          dbOptions: [
            {
              type: "local",
              label: "Ich nutze eine lokale Datenbank",
              template: "{dbName}",
            },
            {
              type: "remote",
              label: "Ich nutze einen Datenbank-Server",
              template:
                "{protocoll}://{dbUser}:{dbPassword}@{dbHost}:{dbPort}/{dbName}",
            },
          ],
          connection: {
            selected: "4f44e5f7-3e11-43d9-aed5-0c2b9633a64f",
            options: [
              {
                id: "4f44e5f7-3e11-43d9-aed5-0c2b9633a64f",
                docType: "catalog",
                templateName: "Pouchdb Test",
                templateDescription:
                  "This is database Number one. The real existing one.",
                dbOption: "local",
                protocoll: "",
                dbHost: "",
                dbPort: "",
                dbName: "pouchdb-test",
                dbUser: "",
                dbPassword: "",
                dbTemplate: "{dbName}",
              },
              {
                id: "7bea1ea4-ad6c-4d61-aec9-bdcc35a5030f",
                docType: "catalog",
                templateName: "Test Database 2",
                templateDescription: "This is database 2",
                dbOption: "local",
                protocoll: "",
                dbHost: "",
                dbPort: "",
                dbName: "test-database-2",
                dbUser: "",
                dbPassword: "",
                dbTemplate: "{dbName}",
              },
              {
                id: "af5401da-4226-4560-adc9-34ae18a426b4",
                docType: "catalog",
                templateName: "Werkverzeichnis Carsten Nichte (remote)",
                templateDescription: "Database on fileserver02",
                dbOption: "remote",
                protocoll: "http",
                dbHost: "fileserver02",
                dbPort: "5984",
                dbName: "werkverzeichnis",
                dbUser: "admin",
                dbPassword: "adminadmin",
                dbTemplate:
                  "{protocoll}://{dbUser}:{dbPassword}@{dbHost}:{dbPort}/{dbName}",
              },
            ],
          },
        },
        global: {
          list:{
            startViewType:"list",
            startCardSizeIndex: 15
          },
          view:{
            lastTab:"grid",
          },
          form:{
            lastTab:"grid",
          }
        },        
        address: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        artist: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        artwork: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{            
            useGlobal:true,
          }
        },
        award: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        calculation: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        compilation: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        edition: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        exhibition: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        genre: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        groupofwork: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        note: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        publication: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        rental: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        resume: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        sale: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        salerightsofuse: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        tag: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },
        whiteboard: {
          active: true,
          list:{
            useGlobal:true,
            lastViewType:"grid",
            lastCardSize:""
          },
          view:{
            useGlobal:true,
            lastTab:"grid",
          },
          form:{
            useGlobal:true,
          }
        },

      }, // defaults
    });
  }

  get_database_uri_from_startoptions(): string {
    return this.get_database_uri_from_uuid(
      this.get_database_uuid_from_startoptions()
    );
  }

  get_database_template_from_uuid(db_uuid: string): DocCatalogType {
    let options: DocCatalogType[] = this.conf.get(
      "catalog.connection.options"
    ) as DocCatalogType[];

    const db_options: DocCatalogType[] = options.filter((item) => {
      if (item.id === db_uuid) {
        return item;
      }
    });

    return db_options[0];
  }

  get_database_uri_from_uuid(db_uuid: string): string {
    const db_option: any = this.get_database_template_from_uuid(db_uuid);

    let result = db_option.dbTemplate.replace(
      /{(\w+)}/g,
      function (_: any, k: string | number) {
        return db_option[k];
      }
    );

    return result;
  }

  get_database_uuid_from_startoptions(): string {
    let db_uuid: string = "";

    const so_selected: string = this.conf.get(
      "catalog.startoptions.selected"
    ) as string;

    switch (so_selected) {
      case "d0254d49-cf47-45a1-9b66-7ae8ad32f131": // "Open the last used catalogue on startup."
        db_uuid = this.conf.get("catalog.connection.selected") as string;
        break;
      case "32fe3517-161c-4146-86c8-8bd5e993d671": // "Open a specific catalogue on startup."
        db_uuid = this.conf.get(
          "catalog.startoptions.opensOnStartup"
        ) as string;
        break;
      default:
        db_uuid = this.conf.get("catalog.connection.selected") as string;
    }
    return db_uuid;
  }
}

/*



      "material":{
      "Unbearbeitetes Material": ["Stein", "Holzstamm", "Lehm"],
      "Natürliches Material": ["Äste", "Blumen", "Sand"],
      "Künstliches Material": ["Schaumstoff", "Styropor", "Kunststoffe"],
      "Organisches Material": ["Wolle", "Blätter", "Holz"],
      "Anorganisches Material": ["Kies", "Ocker", "Terra di Siena"],
      "Gerettetes Material": ["Altpapier", "Verpackungen", "Korken"],
      "Alltagsmaterial": ["Wasserfarben", "Kreiden", "Wachsmalstifte"],
      "Wertvolles Material": ["Gold", "ausgesuchte Pigmente", "Silber"],
      "Objekte als Material": ["Trichter", "Töpfe", "Bücher"],
      "Selbst herstellbares Material": ["Knete", "Salzteig", "Papier"],
      "Digitales Material":["Audio", "Video", "Bild", "Code", "Text"],
      "Szenisches Spiel, performative Prozesse":[ "Körper", "Räume", "Sprache", "Töne", "Klänge"],
      "Brain-Material":["Gedanken", "Ideen", "Konzepte"]
    },
    "modules":{
      "address":{
        "active":true
      },
      "artist":{
        "active":true
      },
      "artwork":{
        "active":true
      },
      "award":{
        "active":true
      },
      "calculation":{
        "active":true
      },
      "catalogs":{
        "active":true
      },
      "compilation":{
        "active":true
      },
      "edition":{
        "active":true
      },
      "exhibition":{
        "active":true
      },
      "firststart":{
        "active":true
      },
      "genre":{
        "active":true
      },
      "groupofwork":{
        "active":true
      },
      "note":{
        "active":true
      },
      "publication":{
        "active":true
      },
      "rental":{
        "active":true
      },
      "sale":{
        "active":true
      },
      "salerightsofuse":{
        "active":true
      }
      ,
      "settings":{
        "active":true
      },
      "statistic":{
        "active":true
      },
      "tag":{
        "active":true
      },
      "whiteboard":{
        "active":true
      }
    }
}


*/
