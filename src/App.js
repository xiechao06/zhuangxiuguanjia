import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import 'typeface-roboto'
import LoginRequiredRoute from './components/LoginRequiredRoute'
import Main from './Main'
import { account, loadAccount } from './store'
import { blue, pink } from '@material-ui/core/colors'

if (process.env.NODE_ENV === 'development') {
  window.localStorage.debug = '装修管家:*'
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    contrastTheshhold: 3
  }
})

class App extends Component {
  componentWillMount () {
    account.val(loadAccount())
  }

  render () {
    return <div className='App'>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <LoginRequiredRoute path='/' component={Main} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  }
  // render () {
  //   return (
  //     <div className='App'>
  //       <header className='App-header'>
  //         <img src={logo} className='App-logo' alt='logo' />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className='App-link'
  //           href='https://reactjs.org'
  //           target='_blank'
  //           rel='noopener noreferrer'
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   )
  // }
}

export default App
