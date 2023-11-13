const baseURL = process.env.REACT_APP_BASE_URL
export const CATEGORY_ENDPOINT = '/api/v1/categories'

export const create = async (data, endpoint) => {
  try {
    const url = `${baseURL}${endpoint}`
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        Accept: '*/*',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return response.json()
    }

    if (response.status === 400) {
      const errorData = await response.json()
      throw new Error(`Failed to create: ${errorData.message}`)
    }

    throw new Error('Failed to create')
  } catch (error) {
    throw error
  }
}

export const edit = async (data, endpoint) => {
  try {
    const url = `${baseURL}${endpoint}/${data.id}`
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        Accept: '*/*',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return response.json()
    }

    if (response.status === 400) {
      const errorData = await response.json()
      throw new Error(`Failed to edit: ${errorData.message}`)
    }

    throw new Error('Failed to edit')
  } catch (error) {
    throw error
  }
}
export const deletee = async (id, endpoint) => {
  try {
    const url = `${baseURL}${endpoint}/${id}`
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        Accept: '*/*',
      },
    })

    if (response.ok) {
      return true
    }

    if (response.status === 400) {
      const errorData = await response.json()
      throw new Error(`Failed to edit: ${errorData.message}`)
    }

    throw new Error('Failed to edit')
  } catch (error) {
    throw error
  }
}

export const get = async (endpoint) => {
  try {
    const url = `${baseURL}${endpoint}`
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    })

    if (response.ok) {
      return response.json()
    }

    throw new Error('Failed to fetch data')
  } catch (error) {
    throw error
  }
}

export const fetchById = async (id, endpoint) => {
  try {
    const url = `${baseURL}${endpoint}/${id}`
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: '*/*',
      },
    })

    if (response.ok) {
      return response.json()
    }

    if (response.status === 404) {
      throw new Error(`Resource with ID ${id} not found`)
    }

    throw new Error('Failed to fetch data by ID')
  } catch (error) {
    throw error
  }
}
