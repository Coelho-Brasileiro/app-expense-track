import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import { isAuthenticated } from './services/Auth'
import routes from './routes'
import ProtectedRoute from './ProtectedRoute'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    const queryClient = new QueryClient()
    const renderedRoutes = routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={<route.element />}
      />
    ))
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                exact
                path="/login"
                name="Login Page"
                element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
              />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route
                path="*"
                name="Home"
                element={
                  <ProtectedRoute>
                    <DefaultLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
