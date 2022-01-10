import {
  useFirestoreQueryData
} from "@react-query-firebase/firestore";
import {
  collection,
  query,
  orderBy,
  where
} from "firebase/firestore";
import {
  db
} from "../firebase";
import {
  useAuthContext
} from "../contexts/AuthContext";

const useGetAllImages = (id, col, preview) => {
  const {
    currentUser
  } = useAuthContext();
  const imagesRef = collection(db, col, id, "images");
  const queryKey = ["images", id];
  const queryRef = preview ?
    query(
      imagesRef,
      orderBy("created", 'desc')
    ) : query(
      imagesRef,
      where("owner", "==", currentUser.uid),
      orderBy("created", 'desc'))

  const getImagesQuery = useFirestoreQueryData(
    queryKey,
    queryRef, {
      idField: "_id",
      subscribe: true,
    },
  );

  return getImagesQuery;
};

export default useGetAllImages;