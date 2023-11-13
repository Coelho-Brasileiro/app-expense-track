import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CSpinner,
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'

const Loading = () => {
  const dispatch = useDispatch()
  const showLoading = useSelector((state) => state.isLoading)

  useEffect(() => {
    // dispatch({ type: 'set', isLoading: isLoading })
    console.log('mudou', showLoading)
  }, [showLoading])

  return (
    <CModal
      scrollable
      backdrop="static"
      visible={showLoading}
      onClose={() => {
        console.log('close')
      }}
    >
      <CModalBody>
        <CSpinner color="primary" variant="grow" />
        <CSpinner color="secondary" variant="grow" />
        <CSpinner color="success" variant="grow" />
        <CSpinner color="danger" variant="grow" />
        <CSpinner color="warning" variant="grow" />
        <CSpinner color="info" variant="grow" />
        <CSpinner color="light" variant="grow" />
        <CSpinner color="dark" variant="grow" />
      </CModalBody>
    </CModal>
  )
}

export default Loading
