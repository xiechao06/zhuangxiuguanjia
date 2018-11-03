import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import { CssBaseline } from '@material-ui/core'
import 'typeface-roboto'
if (process.env.NODE_ENV === 'development') {
  window.localStorage.debug = '装修管家:*'
}

class App extends Component {
  render () {
    return <div className='App'>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
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
