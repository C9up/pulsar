/**
 * @c9up/pulsar — TypeScript barrel.
 *
 * The runtime `index.js` at the package root loads the native NAPI binding
 * (`index.<platform>.node`) and re-exports the Rust-backed classes. This
 * file provides the TypeScript surface: types, interfaces, and the pure-TS
 * classes (`Emitter`, `BaseEvent`) that live in `src/`.
 *
 * Consumers that only need types pay zero runtime cost (`import type`).
 * Consumers that need runtime classes (`Emitter`, `PulsarProvider`) import
 * directly from here; the native bindings are still available via the
 * `index.js` root path when needed.
 */

export type { PulsarConfig } from "./config.js";
export { defineConfig } from "./config.js";
export {
	BaseEvent,
	type ContainerResolver,
	Emitter,
	type ListenerClass,
} from "./Emitter.js";
export { default as PulsarProvider } from "./PulsarProvider.js";
