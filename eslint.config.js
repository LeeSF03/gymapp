// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config")
const expoConfig = require("eslint-config-expo/flat")
const eslintConfigPrettier = require("eslint-config-prettier/flat")
const reactCompiler = require("eslint-plugin-react-compiler")

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  reactCompiler.configs.recommended,
  {
    ignores: ["dist/*"],
  },
])
