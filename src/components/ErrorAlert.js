import React, { useState, useEffect } from 'react'
import { CAlert } from '@coreui/react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

const ErrorAlert = ({ hideTimeout }) => {
  const dispatch = useDispatch()
  const showErrorAlert = useSelector((state) => state.showErrorAlert)
  const errorMessage = useSelector((state) => state.errorMessage)

  useEffect(() => {
    let timeoutId

    if (showErrorAlert) {
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'set',
          showErrorAlert: false,
          successMessage: ``,
        })
      }, hideTimeout)
    }

    return () => {
      clearTimeout(timeoutId) // Limpa o timeout na saída do componente
    }
  }, [showErrorAlert, hideTimeout, dispatch])

  return (
    <CAlert
      color="danger"
      dismissible
      visible={showErrorAlert}
      onClose={() => {
        if (!showErrorAlert) {
          dispatch({ type: 'set', showErrorAlert: false, successMessage: '' })
        }
      }}
    >
      {errorMessage}
    </CAlert>
  )
}
ErrorAlert.propTypes = {
  hideTimeout: PropTypes.number, // Tempo em milissegundos para ocultar o alerta
}
export default ErrorAlert
