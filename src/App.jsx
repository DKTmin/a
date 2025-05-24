import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from "./features/store"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/AppRouters'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>

    </>
  )
}

export default App
