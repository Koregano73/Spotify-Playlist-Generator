module.exports = {
    preset: '@shelf/jest-mongodb',
    watchPathIgnorePatterns: ['globalConfig'],
  },
  {
    preset: "jest-puppeteer",
    testRegex: "./*\\e2e\\.test\\.js$",
  };