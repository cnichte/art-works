import { Conf } from "electron-conf/main";
import { FileTool } from "../../tools";
import { DocCatalogType } from "../../../../common/framework/types/documents/DocCatalog";
import { APP_CONF, APP_CONF_SCHEMA } from "../../../custom/database/settings";

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

    this.conf = new Conf({
      dir: FileTool.get_apps_home_path(),
      name: "settings",
      ext: ".json",
      // serializer: // i use the default here
      // schema: APP_CONF_SCHEMA, // TODO Schema gives an exception
      defaults: APP_CONF,
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
