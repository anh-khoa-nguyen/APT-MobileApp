module.exports = function (api) {
  api.cache(true); // hoặc false cũng được, nhưng nên là true

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
