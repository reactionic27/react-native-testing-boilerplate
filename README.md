# React Native Unit testing boilerplate project

## Setup

1. Follow the instructions on the "React Native CLI Quickstart" tab of
   the [React Native setup instructions](https://reactnative.dev/docs/environment-setup). These
   instructions fan out by host operating system (macOS, Windows,
   Linux) and target operating system (iOS, Android). Follow
   whichever is appropriate.

2. Install the Javascript dependencies

   ```
   yarn install
   ```

3. Install iOS dependencies (iOS only)
   ```
   cd ios
   pod install
   ```

## Running

### iOS Simulator

`yarn run ios`

This will start a simulator for you.

## Testing

- Unit testing:
  yarn test

- E2E testing
  detox build --configuration ios.sim.release
  detox test --configuration ios.sim.release

## Questions:

### How are you ensuring data consistency in your flatlist (e.g. not show duplicates) when dealing with paginated content?

I implemented this logic in here: https://github.com/reactionic127/obe-test/blob/master/src/redux/slices/CharacterSlice.ts#L63

### How would you ensure this flatlist remains fast with many objects to be displayed?

1. We need to use useMemo and React.memo to optimize the performance
2. Use react-native-fast-image for cache images
3. Use keyExtractor or key
4. Avoid anonymous function on renderItem

https://reactnative.dev/docs/optimizing-flatlist-configuration
