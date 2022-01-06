import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { db } from '../firebase'

 const useCreateAlbum = (name) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const { currentUser } = useAuthContext()

  const mutate = async (name)=>{
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsMutating(true)

    try{
      const collectionRef = collection(db, 'albums')
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        name,
        owner:currentUser.uid,
      })
      //Success
      setIsSuccess(true)
      setIsMutating(false)
    } catch(e){
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
