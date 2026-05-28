export class PulsarBus {
  emit(name: string, data: string): Promise<string>
  subscribe(pattern: string, callback: (eventJson: string) => void): number
  unsubscribe(subscriptionId: number): Promise<void>
  onRequest(name: string, callback: (eventJson: string, reply: (response: string) => void) => void): void
  request(name: string, data: string, timeoutMs?: number): Promise<string>
  matchesWildcard(pattern: string, eventName: string): boolean
  subscriptionCount(): Promise<number>
}
