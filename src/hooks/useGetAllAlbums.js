import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useGetAllAlbums = (col) => {
  const { currentUser } = useAuthContext();
  const albumsRef = collection(db, col)
  const queryKey = [col, currentUser.uid]

  const queryRef = query(
    albumsRef, where("owner", "==", currentUser.uid),
    orderBy("created", "desc")
  );

  const albumsQuery = useFirestoreQueryData(
    queryKey,
    queryRef, {
      idField: "_id",
      subscribe: true,
    }, {
      refetchOnMount: 'always'
    }
  )
  return albumsQuery
}

export default useGetAllAlbums