import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from 'src/services/Auth'

const Register = () => {
  const [isAlertVisible, setAlertVisible] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const schema = yup.object().shape({
    firstName: yup.string().required('Firstname is required'),
    lastName: yup.string().required('Lastname is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup
      .string()
      .required('Password confirm is required')
      .oneOf([yup.ref('password')], 'Passwords must be the same'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    // Faça a autenticação aqui e, se for bem-sucedida, redirecione o usuário para a página de destino
    console.log(data) // Dados do formulário
    mutation.mutate(data)
  }
  const mutation = useMutation(createUser, {
    onSuccess: (data) => {
      // Redirecione o usuário para a página de destino após o login bem-sucedido
      navigate('/login')
    },
    onError: (error) => {
      console.error(error.message)
      setLoginErrorMessage(error.message)
      setAlertVisible(true)
    },
  })
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CAlert
                  color="danger"
                  dismissible
                  visible={isAlertVisible}
                  onClose={() => {
                    setAlertVisible(false)
                    setLoginErrorMessage('')
                  }}
                >
                  {loginErrorMessage}
                </CAlert>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          placeholder="Firstname"
                          autoComplete="Firstname"
                          invalid={!!errors.firstName}
                          feedbackInvalid={errors.firstName && errors.firstName.message}
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          placeholder="Lastname"
                          autoComplete="Lastname"
                          invalid={!!errors.lastName}
                          feedbackInvalid={errors.lastName && errors.lastName.message}
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          placeholder="Email"
                          autoComplete="email"
                          invalid={!!errors.email}
                          feedbackInvalid={errors.email && errors.email.message}
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          invalid={!!errors.password}
                          feedbackInvalid={errors.password && errors.password.message}
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <Controller
                      name="passwordConfirm"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          type="password"
                          placeholder="Reapeat password"
                          autoComplete="current-password"
                          invalid={!!errors.passwordConfirm}
                          feedbackInvalid={errors.passwordConfirm && errors.passwordConfirm.message}
                        />
                      )}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
