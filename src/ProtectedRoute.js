import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from './services/Auth'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}
ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}
export default ProtectedRoute
