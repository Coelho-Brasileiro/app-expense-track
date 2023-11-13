import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginRequest } from 'src/services/Auth'

const Login = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [isAlertVisible, setAlertVisible] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
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

  const mutation = useMutation(loginRequest, {
    onSuccess: (data) => {
      // queryClient.setQueryData('userToken', data.token)
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      // Redirecione o usuário para a página de destino após o login bem-sucedido
      navigate('/dashboard')
      // Invalidar o cache para atualizar os dados do usuário, se necessário
      queryClient.invalidateQueries('userData') // Substitua 'userData' pela chave da consulta correta
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
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
                    <CInputGroup className="mb-4">
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
