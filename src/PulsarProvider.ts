import { PulsarBus } from "../index.js";
import { BaseEvent, Emitter } from "./Emitter.js";
import { _setEmitter } from "./services/main.js";

/**
 * Duck-typed host context — pulsar stays publishable without
 * importing `@c9up/ream`. Any framework that exposes a Container
 * satisfies the contract.
 *
 * `make()` is the listener-class resolver Emitter needs (it's the
 * shape exported by `@c9up/ream`'s container). When the host doesn't
 * expose it, listener CLASSES can't be instantiated — only inline
 * function listeners work. The provider passes the container through
 * to Emitter; the optional `make` field on PulsarContainer mirrors
 * Emitter's `ContainerResolver` interface so the assignment type-
 * checks without a load-bearing cast.
 */
interface PulsarContainer {
	singleton(token: unknown, factory: () => unknown): void;
	resolve<T = unknown>(token: unknown): T;
	make?<T>(target: new (...args: never[]) => T): T;
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
			// Forward `make` only when the host actually exposes it.
			// Emitter falls back to direct `new Listener()` instantiation
			// otherwise, which keeps zero-arg listener classes working
			// without a full IoC container.
			const resolver =
				typeof this.app.container.make === "function"
					? { make: this.app.container.make.bind(this.app.container) }
					: undefined;
			return new Emitter(bus, resolver);
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
