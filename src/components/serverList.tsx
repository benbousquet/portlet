import { Server } from "@/interfaces";
import { parseServerListText } from "@/utils";
import { useEffect, useState } from "react";

export default function ServerList() {
  const [servers, setServers] = useState<Server[]>([]);
  useEffect(() => {
    // TODO move this into a context
    async function fetchData() {
      const serverListText = await window.electronAPI.getServerListText();
      setServers(parseServerListText(serverListText));
    }
    fetchData();
  }, []);

  return (
    <div className="border shadow-sm m-5">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Hostname</th>
              <th>IP</th>
              <th>Ping</th>
              <th>Speed</th>
              <th>CountryLong</th>
              <th>VPN Sessions</th>
              <th>Uptime</th>
              <th>Total Users</th>
              <th>Total Traffic</th>
              <th>Operator</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => {
              return (
                <tr key={server.hostName}>
                  <td>{server.hostName}</td>
                  <td>{server.ip}</td>
                  <td>{server.ping}</td>
                  <td>{server.speed}</td>
                  <td>{server.countryLong}</td>
                  <td>{server.numVpnSessions}</td>
                  <td>{server.uptime}</td>
                  <td>{server.totalUsers}</td>
                  <td>{server.totalTraffic}</td>
                  <td>{server.operator}</td>
                  <td>{server.message}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        window.electronAPI.connectToOpenVPNServer(
                          server.openVPNConfigDataBase64
                        );
                      }}
                    >
                      Connect
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
