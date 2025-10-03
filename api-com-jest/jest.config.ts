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
  // Cobertura de código (opcional, mas recomendado)
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/data/**/*.ts",
    "!src/types/**/*.ts",
    "!src/errors/**/*.ts",
  ],

  // =============== AQUI ESTÁ O AJUSTE CRUCIAL ===============
  // Isso instrui o ts-jest a usar um transpilador que não confunde o Babel/Jest
  // com as sintaxes do TypeScript como as "Type Assertions" (`as Type`).
  globals: {
    "ts-jest": {
      // Use 'ts-es' para melhor compatibilidade com a sintaxe TS e ES Modules
      tsconfig: "tsconfig.json", // Assumindo que você tem este arquivo
    },
  },
  // =========================================================
};
