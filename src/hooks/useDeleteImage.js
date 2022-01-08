import {
  useState,
  useEffect
} from 'react'
import {
  doc,
  deleteDoc
} from 'firebase/firestore'
import {
  db
} from '../firebase'

const useDeleteImage = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isMutating, setIsMutating] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const mutate = async (albumId, imageId) => {
    setError(null)
    setIsError(false)
    setIsMutating(true)
    setIsSuccess(false)
    try {
      await deleteDoc(doc(db, 'albums', albumId, "images", imageId))
      setIsSuccess(true)
      setIsMutating(false)

    } catch (e) {
      setError(e.message)
      setIsError(true)
      setIsMutating(false)
    }
  }

  useEffect(() => {
    return () => {
      setError(null)
      setIsError(false)
      setIsMutating(true)
      setIsSuccess(false)
    }
  }, [])

  return {
    error,
    isError,
    isMutating,
    isSuccess,
    mutate,
  }
}

export default useDeleteImage