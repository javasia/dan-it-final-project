import React, {Component} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import {usersOperations} from 'store/users'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  wrapper: {
    height: '100vh',
    width: '100vw'
  },
  socialWrapper: {
    width: '100%',
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-around'
  },
  googleButton: {
    width: '45%'
  }

})

class Login extends Component {
  render () {
    const {classes, currentUser} = this.props

    if (currentUser) {
      return <Redirect to={'/admin'}/>
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in with
          </Typography>
          <div className={classes.socialWrapper}>
            <Button
              onClick={() => this.props.loginWithOAuth('google')}
              variant="contained"
              color="primary"
              className={classes.googleButton}
            >
              Google
            </Button>
            <Button
              onClick={() => this.props.loginWithOAuth('facebook')}
              variant="contained"
              color="primary"
              className={classes.googleButton}
            >
              Facebook
            </Button>
          </div>

          <Typography component="h1" variant="h5">
            Or
          </Typography>

          <form className={classes.form} onSubmit={this.props.submitLoginForm}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="username"
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox name="remember-me" value="on" color="primary"/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Button
              component={NavLink}
              to={'/admin/forgot-password'}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Forgot Password
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  submitLoginForm: PropTypes.func.isRequired,
  loginWithOAuth: PropTypes.func.isRequired,
}

const mapStateToProps = ({users}) => ({
  currentUser: users.currentUser,
  isCurrentUserLoading: users.isCurrentUserLoading
})

const mapDispatchToProps = dispatch => ({
  submitLoginForm: event => dispatch(usersOperations.submitLoginForm(event)),
  loginWithOAuth: event => dispatch(usersOperations.loginWithOAuth(event))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))

