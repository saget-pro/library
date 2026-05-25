import React from 'react'
import Header from './Header'  // Make sure path is correct
import { Outlet } from 'react-router-dom'

function Content() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Content