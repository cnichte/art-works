import { Menu_Links } from "../../menu";

/**
 * Basic App-Info, is used in Backend and Frontend.
 */
export class App_Info {
  static MY_APP_NAME = "Art.Works!";
  // TODO use https://www.npmjs.com/package/genversion
  static MY_APP_VERSION = "1.0.0"; // Semantic Versioning: https://de.wikipedia.org/wiki/Version_(Software)
  static MY_APP_FOLDER = "Art.Works!";

  // https://www.electronjs.org/docs/latest/api/app#appsetaboutpaneloptionsoptions
  static MY_ABOUT_PANEL_OPTIONS: any = {
    copyright: "Carsten Nichte - All rights reserved.", // Mac-OS, Windows, Linux
  };

  static HELP_LINKS_DEV: Menu_Links[] = [
    {
      label: "Erfahre mehr",
      link: "https://carsten-nichte.de/publications/applications/art.works/",
    },
    {
      label: "Dokumentation",
      link: "https://carsten-nichte.de/docs/artworks-app-manual/",
    },
    {
      label: "Gitlab Homepage",
      link: "https://github.com/cnichte/art-works",
    },
  ];

  static HELP_LINKS_PROD: Menu_Links[] = [
    {
      label: "Erfahre mehr",
      link: "https://carsten-nichte.de/publications/applications/art.works/",
    },
    {
      label: "Dokumentation",
      link: "https://carsten-nichte.de/docs/artworks-app-manual/",
    },
    {
      label: "Gitlab Homepage",
      link: "https://github.com/cnichte/art-works",
    },
  ];
}
