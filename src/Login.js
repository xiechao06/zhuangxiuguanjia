import React, { Component } from 'react'
import { Grid, Paper, withStyles, TextField, Typography, Button, LinearProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import logo from './assets/logo.png'
import debug_ from 'debug'
import { validateObj, checkers, ValidationError } from 'async-validate-obj'
import emailRegex from 'email-regex'
import request from 'graphql-request'
import update from 'immutability-helper'
import * as R from 'ramda'
import * as store from './store'
import { Redirect } from 'react-router-dom'

const debug = debug_('装修管家:login')

const queries = {
  checkEmailExists: `
  query DoesEmailExist($email: String!) {
    doesEmailExist(email: $email)
  }
  `,
  loginAsCompany: `
  query LoginAsCompany($email: String!, $password: String!) {
    loginAsCompany(email: $email, password: $password) {
      account {
        id
        email
        firstName
        lastName
        nickname
        token
        currentRole {
          id
          name
        }
        roles {
          id
          name
        }
        principal
        company {
          id
          name
        }
      }
      error {
        code
        message
      }
    }
  } 
  `
}
class Login extends Component {
  static props = {
    classes: PropTypes.object.isRequired
  }

  state = {
    email: '',
    password: '',
    errors: {},
    loading: false,
    step: 0,
    redirectToReferrer: false
  }

  render () {
    let { classes } = this.props
    let { from } = this.props.location.state || { from: { pathname: '/' } }
    let { email, errors, loading, step, password, redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />
    return <Grid container alignItems='center' justify='center' className={classes.container}>
      <Grid item xs={8} md={4}>
        <Paper className={classes.paper}>
          <img src={logo} className={classes.logo} alt='装修管家logo' />
          {
            step === 0
              ? <React.Fragment>
                <Typography variant='headline' gutterBottom>欢迎登陆</Typography>
                <Typography variant='subheading' gutterBottom>家装管家</Typography>
                <form onSubmit={this.checkEmail}>
                  <TextField
                    margin='normal'
                    label='请输入邮箱'
                    autoFocus
                    fullWidth
                    autoComplete='off'
                    value={email}
                    onChange={this.changeEmail}
                    error={!!errors.email}
                    helperText={errors.email}
                    className={classes.textField} />
                  <Grid container justify='flex-end'>
                    <Button variant='contained' color='primary' type='submit'>下一步</Button>
                  </Grid>
                </form>
              </React.Fragment>
              : <React.Fragment>
                <Typography variant='headline' gutterBottom>欢迎</Typography>
                <Button variant='outlined' className={classes.emailButton}>{ email }</Button>
                <form onSubmit={this.login}>
                  <TextField
                    margin='normal'
                    label='请输入密码'
                    inputProps={{
                      type: 'password'
                    }}
                    autoFocus
                    fullWidth
                    autoComplete='off'
                    value={password}
                    onChange={this.changePassword}
                    error={!!errors.password}
                    helperText={errors.password}
                    className={classes.textField} />
                  <Grid container justify='flex-end'>
                    <Button variant='contained' color='primary' type='submit'>登录</Button>
                  </Grid>
                </form>
              </React.Fragment>
          }
          { loading && <LinearProgress className={classes.progress} /> }
        </Paper>
      </Grid>
    </Grid>
  }

  changeEmail = ({ target: { value } }) => {
    this.setState({ email: value })
  }

  changePassword = ({ target: { value } }) => {
    this.setState({ password: value })
  }

  checkEmail = async e => {
    e.preventDefault()
    this.setState({ errors: {} })
    debug('检查邮箱' + this.state.email)
    try {
      await validateObj({
        email: [checkers.match(emailRegex(), '请提供合法的邮箱')]
      }, this.state)
    } catch (error) {
      if (error instanceof ValidationError) {
        this.setState({ errors: error.errors })
        return
      }
      throw e
    }
    this.setState({ loading: true })
    try {
      let { doesEmailExist } = await request(
        process.env.REACT_APP_BACKEND, queries.checkEmailExists, {
          email: this.state.email
        }
      )
      if (!doesEmailExist) {
        this.setState(state => update(state, {
          errors: {
            email: {
              $set: '邮箱不存在'
            }
          }
        }))
        return
      }
      this.setState({ step: 1 })
    } finally {
      this.setState({ loading: false })
    }
    return false
  }

  login = async e => {
    e.preventDefault()
    try {
      await validateObj({
        password: checkers.required('请输入密码')
      }, this.state)
    } catch (error) {
      if (error instanceof ValidationError) {
        this.setState(state => update(state, {
          errors: {
            $merge: error.errors
          }
        }))
        return
      }
      throw e
    }
    this.setState({ loading: true })
    let { loginAsCompany: { account, error } } = await request(
      process.env.REACT_APP_BACKEND,
      queries.loginAsCompany,
      R.pick(['email', 'password'], this.state))
    if (error) {
      this.setState({
        errors: {
          password: error.message
        }
      })
    } else {
      debug('login success')
      store.saveAccount(account)
      store.account.val(account)
      this.setState({ redirectToReferrer: true })
    }
    return false
  }
}

export default withStyles(theme => ({
  container: {
    minHeight: '100vh'
  },
  paper: {
    padding: 2 * theme.spacing.unit,
    position: 'relative',
    minHeight: '32em'
  },
  logo: {
    width: '30%'
  },
  textField: {
    marginTop: 4 * theme.spacing.unit,
    marginBottom: 15 * theme.spacing.unit
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    width: '100%',
    left: 0
  },
  emailButton: {
    borderColor: theme.palette.primary.light
  }
}))(Login)
