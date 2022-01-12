import { Alert, Row, Spinner } from "react-bootstrap";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import ReviewAlbumCard from "./cards/ReviewAlbumCard";

const ReviewAlbumList = () => {
  const query = useGetAllAlbums("review-albums");

  return (
    <>
      <h4 className="text-center color-yellow my-3">My Reviews</h4>
      {query.isLoading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" variant="light" />;
        </div>
      )}
      {query.isError && <Alert variant="danger">{query.error}</Alert>}
      <Row className="justify-content-center">
        {!query.isLoading &&
          !query.isError &&
          query.data.map((album) => (
            <ReviewAlbumCard key={album._id} album={album} />
          ))}
      </Row>
      <div>Hej</div>
    </>
  );
};

export default ReviewAlbumList;
