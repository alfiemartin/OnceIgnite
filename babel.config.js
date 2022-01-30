module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
