import { Menu_Links } from "../menu";

export class MyAppInfo {

    static MY_APP_NAME = 'Art.Works!';
    static MY_APP_VERSION = '0.1.0'; // Semantic Versioning: https://de.wikipedia.org/wiki/Version_(Software)
    static MY_APP_FOLDER = 'Art.Works';

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
        }
      ];
    
      static HELP_LINKS_PROD: Menu_Links[] = [
        {
          label: "Erfahre mehr",
          link: "https://carsten-nichte.de/publications/applications/art.works/",
        },
        {
          label: "Dokumentation",
          link: "https://carsten-nichte.de/docs/artworks-app-manual/",
        }
      ];


}