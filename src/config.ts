export interface PulsarConfig {
	store?: string;
	retries?: number;
}

export function defineConfig(config: PulsarConfig): PulsarConfig {
	return config;
}
