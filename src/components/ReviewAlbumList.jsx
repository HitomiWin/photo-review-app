import { Alert, Row, Spinner } from "react-bootstrap";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import ReviewAlbumCard from "./cards/ReviewAlbumCard";

const ReviewAlbumList = () => {
  const query = useGetAllAlbums("review-albums");

  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }

  if (query.isLoading) {
    return (
      <div className="center">
        <Spinner animation="border" variant="light" />;
      </div>
    );
  }

  return (
    query.data && (
      <>
        <h4 className="text-center color-yellow my-3">My Reviews</h4>
        <Row className="justify-content-center">
          {query.data &&
            query.data.map((album) => (
              <ReviewAlbumCard key={album._id} album={album} />
            ))}
        </Row>
      </>
    )
  );
};

export default ReviewAlbumList;
