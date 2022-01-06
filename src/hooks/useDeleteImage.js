import { useState, useEffect } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useDeleteImage = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isMutating, setIsMutating] = useState(null)

  const mutate = async (albumId, imageId) => {
    setError(null)
    setIsError(false)
    setIsMutating(true)
    try {
      await deleteDoc(doc(db, 'albums', albumId, 'images', imageId))
    } catch (e) {
      setError(e.message)
      setIsError(true)
    } finally {
      setIsMutating(false)
    }
  }

  useEffect(()=>{
    return()=>{
      setError(null)
      setIsError(false)
      setIsMutating(true)
    }
  },[])

  return {
    error,
    isError,
    isMutating,
    mutate,
  }
}

export default useDeleteImage