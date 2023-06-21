module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  trailingComma: 'none',
  overrides: [
    {
      files: 'options.ts',
      options: {
        printWidth: 1000,
        bracketSpacing: false
      }
    }
  ]
}
