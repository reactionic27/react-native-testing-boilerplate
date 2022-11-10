module.exports = {
  preset: 'react-native',
  resetMocks: true,
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['./jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
  ],
};
