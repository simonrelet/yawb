import defaultState from './defaultState';

describe('defaultState', () => {
  it('should have a state', () => {
    expect(defaultState).toMatchSnapshot();
  });
});
