import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Booking from '../pages/Booking'
import Detail from '../pages/Detail'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Router = (props: any) => {
    const element = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/home',
                    element: <Home />
                },
                {
                    path: '/moviedetail/:id',
                    element: <Detail />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/booking/:id',
                    element: <Booking />
                },
                {
                    path: "*",
                    element: <Navigate to="/404" />,
                 },
                 {
                    path: "/404",
                    element: <Error />,
                 },
            ]
        },
    ])
  return element
}

export default Router