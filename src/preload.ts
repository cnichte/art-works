import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import { IPC_Channels } from "./app/common/types/IPC_Channels";

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
 * That's exactly what I'm doing here too.
 * TODO https://www.jsgarden.co/blog/how-to-handle-electron-ipc-events-with-typescript
 */
export type IPC_Api = {
  sendMessage(channel: IPC_Channels, ...args: unknown[]): void;
  on(channel: IPC_Channels, func: (...args: unknown[]) => void ): void;
  once(channel: IPC_Channels, func: (...args: unknown[]) => void): void; 
}

export type ContextBridgeApi = {
  ipc: IPC_Api;
  node(): void;
  chrome(): void;
  electron(): void;
  ping(): void;
}

export const context_bridge_api: ContextBridgeApi = {
  // Send from frontend (render-process) to backend (main-process)
  ipc: {
    sendMessage(channel: IPC_Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: IPC_Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: IPC_Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  } ,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // we can also expose variables, not just functions
};

// The renderer process can access it like so: window.app_api.ipc.sendMessage(...)
contextBridge.exposeInMainWorld("app_api", context_bridge_api);