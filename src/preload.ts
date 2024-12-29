// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron"

const WINDOW_API = {
  getServerListText: () => ipcRenderer.invoke("get-server-list-text"),
  connectToOpenVPNServer: (openVPNConfigData: string) => ipcRenderer.send("connect-to-openvpn-server", openVPNConfigData)
}

contextBridge.exposeInMainWorld('electronAPI', WINDOW_API)