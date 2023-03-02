import React from 'react'
import {Route} from "react-router-dom"
import Home from './Page/Home'
import Login from './Page/Login'
import Dapp from "./Page/Dapp"
import Form from "./Page/Form"
import Thup from './Page/Thup'
import Upload from "./Page/Upload"

function App() {
  return (
    <div>

<Route path="/">
<Home/>
</Route>

<Route path="/login">
  <Login/>
</Route>

<Route path="/dapp">
<Dapp/>
  
</Route>

<Route path="/form">
  <Form/>
</Route>

<Route path="/thup">
<Thup/>
  
</Route>

<Route path="/upload">

  <Upload/>
</Route>



    </div>
  )
}

export default App