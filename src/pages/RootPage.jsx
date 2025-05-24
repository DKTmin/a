import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const RootPage = () => {
  return (
    <div className='flex flex-col h-screen'>
    <Header></Header>
    <div className='flex-grow'>
      <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </div>
  )
}

export default RootPage