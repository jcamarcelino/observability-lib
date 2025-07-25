import { system_metrics, process_metrics } from "./index.js";

export interface Logger {
  info(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
}

export class Heartbeat {
  private systemInterval: NodeJS.Timeout | null = null;
  private processInterval: NodeJS.Timeout | null = null;

  constructor(
    private beatIntervalMs: number = 60000,
    private logger: Logger = console
  ) {}

  async start_system_metrics() {
    const _heartbeat = async () => {
      try {
        const heartbeat = await system_metrics();
        this.logger.info("Heartbeat system metrics", heartbeat);
      } catch (error: any) {
        this.logger.error("Erro ao coletar métricas do sistema", error);
      }

      this.systemInterval = setTimeout(_heartbeat, this.beatIntervalMs);
    };

    await _heartbeat();
  }

  async start_process_metrics() {
    const _heartbeat = async () => {
      try {
        const heartbeat = process_metrics();
        this.logger.info("Heartbeat process metrics", heartbeat);
      } catch (error: any) {
        this.logger.error("Erro ao coletar métricas do processo", error);
      }

      this.processInterval = setTimeout(_heartbeat, this.beatIntervalMs);
    };

    await _heartbeat();
  }

  stop_system_metrics() {
    if (this.systemInterval) {
      clearTimeout(this.systemInterval);
      this.systemInterval = null;
    }
  }

  stop_process_metrics() {
    if (this.processInterval) {
      clearTimeout(this.processInterval);
      this.processInterval = null;
    }
  }
}
