import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CContainer,
  CFormSelect,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import PropTypes from 'prop-types'

const ModalYesOrNo = (props) => {
  const { visible, onClose, message, onYes, onNo } = props
  const [showAddCategory, setShowAddCategory] = useState(visible)

  useEffect(() => {
    setShowAddCategory(visible)
  }, [visible])

  return (
    <CModal scrollable backdrop="static" visible={showAddCategory} onClose={onClose}>
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">Message</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{message}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onNo}>
          No
        </CButton>
        <CButton color="primary" onClick={onYes}>
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ModalYesOrNo.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  message: PropTypes.string,
}

export default ModalYesOrNo
