
# 📦 @jcamarcelino/observability-lib

Uma biblioteca leve e extensível para monitoramento de aplicações Node.js, com coleta de métricas de CPU, memória, uptime e conexões de rede. Ideal para implementar heartbeats e observabilidade em serviços backend.


## 🚀 Instalação

```bash
 npm install @jcamarcelino/observability-lib 
```
    
## API

```javascript
new Heartbeat(intervalMs?: number, logger?: Logger)
```

* intervalMs: intervalo entre batidas (default: 60000)
* logger: objeto com métodos info() e error() (default: console)

Métodos:
* start_system_metrics(): inicia o heartbeat para coleta de dados do systema
* stop_system_metrics(): interrompe o heartbeat para coleta de dados do systema
* start_process_metrics(): inicia o heartbeat para coleta de dados do processo
* stop_process_metrics(): interrompe o heartbeat para coleta de dados do processo
## 📘 Uso Básico

```javascript
import { Heartbeat } from "@jcamarcelino/observability-lib";

const heartbeat = new Heartbeat(10000); // intervalo de 10 segundos

// Inicia coleta de métricas do sistema operacional
heartbeat.start_system_metrics();

// Inicia coleta de métricas do processo Node.js
heartbeat.start_process_metrics();

// Para a coleta de dados do sistema
setTimeout(() => {
  heartbeat.stop_system_metrics();
}, 60000); // para após 1 minuto

// Para a coleta de dados do processo
setTimeout(() => {
  heartbeat.stop_process_metrics();
}, 60000); // para após 1 minuto
```
## 📊 Métricas coletadas

start_system_metrics()

* Uso da CPU (total e por núcleo)
* Carga média
* Total de núcleos
* Memória total, livre e usada
* Uptime do sistema
* Indicador de sobrecarga (avgLoad > cores)

start_process_metrics()

* Uso de memória do processo (heap, RSS, buffers)
* Tempo de CPU em modo usuário e sistema
* Uptime do processo
## 🛠️ Uso com logger personalizado

```javascript
import winston from "winston";
import { Heartbeat } from "@jcamarcelino/observability-lib";

// Criação do logger com Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Você pode adicionar outros transports como arquivos, HTTP, etc.
  ],
});

// Instância do Heartbeat com logger Winston
const heartbeat = new Heartbeat(10000, logger);

heartbeat.start_system_metrics();
heartbeat.start_process_metrics();

setTimeout(() => {
  heartbeat.stop_system_metrics();
}, 60000); // para após 1 minuto

setTimeout(() => {
  heartbeat.stop_process_metrics();
}, 60000); // para após 1 minuto

```
## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
## 📄 Licença

MIT © Julio Cesar de Almeida Marcelino