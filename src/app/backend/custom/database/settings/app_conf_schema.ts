export const APP_CONF_SCHEMA: any = {
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
          description: "Die uuid des Katalogs der beim starten geöffnet wird.",
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
