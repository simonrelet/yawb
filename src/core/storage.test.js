import storage from './storage';
import defaultState from './defaultState';

const resetStorage = () => {
  global.localStorage.getItem.mockReset();
  global.localStorage.setItem.mockReset();
  global.localStorage.removeItem.mockReset();
  global.localStorage.clear.mockReset();
};

const createState = (state = {}) => ({
  ...defaultState,
  ...state,
});

const createGetItemImplementation = (expectedKey, value) => key =>
  expectedKey === key ? value : null;

describe('storage', () => {
  beforeEach(() => resetStorage());
  afterEach(() => resetStorage());

  it('should return the default state when the storage is empty', () => {
    expect(storage.load()).toEqual(defaultState);
  });

  it('should save the version of the app', () => {
    storage.save(createState());
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'version',
      process.env.REACT_APP_VERSION,
    );
  });

  describe('theme', () => {
    const theme = 'awesome-theme';

    it('should load the existing value', () => {
      global.localStorage.getItem.mockImplementation(
        createGetItemImplementation('theme', theme),
      );
      expect(storage.load().theme).toEqual(theme);
    });

    it('should save the value', () => {
      storage.save(createState({ theme }));
      expect(global.localStorage.setItem).toHaveBeenCalledWith('theme', theme);
    });
  });
});
