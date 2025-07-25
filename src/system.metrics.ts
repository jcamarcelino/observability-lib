import si from "systeminformation";

export interface SystemMetrics {
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
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function system_metrics(): Promise<SystemMetrics> {
  let cpu, avg, cores, overload;

  const cpuLoad = await si.currentLoad();
  await delay(50);
  const cpuInfo = await si.cpu();
  await delay(50);
  cpu = cpuLoad.currentLoad;
  avg = cpuLoad.avgLoad;
  cores = cpuInfo.cores;
  overload = avg > cores;

  const mem = await si.mem();
  await delay(50);
  const time = await si.time();
  await delay(50);

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
  };
}
