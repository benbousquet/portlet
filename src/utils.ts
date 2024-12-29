import { Server } from "./interfaces";

export function parseServerListText(text: string): Server[] {
  const lines = text.replaceAll("\r", "").split("\n");
  lines.splice(0, 2);
  let servers: Server[] = [];
  lines.forEach((line) => {
    const serverAttr = line.split(",");
    if (serverAttr.length !== 15) {
      return;
    }
    // There has to be a better way than this lol
    servers.push({
      hostName: serverAttr[0],
      ip: serverAttr[1],
      score: serverAttr[2],
      ping: serverAttr[3],
      speed: serverAttr[4],
      countryLong: serverAttr[5],
      countryShort: serverAttr[6],
      numVpnSessions: serverAttr[7],
      uptime: serverAttr[8],
      totalUsers: serverAttr[9],
      totalTraffic: serverAttr[10],
      logType: serverAttr[11],
      operator: serverAttr[12],
      message: serverAttr[13],
      openVPNConfigDataBase64: serverAttr[14],
    });
  });
  return servers;
}
