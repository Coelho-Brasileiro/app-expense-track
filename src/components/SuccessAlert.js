import React, { useState, useEffect } from 'react'
import { CAlert } from '@coreui/react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

const SuccessAlert = ({ hideTimeout }) => {
  const dispatch = useDispatch()
  const showSuccessAlert = useSelector((state) => state.showSuccessAlert)
  const successMessage = useSelector((state) => state.successMessage)

  useEffect(() => {
    let timeoutId

    if (showSuccessAlert) {
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'set',
          showSuccessAlert: false,
          successMessage: ``,
        })
      }, hideTimeout)
    }

    return () => {
      clearTimeout(timeoutId) // Limpa o timeout na saída do componente
    }
  }, [showSuccessAlert, hideTimeout, dispatch])

  return (
    <CAlert
      color="success"
      dismissible
      visible={showSuccessAlert}
      onClose={() => {
        if (!showSuccessAlert) {
          dispatch({ type: 'set', showSuccessAlert: false, successMessage: '' })
        }
      }}
    >
      {successMessage}
    </CAlert>
  )
}

SuccessAlert.propTypes = {
  hideTimeout: PropTypes.number, // Tempo em milissegundos para ocultar o alerta
}
export default SuccessAlert
