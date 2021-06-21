import React, { useEffect, Fragment }from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import { BrowserRouter as Router, Route } from "react-router-dom";

import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Dashboard from './Dashboard'
import NavBar from "./NavBar";

import LoadingBar from 'react-redux-loading'

function App(props){
  
  useEffect(() => {
    props.dispatch(handleInitialData())
  });

  return(
    <Router>
      <Fragment>
        <LoadingBar/>
        <div className='container'>
          <NavBar/>
          {props.loading === true
            ? null
            : <div>
                <Route path='/' exact component={Dashboard}/>
                <Route path='/tweet/:id' exact component={TweetPage}/>
                <Route path='/new' exact component={NewTweet}/>
              </div>
          }
        </div>
      </Fragment>
    </Router>
  )
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App) 
