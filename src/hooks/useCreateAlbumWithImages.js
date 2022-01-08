import {
  useState
} from "react"
import {
  doc,
  setDoc,
  updateDoc,
  deleteField,
  serverTimestamp,
} from "firebase/firestore"
import {
  useAuthContext
} from "../contexts/AuthContext"
import {
  db
} from "../firebase"
import {
  v4 as uuidv4
} from "uuid"


const useCreateAlbumWithImages = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const uuid = uuidv4()
  const uuid2 = uuidv4()
  const {
    currentUser
  } = useAuthContext()

  const mutate = async (name, updateList) => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsMutating(true)

    try {
      await setDoc(doc(db, 'albums', uuid), {
        created: serverTimestamp(),
        name,
        owner: currentUser.uid,
        linkId: uuid2,
      })

      await updateList.forEach((image) => {
        setDoc(doc(db, 'albums', uuid, "images", image._id), {
          ...image,
          created: serverTimestamp()
        })
      })
      await updateList.forEach((image) => {
        updateDoc(doc(db, 'albums', uuid, "images", image._id), {
          _id: deleteField()
        })
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

export default useCreateAlbumWithImages