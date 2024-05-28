/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

const IPC_CHANNEL = 'ipc-transform';

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 */
export default class TransportTool {
  /**
   * Request, der vom Standard abweicht: 'request:saletypes-custom'.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param request
   * @param module
   * @param options
   */
  public static transporRequest(request: string, module: string, options: any) {
    console.log(`------> form transporRequest: ${request}`);
    window.app_api.ipc.sendMessage(IPC_CHANNEL, [
      request,
      module,
      options,
    ]);
  }

  public static transportResponse(
    request: string,
    setData: (data: any) => void
  ) {
    //! ipcRenderer.on oder ipcRenderer.once
    // For forms, several requests are made (from the used ReactComponents) to the backend
    // For example: artworkForm uses also myTag...
    // That's why I use 'on' here and have to choose from the different
    // answers and have to choose the one that suits me.
    // If I only expect one answer, I can use once.
    window.app_api.ipc.on(IPC_CHANNEL, (arg: any) => {
      if (arg.request === request) {
        // eslint-disable-next-line prettier/prettier
        console.log(`<------ form transportResponse, for Request: ${request}, received arg.data=`, arg.data);
        setData(arg.data);
      }
    });
  }
}
