export interface ProcessMetrics {
  timestamp: string;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers: number;
  };
  cpu: {
    user: number;
    system: number;
  };
  uptime: number;
}

export function process_metrics(): ProcessMetrics {
  const mem = process.memoryUsage();
  const cpu = process.cpuUsage();
  const uptime = process.uptime();

  return {
    timestamp: new Date().toISOString(),
    memory: {
      rss: mem.rss,
      heapTotal: mem.heapTotal,
      heapUsed: mem.heapUsed,
      external: mem.external,
      arrayBuffers: mem.arrayBuffers,
    },
    cpu: {
      user: cpu.user,
      system: cpu.system,
    },
    uptime,
  };
}
