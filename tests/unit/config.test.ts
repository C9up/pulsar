/**
 * Unit suite for defineConfig + configure() — the consumer-facing entry
 * points for wiring Pulsar via the ream provider system.
 */
import { describe, expect, it, vi } from "vitest";
import { defineConfig } from "../../src/config.js";
import { configure } from "../../src/configure.js";

describe("pulsar > defineConfig", () => {
	it("returns the config object unchanged (identity helper)", () => {
		const cfg = { store: "memory", retries: 3 };
		expect(defineConfig(cfg)).toBe(cfg);
	});
});

describe("pulsar > configure", () => {
	it("registers the provider import and scaffolds config/pulsar.ts", async () => {
		const addProvider = vi.fn(async () => {});
		const writeFile = vi.fn(async () => {});
		await configure({
			addProvider,
			addEnvVars: vi.fn(),
			writeFile,
		});
		expect(addProvider).toHaveBeenCalledWith("@c9up/pulsar/provider");
		expect(writeFile).toHaveBeenCalledTimes(1);
		const [path, content] = writeFile.mock.calls[0];
		expect(path).toBe("config/pulsar.ts");
		expect(content).toContain("defineConfig({");
		expect(content).toContain("store: 'memory'");
		expect(content).toContain("retries: 3");
	});
});
