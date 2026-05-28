# @c9up/pulsar

Rust-powered event bus for Node.js. Emit, subscribe, wildcards, request/reply — with native performance.

## Usage

```typescript
import { PulsarBus } from '@c9up/pulsar'

const bus = new PulsarBus()

bus.subscribe('order.*', (eventJson) => {
  const event = JSON.parse(eventJson)
  console.log(`${event.name}: ${event.data}`)
})

await bus.emit('order.created', JSON.stringify({ orderId: '123' }))
```

## Features

- Emit/subscribe with exact and wildcard pattern matching
- Request/reply for synchronous-like queries
- Event correlation/causation ID chain tracing
- Pluggable EventStore (MemoryStore built-in)
- Each instance is independent (test isolation)
- Helix test helpers: `collect`, `fake`, `assertEmitted`, `waitForEvent`

## License

MIT
