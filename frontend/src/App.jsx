import React from 'react'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Protected from "./Protected"
import Content from './layout/Content'
import Authors from './routes/Authors'
import Books from './routes/Books'
import Dashboard from './routes/Dashboard'
import ForgotPassword from './Auth/ForgotPassword'
import ResetPassword from './Auth/ResetPassword'

import Report from './routes/Report'
import {Link,Route,Routes} from "react-router-dom"
function App() {
  return (
    <div>
      <div>
        <Routes>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />   
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Login/>}/>
          
          <Route element={<Protected/>}>
         <Route element={<Content/>}>
          <Route path='/dashboard' element={<Dashboard/> }/>
          <Route path='/authors' element={<Authors/>}/>
          <Route path='/books' element={<Books/>  }/>
          <Route path='/report' element={<Report/>}/>
         </Route>
          </Route>



        </Routes>
      </div>

    </div>
  )
}

export default App