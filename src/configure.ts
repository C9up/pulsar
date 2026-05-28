interface Codemods {
	addProvider(importPath: string): Promise<void>;
	addEnvVars(vars: Record<string, string>): Promise<void>;
	writeFile(
		filePath: string,
		content: string,
		options?: { force?: boolean },
	): Promise<void>;
}

export async function configure(codemods: Codemods): Promise<void> {
	await codemods.addProvider("@c9up/pulsar/provider");
	await codemods.writeFile(
		"config/pulsar.ts",
		`import { defineConfig } from '@c9up/pulsar/config'

export default defineConfig({
  store: 'memory',
  retries: 3,
})
`,
	);
}
