import { metrics } from "./index.js";

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
    const _heartbeat = async () => {
      try {
        const heartbeat = await metrics();
        this.logger.info("Heartbeat metrics", heartbeat);
      } catch (error: any) {
        this.logger.error("Erro ao coletar métricas", error);
      }

      this.interval = setTimeout(_heartbeat, this.beatIntervalMs);
    };

    await _heartbeat();
  }

  stop() {
    if (this.interval) {
      clearTimeout(this.interval);
      this.interval = null;
    }
  }
}
