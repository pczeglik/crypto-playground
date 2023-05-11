/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  preset: "ts-jest/presets/default-esm",
};
