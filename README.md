
# 📦 @jcamarcelino/observability-lib

Uma biblioteca leve e extensível para monitoramento de aplicações Node.js, com coleta de métricas de CPU, memória, uptime e conexões de rede. Ideal para implementar heartbeats e observabilidade em serviços backend.


## 🚀 Instalação

Install my-project with npm

```bash
 npm install @jcamarcelino/observability-lib 
```
    
## API

```javascript
new Heartbeat(intervalMs?: number, logger?: Logger, includeConnections?: boolean, includeCpuLoad?: boolean)
```

* intervalMs: intervalo entre batidas (default: 60000)
* logger: objeto com métodos info() e error() (default: console)

Métodos:
* start(): inicia o heartbeat
* stop(): interrompe o heartbeat
* metrics(includeConnections?: boolean): Promise<Metrics>

Coleta métricas do sistema.
* includeConnections: se true, inclui conexões de rede (default: false)

## 📘 Uso básico

```javascript
import { Heartbeat } from "@jcamarcelino/observability-lib";

// Configuração personalizada
const heartbeat = new Heartbeat(
  60000, // intervalo de 30 segundos (default: 60000)
  console, // logger padrão (default: console)
  true,    // incluir conexões (default: false)
  true     // incluir carga de CPU (default: false)
);

heartbeat.start();


------------------------------------
Exemplo de saída:
{
  "timestamp": "2025-07-25T15:00:00.000Z",
  "cpu": 12.5,
  "avg": 1.2,
  "cores": 8,
  "memory": {
    "total": 16777216,
    "free": 10485760,
    "used": 6291456
  },
  "uptime": 3600,
  "overload": false,
  "connections": [
    {
      "pid": 1234,
      "protocol": "tcp",
      "localAddress": "192.168.0.1",
      "localPort": "443",
      "state": "ESTABLISHED"
    }
  ]
}
```


## 🛠️ Uso com logger personalizado

```javascript
const customLogger = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data),
  error: (msg, err) => console.error(`[ERROR] ${msg}`, err),
};

const heartbeat = new Heartbeat(10000, customLogger);
heartbeat.start();
```
## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
## 📄 Licença

MIT © Julio Cesar de Almeida Marcelino