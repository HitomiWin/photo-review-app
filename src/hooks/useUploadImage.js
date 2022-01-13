import { useState, } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'
import { db, storage } from '../firebase'

const useUploadImage = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [progress, setProgress] = useState(null)
  const { currentUser } = useAuthContext()

  const mutate = async (image, id) => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsMutating(true)

    if (!image instanceof File) {
      setError("Only file is acceptable")
      setIsError(true)
      setIsMutating(false)
      return
    }

    // to be long fileName add Date.now()
    const storageFileName = `${Date.now()}-${image.name}`
    // to save path to Firestore need storage path
    const storageFullPath = `images/${currentUser.uid}/${storageFileName}`

    try {
      // create a reference in storage to upload inage to
      const storageRef = ref(storage, storageFullPath)

      // start upload of image//https://firebase.google.com/docs/storage/web/upload-files
      const uploadTask = uploadBytesResumable(storageRef, image)

      // attach upload observer // 1. 'state_changed' observer, called any time the state changes 
      uploadTask.on("state_changed", (snapshot) => {
        setProgress(
          Math.round(
            //Rounded  to the first decimal place 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10)
      })

      // wait for upload to be completed
      await uploadTask.then()

      //get downoad url to upladed image from storage
      const url = await getDownloadURL(storageRef)

      // create document in db for the uploaded image
      await addDoc(collection(db, "albums", id, "images"), {
        created: serverTimestamp(),
        name: image.name,
        owner: currentUser.uid,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        url,
      })

      setProgress(null)
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
    progress,
  }
}

export default useUploadImage