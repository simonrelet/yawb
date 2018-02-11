import defaultState from './defaultState';

// Uncomment if needed
// const parse = (serializedJSON, defaultValue) => {
//   if (serializedJSON) {
//     try {
//       return JSON.parse(serializedJSON);
//     } catch (e) {
//       console.error('Could not parse stored item:', serializedJSON, e);
//     }
//   }
//   return defaultValue;
// };

// Loading and saving functions for each item that is stored.
const storedItems = {
  theme: {
    load: () => localStorage.getItem('theme') || defaultState.theme,
    save: state => localStorage.setItem('theme', state.theme),
  },
};

export default {
  load() {
    return Object.keys(storedItems).reduce(
      (acc, key) => ({ ...acc, [key]: storedItems[key].load() }),
      defaultState,
    );
  },

  save(state) {
    localStorage.setItem('version', global.APP_VERSION);

    Object.keys(storedItems).forEach(key => {
      storedItems[key].save(state);
    });
  },
};
