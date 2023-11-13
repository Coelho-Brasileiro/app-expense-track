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
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilDescription, cilExcerpt, cilColorPalette } from '@coreui/icons'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CATEGORY_ENDPOINT, create, edit } from 'src/services/Api'
import { useDispatch } from 'react-redux'

const ModalCategory = (props) => {
  const { visible, onClose, selectedCategory } = props
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [showAddCategory, setShowAddCategory] = useState(visible)

  useEffect(() => {
    console.log('mudou', selectedCategory)
    setValue('name', selectedCategory.name)
    setValue('description', selectedCategory.description)
    setValue('color', selectedCategory.color)
    setValue('type', selectedCategory.type)
  }, [selectedCategory])

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    color: yup.string().required('Color is required'),
    type: yup.string().required('Type is required'),
  })

  const {
    control,
    handleSubmit,
    clearErrors,
    resetField,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (dataForm, teste) => {
    console.log(dataForm)
    if (selectedCategory.id) {
      selectedCategory.id = selectedCategory.id
      selectedCategory.description = dataForm.description
      selectedCategory.color = dataForm.color
      selectedCategory.name = dataForm.name
      selectedCategory.type = dataForm.type
    }
    createOrUpdate(dataForm)
  }

  const { mutate: createOrUpdate, isLoading } = useMutation(
    (data) => (data.id ? edit(data, CATEGORY_ENDPOINT) : create(data, CATEGORY_ENDPOINT)),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ['categories'] })
        resetField('color')
        resetField('name')
        resetField('description')
        resetField('type')
        dispatch({
          type: 'set',
          showSuccessAlert: true,
          successMessage: `Category ${data.name} ${
            selectedCategory.id ? 'edited' : 'added'
          } with successfully!`,
        })
        onClose()
      },
      onError: (error) => {
        console.error(error.message)
        dispatch({ type: 'set', showErrorAlert: true, errorMessage: error.message })
        onClose()
      },
    },
    {
      onSuccess: (data) => {
        // Redirecione o usuário para a página de destino após o login bem-sucedido
        resetField('color')
        resetField('name')
        resetField('description')
        resetField('type')
        dispatch({
          type: 'set',
          showSuccessAlert: true,
          successMessage: `Category ${data.name} added with successfully!`,
        })
        onClose()
      },
      onError: (error) => {
        console.error(error.message)
        dispatch({ type: 'set', showErrorAlert: true, errorMessage: error.message })
        onClose()
      },
    },
  )

  useEffect(() => {
    setShowAddCategory(visible)
  }, [visible])

  return (
    <CModal scrollable backdrop="static" visible={showAddCategory} onClose={onClose}>
      <CModalHeader>
        <CModalTitle id="ScrollingLongContentExampleLabel2">
          {selectedCategory.id ? 'Edit' : 'Add'} Category
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm id="form-category" onSubmit={handleSubmit(onSubmit)}>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilDescription} />
            </CInputGroupText>
            <Controller
              name="name"
              control={control}
              defaultValue={selectedCategory.name}
              render={({ field }) => (
                <CFormInput
                  {...field}
                  placeholder="Name"
                  autoComplete="Name"
                  invalid={!!errors.name}
                  feedbackInvalid={errors.name && errors.name.message}
                />
              )}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilExcerpt} />
            </CInputGroupText>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CFormInput
                  {...field}
                  placeholder="Description"
                  autoComplete="Description"
                  invalid={!!errors.description}
                  feedbackInvalid={errors.description && errors.description.message}
                />
              )}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilColorPalette} />
            </CInputGroupText>
            <Controller
              name="color"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CFormInput
                  {...field}
                  type="color"
                  placeholder="Color"
                  autoComplete="Color"
                  invalid={!!errors.color}
                  feedbackInvalid={errors.color && errors.color.message}
                />
              )}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CFormSelect
                  {...field}
                  aria-label="Select the type of the category"
                  options={[
                    'Select the type of the category',
                    { label: 'Expense', value: 'E' },
                    { label: 'Revenue', value: 'R' },
                  ]}
                  invalid={!!errors.type}
                  feedbackInvalid={errors.type && errors.type.message}
                />
              )}
            />
          </CInputGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton form="form-category" type="submit" color="primary">
          {selectedCategory.id ? 'Edit' : 'Add'} {isLoading ? 'Loading...' : ''}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ModalCategory.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  selectedCategory: PropTypes.object,
}

export default ModalCategory
