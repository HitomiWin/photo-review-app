import {
  useEffect,
  useState
} from 'react'
import {
  db
} from '../firebase'
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'

const useGetAlbum = (id) => {
  const [isLoading, setIsLoading] = useState(null)
  const [isError, setIsError] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getDoc = () => {
    setIsLoading(true)
    setIsError(false)
    setError(null)

    // get document reference
    const ref = doc(db, "albums", id)

    // attach listener
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (!snapshot.exists()) {
        setData(null)
        setIsLoading(false)
        return
      }

      setData(snapshot.data())
      setIsLoading(false)
    }, (error) => {
      setError(error.message)
      setIsError(true)
      setIsLoading(false)

    })
    return unsubscribe

  }
  useEffect(() => {
    getDoc()
    return () => {
      setIsLoading(null)
      setIsError(null)
      setError(null)
      setData(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])



  return {
    isLoading,
    data,
    error,
    isError
  }

}
export default useGetAlbum