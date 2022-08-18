// jest.config.js


// we MAY need this file, we arent sure yet.

// module.exports = {  
//     transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
//     transform: {
//       '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
//     },
//     // ...the rest of your config
//   }

module.exports = {
    preset: '@shelf/jest-mongodb',
    watchPathIgnorePatterns: ['globalConfig'],
  },
  {
    preset: "jest-puppeteer",
    testRegex: "./*\\e2e\\.test\\.js$",
  };


  // https://dev.to/steveruizok/jest-and-esm-cannot-use-import-statement-outside-a-module-4mmj