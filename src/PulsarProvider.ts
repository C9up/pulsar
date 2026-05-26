import { PulsarBus } from "../index.js";
import { BaseEvent, Emitter } from "./Emitter.js";
import { _setEmitter } from "./services/main.js";

/**
 * Duck-typed host context — pulsar stays publishable without
 * importing `@c9up/ream`. Any framework that exposes a Container
 * satisfies the contract.
 */
interface PulsarContainer {
	singleton(token: unknown, factory: () => unknown): void;
	resolve<T = unknown>(token: unknown): T;
}
export interface PulsarAppContext {
	container: PulsarContainer;
}

export default class PulsarProvider {
	constructor(protected app: PulsarAppContext) {}

	register() {
		this.app.container.singleton(PulsarBus, () => new PulsarBus());
		this.app.container.singleton("bus", () =>
			this.app.container.resolve<PulsarBus>(PulsarBus),
		);

		this.app.container.singleton(Emitter, () => {
			const bus = this.app.container.resolve<PulsarBus>(PulsarBus);
			return new Emitter(bus, this.app.container);
		});
		this.app.container.singleton("emitter", () =>
			this.app.container.resolve<Emitter>(Emitter),
		);
	}

	async boot() {
		const emitter = this.app.container.resolve<Emitter>(Emitter);
		BaseEvent.useEmitter(emitter);
		_setEmitter(emitter);
	}

	async shutdown() {
		BaseEvent.resetEmitter();
	}
}
