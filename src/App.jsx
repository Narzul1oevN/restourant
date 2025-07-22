import React from 'react'
import Restaurant from './pages/restaurant'
import Layout from './Layout/Layout'
import Delivery from './pages/delivery'
import AboutUs from './pages/aboutUs';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Restaurant />
        },
        {
          path: "delivery",
          element: <Delivery/>
        },
        {
          path: "aboutus",
          element: <AboutUs/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
