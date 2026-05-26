import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			provider: "v8",
			include: ["src/**"],
			exclude: ["src/**/*.d.ts", "src/index.js"],
			reporter: ["text-summary", "json-summary"],
			thresholds: {
				lines: 91,
				statements: 87,
				branches: 84,
				functions: 86,
			},
		},
	},
});
