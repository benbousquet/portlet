export interface IElectronAPI {
  getServerListText: () => Promise<string>;
  connectToOpenVPNServer: (openVPNConfigData: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

export interface Server {
  hostName: string;
  ip: string;
  score: string;
  ping: string;
  speed: string;
  countryLong: string;
  countryShort: string;
  numVpnSessions: string;
  uptime: string;
  totalUsers: string;
  totalTraffic: string;
  logType: string;
  operator: string;
  message: string;
  openVPNConfigDataBase64: string;
}
