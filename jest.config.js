/**@type {import("jest").Config} */

const config = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/__mocks__/react-router-dom.tsx",
  },
};

export default config;
