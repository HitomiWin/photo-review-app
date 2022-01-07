import {
  useState
} from 'react'
import {
  setDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import {
  useAuthContext
} from '../contexts/AuthContext'
import {
  db
} from '../firebase'
import {
  v4 as uuidv4
} from 'uuid'


const useCreateAlbum = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const uuid = uuidv4()
  const {
    currentUser
  } = useAuthContext()

  const mutate = async (name) => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsMutating(true)

    try {
      const ref = doc(db, 'albums', uuid)
      await setDoc(ref, {
        created: serverTimestamp(),
        name,
        owner: currentUser.uid,
      })
      //Success
      setIsSuccess(true)
      setIsMutating(false)
    } catch (e) {
      setError(e.message)
      setIsError(true)
      setIsMutating(false)
      setIsSuccess(false)
    }


  }
  return {
    error,
    isError,
    isMutating,
    isSuccess,
    mutate,
  }
}

export default useCreateAlbum