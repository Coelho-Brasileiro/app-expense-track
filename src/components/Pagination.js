import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CPagination,
  CPaginationItem,
  CFormSelect,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { CATEGORY_ENDPOINT, get } from 'src/services/Api'

const Pagination = ({ page, fetchPage }) => {
  const generatePaginationItems = () => {
    const items = []
    for (let i = 1; i <= page.totalPages; i++) {
      items.push(
        <CPaginationItem
          key={i}
          onClick={() => {
            if (i !== page.pageNo) {
              console.log(i) // Página clicada
              fetchPage({ ...page, pageNo: i })
            }
          }}
          active={i === page.pageNo}
        >
          {i}
        </CPaginationItem>,
      )
    }
    return items
  }

  return (
    <CRow className="mb-4">
      <CFormLabel htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
        <CFormSelect
          id="select-qty-items-page"
          size="sm"
          className="col-sm-2"
          aria-label="Amount of items per page"
          onChange={(event) => {
            fetchPage({ ...page, pageSize: event.target.value, pageNo: 1 })
          }}
        >
          <option value="5">5</option>
          <option selected value="10">
            10
          </option>
          <option value="20">20</option>
          <option value="50">50</option>
        </CFormSelect>
        <CFormLabel htmlFor="colFormLabelSm" className="col-sm-8 col-form-label col-form-label-sm">
          Item per page
        </CFormLabel>
      </CFormLabel>
      <CFormLabel htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
        <CFormSelect
          id="select-orde-by-page"
          size="sm"
          className="col-sm-2"
          aria-label="Amount of items per page"
          onChange={(event) => {
            fetchPage({ ...page, sortBy: event.target.value })
          }}
        >
          <option selected value="name">
            Name
          </option>
          <option value="description">Description</option>
          <option value="type">Type</option>
          <option value="color">Color</option>
        </CFormSelect>
        <CFormLabel htmlFor="colFormLabelSm" className="col-sm-8 col-form-label col-form-label-sm">
          Sort by
        </CFormLabel>
      </CFormLabel>
      <CFormLabel htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
        <CFormSelect
          id="select-orde-by-page"
          size="sm"
          className="col-sm-2"
          aria-label="Amount of items per page"
          onChange={(event) => {
            fetchPage({ ...page, sortDir: event.target.value })
          }}
        >
          <option selected value="asc">
            Asc
          </option>
          <option value="desc">Desc</option>
        </CFormSelect>
        <CFormLabel htmlFor="colFormLabelSm" className="col-sm-8 col-form-label col-form-label-sm">
          Sort Dir
        </CFormLabel>
      </CFormLabel>
      <CCol sm={6}>
        <CPagination align="end" aria-label="Page navigation example">
          <CPaginationItem
            disabled={page.pageNo === 1}
            onClick={() => {
              if (page.pageNo > 0) {
                fetchPage({ ...page, pageNo: Math.max(page.pageNo - 1, 0) })
                console.log('fetchPreviousPage()')
              }
            }}
          >
            Previous
          </CPaginationItem>
          {generatePaginationItems()}
          <CPaginationItem
            disabled={page.last}
            onClick={() => {
              if (!page.last) {
                fetchPage({ ...page, pageNo: page.pageNo + 1 })
                console.log('fetchNextPage()')
              }
            }}
          >
            Next
          </CPaginationItem>
        </CPagination>
      </CCol>
    </CRow>
  )
}

Pagination.propTypes = {
  page: PropTypes.object,
  fetchPage: PropTypes.func,
}

export default Pagination
