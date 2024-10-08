import { contextBridge, ipcRenderer } from "electron";
import { IElectronAPI } from "./app/common/framework/types/system/IElectronAPI";
import { IPC_Channels } from "./app/common/framework/types/system/IPC_Channels";

/**
 * See the Electron documentation for details on how to use preload scripts:
 * https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
 *
 * The preload script contains code that runs
 * before your web page is loaded into the browser window.
 * It has access to both DOM APIs and Node.js environment,
 * and is often used to expose privileged APIs
 * to the renderer via the contextBridge API.
 *
 * Electron apps often use the preload script
 * to set up inter-process communication (IPC) interfaces
 * to pass arbitrary messages between the main and render.
 *
 * https://www.jsgarden.co/blog/how-to-handle-electron-ipc-events-with-typescript
 */
const electronAPI: IElectronAPI = {
  // ######################################################################
  // This supports my Applications API
  // ######################################################################

  //! Pattern 1: Renderer to main (one-way)
  send(channel: IPC_Channels, ...args: unknown[]) {
    ipcRenderer.send(channel, ...args);
  },

  //! Following Pattern 2 for the Database requests
  invoke_request: (channel: IPC_Channels, ...args: unknown[]) =>
    ipcRenderer.invoke(channel, ...args),

  //! Following Pattern 3 for header-button-actions
  // The request comes via sendMessage from the Header-Buttons
  // runs via the ipc-action-broker and then over here.
  // The Views are listening to this, for actions to perform...
  //! https://berom0227.medium.com/implementing-the-off-method-in-electron-api-a-critical-aspect-of-event-listener-management-189b5232ea2a
  // https://stackoverflow.com/questions/57418499/how-to-unregister-from-ipcrenderer-on-event-listener
  listen_to: (channel: IPC_Channels, callback: (...args: any[]) => void) => {
    // _event: Electron.IpcRendererEvent,
    const subscription = (_event: any, ...args: any[]) => callback(...args);
    ipcRenderer.on(channel, subscription);
    console.log("preload.on -> subscribe listener", channel, subscription);
    // Return a function to remove the listener
    return () => {
      console.log("preload.on -> remove listener", channel, subscription);
      ipcRenderer.removeListener(channel, subscription);
    };
  },

  off: (channel: IPC_Channels, callback: (...args: any[]) => void) => {
    console.log("preload.off -> remove listener", channel, callback);
    ipcRenderer.removeListener(channel, callback);
  },
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);

console.log("preload complete");
