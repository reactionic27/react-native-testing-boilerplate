import {device, expect} from 'detox';

describe('CharacterApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have character list screen', async () => {
    await expect(element(by.id('character-list-container'))).toBeVisible();
  });
});
