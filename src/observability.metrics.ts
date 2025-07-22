import si from 'systeminformation';

export interface Metrics {
  timestamp: string;
  cpu: number;
  avg: number;
  cores: number;
  memory: {
    total: number;
    free: number;
    used: number;
  };
  uptime: number;
  overload: boolean;
  connections: {
    pid: number;
    protocol: string;
    localAddress: string;
    localPort: string;
    state: string;
  }[];
}

export async function metrics(): Promise<Metrics> {
  const [cpu, mem, time, cpuInfo, networkConnections] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.time(),
    si.cpu(),
    si.networkConnections(),
  ]);

  const connections = networkConnections.filter(
    (conn) => conn.state === 'ESTABLISHED' && Number(conn.localPort ?? '0') === 443
  );

  return {
    timestamp: new Date().toISOString(),
    cpu: cpu.currentLoad,
    avg: cpu.avgLoad,
    cores: cpuInfo.cores,
    memory: {
      total: mem.total,
      free: mem.free,
      used: mem.used,
    },
    uptime: time.uptime,
    overload: cpu.avgLoad > cpuInfo.cores,
    connections: connections.map((conn) => ({
      pid: conn.pid,
      protocol: conn.protocol,
      localAddress: conn.localAddress,
      localPort: conn.localPort,
      state: conn.state,
    })),
  };
}
