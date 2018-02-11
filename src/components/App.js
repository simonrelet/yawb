import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { I18n } from 'react-i18next';

const styles = theme => ({
  '@global': {
    '*': {
      boxSizing: 'inherit',
      '&::after,&::before': {
        boxSizing: 'inherit',
      },
    },
    html: {
      boxSizing: 'border-box',
    },
  },
  root: {},
  header: {},
  title: {},
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <I18n>
        {translate => (
          <div className={classes.root}>
            <header className={classes.header}>
              <h1 className={classes.title}>{translate('title')}</h1>
            </header>
          </div>
        )}
      </I18n>
    );
  }
}

export default injectSheet(styles)(App);
