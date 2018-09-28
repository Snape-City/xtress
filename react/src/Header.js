import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Headers(props) {
  const { classes } = props;
  const logo = 'https://bit.ly/2DCMQGc'
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <img src={logo} height='80' />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Welcome to Extress
          </Typography>
          <Button color="inherit">Team</Button>
          <Button color='inherit'>Demo</Button>
          <Button color='inherit'>Github</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Headers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Headers);