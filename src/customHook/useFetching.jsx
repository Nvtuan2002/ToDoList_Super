import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { FETCH_DATA } from '@/common/errorCodes'

export function useFetching(api) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const isMounted = useRef(true)
  const countReloadTaskList = useSelector(state => state.taskList.countReloadTaskList)
  const filters = useSelector(state => state.taskList.filters)
  const [page, setPage] = useState({
    page: 1,
    pageCount: 6,
    pageSize: 10,
    total: 101
  })

  function reload() {
    setLoading(true)
    setCount(count + 1)
    setError(null)
  }

  function loadPage(page, pageSize) {
    setLoading(true)
    setPage((prev) => {
      return { ...prev, page: page, pageSize: pageSize }
    })
  }

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController();
    isMounted.current = true;
    api(page.page, page.pageSize, controller.signal)
      .then(data => {
        if (isMounted.current) {
          setPage({
            ...data.meta.pagination,
          })
          setData(data.data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          if (isMounted.current) {
            setError(FETCH_DATA);
            setLoading(false)
          }
        }
      })

    return () => {
      isMounted.current = false
      controller.abort();
    }
  }, [api, page.page, page.pageSize, count, countReloadTaskList, filters])

  return { data, loading, error, page, loadPage, reload }
}