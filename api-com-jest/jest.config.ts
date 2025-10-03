// jest.config.js
module.exports = {
  // O preset ts-jest faz o Jest entender arquivos TypeScript
  preset: "ts-jest",
  // O ambiente de teste
  testEnvironment: "node",
  // Padrões para encontrar seus arquivos de teste
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  // Diretório onde seus arquivos de origem estão
  roots: ["<rootDir>/src"],
  // Ignorar o diretório node_modules
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/data/**/*.ts",
    "!src/types/**/*.ts",
    "!src/errors/**/*.ts",
  ],

  globals: {
    jest: {
      tsconfig: "tsconfig.json",
    },
  },
};
