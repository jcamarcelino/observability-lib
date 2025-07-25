import { metrics } from "./metrics.js";

export interface Logger {
  info(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
}

export class Heartbeat {
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private beatIntervalMs: number = 60000,
    private logger: Logger = console,
    private includeConnections: boolean = false,
    private includeCpuLoad: boolean = false
  ) {}

  async start() {
    const runHeartbeat = async () => {
      try {
        const heartbeat = await metrics({
          includeConnections: this.includeConnections,
          includeCpuLoad: this.includeCpuLoad,
        });
        this.logger.info("Heartbeat metrics", heartbeat);
      } catch (error: any) {
        this.logger.error("Erro ao coletar métricas", error);
      }

      this.interval = setTimeout(runHeartbeat, this.beatIntervalMs);
    };

    await runHeartbeat();
  }

  stop() {
    if (this.interval) {
      clearTimeout(this.interval);
      this.interval = null;
    }
  }
}
