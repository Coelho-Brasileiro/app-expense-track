export const loginRequest = async (data) => {
  try {
    const response = await fetch('http://195.35.42.54:8082/api/v1/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return response.json()
    }
    const errorData = await response.json()
    throw new Error(`Authentication failed: ${errorData.code} - ${errorData.message}`)
  } catch (error) {
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await fetch('http://195.35.42.54:8082/api/v1/user/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (response.ok) {
      return response.json()
    }

    if (response.status === 400) {
      const errorData = await response.json()
      throw new Error(`Failed to create user: ${errorData.message}`)
    }

    throw new Error('Failed to create user')
  } catch (error) {
    throw error
  }
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

export const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
}

export const getUserLogged = () => {
  if (!localStorage.getItem('user')) {
    return null
  }
  return JSON.parse(localStorage.getItem('user'))
}
