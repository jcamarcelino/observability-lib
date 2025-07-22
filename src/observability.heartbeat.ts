import { metrics } from "./observability.index.js";

export interface Logger {
  info(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
}

export class Heartbeat {
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private beatIntervalMs: number = 60000,
    private logger: Logger = console
  ) {}

  async start() {
    try {
      const heartbeat = await metrics();
      this.logger.info("Heartbeat metrics", heartbeat);
    } catch (error: any) {
      this.logger.error("Erro ao coletar métricas iniciais", error);
    }

    this.interval = setInterval(async () => {
      try {
        const heartbeat = await metrics();
        this.logger.info("Heartbeat metrics", heartbeat);
      } catch (error: any) {
        this.logger.error("Erro ao coletar métricas no intervalo", error);
      }
    }, this.beatIntervalMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
