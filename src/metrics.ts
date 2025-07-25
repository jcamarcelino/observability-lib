import si from "systeminformation";

export interface Metrics {
  timestamp: string;
  cpu?: number;
  avg?: number;
  cores?: number;
  memory: {
    total: number;
    free: number;
    used: number;
  };
  uptime: number;
  overload?: boolean;
  connections?: {
    pid: number;
    protocol: string;
    localAddress: string;
    localPort: string;
    state: string;
  }[];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function metrics(options?: {
  includeConnections?: boolean;
  includeCpuLoad?: boolean;
}): Promise<Metrics> {
  const includeConnections = options?.includeConnections ?? false;
  const includeCpuLoad = options?.includeCpuLoad ?? false;

  let cpu, avg, cores, overload;

  if (includeCpuLoad) {
    const cpuLoad = await si.currentLoad();
    await delay(50);
    const cpuInfo = await si.cpu();
    await delay(50);
    cpu = cpuLoad.currentLoad;
    avg = cpuLoad.avgLoad;
    cores = cpuInfo.cores;
    overload = avg > cores;
  }

  const mem = await si.mem();
  await delay(50);
  const time = await si.time();
  await delay(50);

  let connections: Metrics["connections"] | undefined = undefined;

  if (includeConnections) {
    try {
      const networkConnections = await si.networkConnections();
      await delay(50);
      connections = networkConnections
        .filter(
          (conn) =>
            conn.state === "ESTABLISHED" &&
            Number(conn.localPort ?? "0") === 443
        )
        .slice(0, 50)
        .map((conn) => ({
          pid: conn.pid,
          protocol: conn.protocol,
          localAddress: conn.localAddress,
          localPort: conn.localPort,
          state: conn.state,
        }));
    } catch (error) {
      console.error("Erro ao coletar conexões de rede:", error);
    }
  }

  return {
    timestamp: new Date().toISOString(),
    cpu,
    avg,
    cores,
    memory: {
      total: mem.total,
      free: mem.free,
      used: mem.used,
    },
    uptime: time.uptime,
    overload,
    connections,
  };
}
