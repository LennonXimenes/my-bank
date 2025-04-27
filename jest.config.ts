import type { Config } from "jest";

const config: Config = {
	roots: ["<root>/src"],
	collectCoverageFrom: ["<root>/src/**/*.ts"],
	coverageDirectory: "coverage",
	testEnvironment: "node",
	transform: {
		".+\\.ts$": "ts-jest",
	},
};

export default config;
