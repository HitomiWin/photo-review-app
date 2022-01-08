import { useFirestoreQueryData} from "@react-query-firebase/firestore";
import { collection, query, orderBy} from "firebase/firestore";
import { db } from "../firebase";

const useGetAllImages = (id, col) => {
  const imagesRef = collection(db, col, id, "images");
  const queryKey = ["images", id];
  const queryRef = query(
    imagesRef,
    orderBy("created", 'desc')
  );

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