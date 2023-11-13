export const create = async (categoryData) => {
    try {
      const response = await fetch('localhost:8080/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })
  
      if (response.ok) {
        return response.json()
      }
  
      if (response.status === 400) {
        const errorData = await response.json()
        throw new Error(`Failed to create category: ${errorData.message}`)
      }
  
      throw new Error('Failed to create category')
    } catch (error) {
      throw error
    }
  }