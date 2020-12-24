# react-router-dom

## useHistory
```js
import { useHistory } from "react-router-dom"

const Homepage = () => {
  let history = useHistory()

  function goBack(){
    history.goBack()
  }

  function goHome(){
    history.push('/')
  } 

  return(
    <div>
      <button onClick={goBack}>Previous</button>
      <button onClick={goHome}>Home</button>
    </div>
 )
}

export default Homepage
```
 - length - (number) The number of entries in the history stack
 - action - (string) The current action (PUSH, REPLACE, or POP)
 - location - (object) The current location. May have the following properties:
   - pathname - (string) The path of the URL
   - search - (string) The URL query string
   - hash - (string) The URL hash fragment
   - state - (object) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
 - push(path, [state]) - (function) Pushes a new entry onto the history stack
 - replace(path, [state]) - (function) Replaces the current entry on the history stack
 - go(n) - (function) Moves the pointer in the history stack by n entries
 - goBack() - (function) Equivalent to go(-1)
 - goForward() - (function) Equivalent to go(1)
 - block(prompt) - (function) Prevents navigation
<hr/>

## useParams
```js
import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom"

const Post = (props) => {
  let { id } = useParams()
  return <div>Now showing post {id}</div>
}

const App = () =>{
  return(
   <div className='app'>
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/blog/:id" component={Post} />
      </Switch>
    </Router>
   </div>
 );
```
<hr/>

## useLocation
```js
import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom"

const LearnMore = () => {
  const location = useLocation()
  return(
    <div>
      You are currently at the following path {location.pathname}
    </div>
  )
 }

const App = () => {
 return(
  <div className='app'>
    <Router>
     <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/learn-more'>Learn More</Link></li>
     </ul>
     <Switch>
       <Route exact path='/' component={HomePage} />
       <Route path='/learn-more' component={LearnMore} />
     </Switch>
    </Router>
  </div>
 )
}
```
<hr/>

## useRouteMatch
```js
const App = () => {
  return (
    <div>
      <Route
        path="/BLOG/:slug/"
        strict
        sensitive
        render={({ match }) => {
          return match ? <BlogPost match={match} /> : <NotFound />
        }}
      />
    </div>
  )
}

/*-----------------------------------------------------------------------------*/

import { useRouteMatch } from 'react-router'

const App = () => {
  const match = useRouteMatch({
    path: '/BLOG/:slug/',
    strict: true,
    sensitive: true
  })
  return <div>{match ? <BlogPost match={match} /> : <NotFound />}</div>
}
```
- path
- strict
- sensitive
- exact
<hr/>