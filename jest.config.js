const { defaults } = require("jest-config");

module.exports = {
  bail: true,
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "ts",
    "tsx",
    "js",
    "jsx",
  ],
  roots: ["."],
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  verbose: true,
  moduleDirectories: ["node_modules", "src"],
};
