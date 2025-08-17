const { contextBridge, ipcRenderer } = require('electron');
const remote = require('@electron/remote');

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
  getCurrentWindow: () => remote.getCurrentWindow(),
  dialog: remote.dialog,
  app: remote.app,
  shell: remote.shell,
  getGlobal: (name) => remote.getGlobal(name)
});

// For backwards compatibility with the app's current code
contextBridge.exposeInMainWorld('remote', remote);
