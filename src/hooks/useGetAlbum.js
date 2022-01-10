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
  where,
  query
} from 'firebase/firestore'
import {
  useAuthContext
} from "../contexts/AuthContext";


const useGetAlbum = (id, preview) => {
  const {
    currentUser
  } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null)
  const [isError, setIsError] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getDoc = () => {
    setIsLoading(true)
    setIsError(false)
    setError(null)

    // get document reference
    const albumRef = doc(db, "albums", id)
    const queryRef = query(albumRef, where("owner", "==", currentUser.uid))
    const ref = preview ? albumRef : queryRef

    // attach listener
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      console.log("hej")
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

  return {
    isLoading,
    data,
    error,
    isError
  }
}

export default useGetAlbum