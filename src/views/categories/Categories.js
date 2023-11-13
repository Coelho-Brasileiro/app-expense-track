import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CInputGroup,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilPen, cilXCircle } from '@coreui/icons'
import ModalCategory from './ModalCategory'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { CATEGORY_ENDPOINT, deletee, get } from 'src/services/Api'
import Pagination from 'src/components/Pagination'
import ColoredSquare from 'src/components/ColoredSquare'
import ModalYesOrNo from 'src/components/ModalYesOrNo'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const initialCategory = {
  id: '',
  name: '',
  description: '',
  color: '',
  type: '',
}
const Categories = () => {
  const [modalMessage, setModalMessage] = useState('')
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false)
  const [items, setItems] = useState([])
  const [category, setCategory] = useState(initialCategory)
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState({
    pageNo: 0,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1,
    last: true,
    sortBy: 'name',
    sortDir: 'asc',
    searchText: '',
  })
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const getCategories = async (page) => {
    let endpoint = `${CATEGORY_ENDPOINT}?pageNo=${page.pageNo}&pageSize=${page.pageSize}&sortBy=${page.sortBy}&sortDir=${page.sortDir}`

    if (page.searchText) {
      endpoint += `&name=${page.searchText}&description=${page.searchText}`
    }
    return await get(endpoint)
  }
  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
    queryKey: ['categories', page],
    queryFn: () => getCategories(page),
    keepPreviousData: true,
  })

  const { mutate: deleteCategory, isLoading: isLoadingDelete } = useMutation(
    (data) => deletee(data.id, CATEGORY_ENDPOINT),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ['categories'] })
        dispatch({
          type: 'set',
          showSuccessAlert: true,
          successMessage: `Category deleted with successfully!`,
        })
        setShowModalDeleteCategory(false)
      },
      onError: (error) => {
        console.error(error.message)
        dispatch({ type: 'set', showErrorAlert: true, errorMessage: error.message })
        setShowModalDeleteCategory(false)
      },
    },
  )

  const searchCategotiesByText = () => {
    setPage((prevPage) => ({
      ...prevPage,
      pageNo: 0,
      searchText: searchText,
    }))
  }

  const onEdit = (item) => {
    setCategory(item)
    setShowEditCategory(true)
  }

  const onDelete = (item) => {
    setCategory(item)
    setModalMessage(`Do you really want to delete the '${item.name}' category?`)
    setShowModalDeleteCategory(true)
  }

  useEffect(() => {
    if (data) {
      setItems(data.items)
      setPage({
        ...page,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        last: data.last,
      })
      console.log(data)
    }
  }, [data])

  useEffect(() => {
    if (searchText == '') {
      setPage({
        ...page,
        pageNo: 0,
        searchText: searchText,
      })
    }
  }, [searchText])

  useEffect(() => {
    dispatch({ type: 'set', isLoading: isLoading })
  }, [isLoading])

  useEffect(() => {
    dispatch({ type: 'set', isLoading: isLoadingDelete })
  }, [isLoadingDelete])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      label: 'Description',
      _props: { scope: 'col' },
    },
    {
      key: 'type',
      label: 'Type',
      _props: { scope: 'col' },
    },
    {
      key: 'color',
      label: 'Color',
      _props: { scope: 'col' },
    },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]
  const generateRows = () => {
    const rows = []
    items.forEach((item) => {
      rows.push(
        <CTableRow key={item.id}>
          <CTableDataCell>{item.name}</CTableDataCell>
          <CTableDataCell>{item.description}</CTableDataCell>
          <CTableDataCell>{item.type === 'E' ? 'Expenue' : 'Revenue'}</CTableDataCell>
          <CTableDataCell>
            <ColoredSquare color={item.color} />
          </CTableDataCell>
          <CTableDataCell>
            <CButton
              type="button"
              color="warning"
              onClick={() => onEdit(item)}
              variant="outline"
              id="btn-edit-categories"
              style={{ marginRight: '5px' }}
            >
              <CIcon icon={cilPen} />
            </CButton>
            <CButton
              type="button"
              color="danger"
              onClick={() => onDelete(item)}
              variant="outline"
              id="btn-delete-categories"
            >
              <CIcon icon={cilXCircle} />
            </CButton>
          </CTableDataCell>
        </CTableRow>,
      )
    })
    return rows
  }

  return (
    <div>
      <CRow>
        <CCol xs={4}>
          <CInputGroup className="mb-3">
            <CFormInput
              placeholder="Search by categories"
              aria-label="Search by categories"
              aria-describedby="button-addon2"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value)
              }}
            />
            <CButton
              type="button"
              color="secondary"
              onClick={searchCategotiesByText}
              variant="outline"
              id="btn-search-categories"
            >
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
        </CCol>
        <CCol xs={4}>
          <CButton
            type="button"
            color="primary"
            id="btn-add-categories"
            onClick={() => {
              setCategory(initialCategory)
              setShowEditCategory(true)
            }}
          >
            <CIcon icon={cilPlus} />
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>My Categories</CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell key={'name'} scope="col">
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell key={'description'} scope="col">
                      Description
                    </CTableHeaderCell>
                    <CTableHeaderCell key={'type'} scope="col">
                      Type
                    </CTableHeaderCell>
                    <CTableHeaderCell key={'color'} scope="col">
                      Color
                    </CTableHeaderCell>
                    <CTableHeaderCell key={'action'} scope="col">
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{generateRows()}</CTableBody>
              </CTable>
              {/* <CTable striped columns={columns} items={items} /> */}
              <Pagination page={page} data={items} fetchPage={setPage} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ModalCategory
        visible={showEditCategory}
        selectedCategory={category}
        onClose={() => {
          setShowEditCategory(false)
          setCategory(initialCategory)
        }}
      />
      <ModalYesOrNo
        onClose={() => {
          setShowModalDeleteCategory(false)
        }}
        visible={showModalDeleteCategory}
        message={modalMessage}
        onYes={() => {
          setShowModalDeleteCategory(false)
          deleteCategory({ ...category })
        }}
        onNo={() => {
          setShowModalDeleteCategory(false)
        }}
      />
    </div>
  )
}

export default Categories
