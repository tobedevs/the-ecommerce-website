import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Component/Navbar'
import { Footer } from '../Component/Footer'
import App from '../App'

export default function MainLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
