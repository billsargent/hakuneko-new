const { contextBridge, ipcRenderer } = require('electron');
const { exposeInMainWorld } = require('@electron/remote/renderer');

// Expose the full remote module to the renderer
exposeInMainWorld();

// Expose specific APIs safely to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // IPC communication functions
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  // Specific APIs needed by the app
  getCurrentWindow: () => require('@electron/remote').getCurrentWindow(),
  dialog: require('@electron/remote').dialog,
  app: require('@electron/remote').app,
  shell: require('@electron/remote').shell,
  getGlobal: (name) => require('@electron/remote').getGlobal(name)
});
