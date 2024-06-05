import { Menu_Links } from "../menu";

export class MyAppInfo {
  static MY_APP_NAME = "Art.Works!";
  static MY_APP_VERSION = "0.1.0"; // Semantic Versioning: https://de.wikipedia.org/wiki/Version_(Software)
  static MY_APP_FOLDER = "Art.Works";

  // https://www.electronjs.org/docs/latest/api/app#appsetaboutpaneloptionsoptions
  static MY_ABOUT_PANEL_OPTIONS: any = {
    copyright: "Carsten Nichte - All rights reserved.", // Mac-OS, Windows, Linux
  };

  static MY_APP_API_NAME = "my_app_api";

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
    },    {
      label: "Gitlab Homepage",
      link: "https://github.com/cnichte/art-works",
    },
  ];
}
