import { useParams } from "react-router-dom";
import { Alert, Spinner, Row } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import ReviewImageCard from "../components/cards/ReviewImageCard";

const ReviewAlbumPage = () => {
  const { id: albumId } = useParams();
  const query = useGetAllImages(albumId, "review-albums");
  if (query.isLoading) {
    return (
      <div className="center">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
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
              <ReviewImageCard
                key={image._id}
                albumId={albumId}
                image={image}
              />
            ))}
          </Row>
        </SRLWrapper>
      </>
    )
  );
};

export default ReviewAlbumPage;
