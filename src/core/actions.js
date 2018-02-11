export const APP_UPDATE = 'APP_UPDATE';
export const newVersionAvailable = () => ({ type: APP_UPDATE });

export const CHANGE_THEME = 'CHANGE_THEME';
export const changeTheme = theme => ({
  type: CHANGE_THEME,
  theme,
});
