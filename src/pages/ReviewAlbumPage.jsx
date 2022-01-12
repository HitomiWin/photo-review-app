import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Alert, Spinner, Row, Button } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import ReviewImageCard from "../components/cards/ReviewImageCard";

const ReviewAlbumPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useGetAllImages(id, "review-albums");

  if (!location.state) {
    return (
      <div className="text-center m-3">
        <h4>Somthing went wrong...</h4>
        <Button
          variant="light"
          className="text-center m-3"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </div>
    );
  }

  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }
  if (query.isLoading) {
    return (
      <div className="center">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!query.data.length) {
    return (
      <h3 className="text-center mt-5">
        Sorry, Your customer is not satisfied your photos
      </h3>
    );
  }

  return (
    query.data && (
      <>
        <h4 className="text-center color-yellow my-3">My Photos</h4>
        <SRLWrapper>
          <Row className="justify-content-center">
            {query.data.map((image) => (
              <ReviewImageCard key={image._id} albumId={id} image={image} />
            ))}
          </Row>
        </SRLWrapper>
      </>
    )
  );
};

export default ReviewAlbumPage;
