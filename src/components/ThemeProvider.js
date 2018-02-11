import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider as Provider } from 'react-jss';
import 'normalize.css';

const mapStateToProps = state => ({
  theme: state.theme,
});

const ThemeProvider = props => {
  const { themes, theme, children } = props;
  return <Provider theme={themes[theme]}>{children}</Provider>;
};

ThemeProvider.propTypes = {
  themes: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(ThemeProvider);
