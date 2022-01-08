import { Alert, Row, Spinner } from "react-bootstrap";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import AlbumCard from "./cards/AlbumCard";

const CustomerReviewsList = () => {
  const query = useGetAllAlbums();

  return (
    <>
      <h4 className="text-center color-yellow my-3">My Albums</h4>
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
            <AlbumCard key={album._id} album={album} />
          ))}
      </Row>
    </>
  );
};

export default CustomerReviewsList;
