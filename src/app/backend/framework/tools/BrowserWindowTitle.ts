import { BrowserWindow } from "electron";

/**
 * Helper-Class to compose and set
 * the BrowserWindow-Title
 * from current user and catalog.
 * TODO rename to BrowserWindowTitle_Composer 
 */
export class BrowserWindowTitle {
  public static browserWindow: BrowserWindow;
  private static catalog: string = "Kein Katalog gewählt";
  private static user: string = "Bitte anmelden!";

  public static setCatalog(name: string) {
    BrowserWindowTitle.catalog = `Catalog: '${name}'`;
    BrowserWindowTitle.setTitle();
  }
  public static setUser(name: string) {
    BrowserWindowTitle.user = `Benutzer: ${name}`;
    BrowserWindowTitle.setTitle();
  }
  private static setTitle() {
    // compose and set the BrowserWindow title
    BrowserWindowTitle?.browserWindow.setTitle(
      BrowserWindowTitle.catalog + " | " + BrowserWindowTitle.user
    );
  }
}
