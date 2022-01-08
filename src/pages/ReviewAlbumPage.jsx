import { useParams } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import ReviewImageCard from "../components/cards/ReviewImageCard";
import Masonry from "react-masonry-css";

const ReviewAlbumPage = () => {
  const { id: albumId } = useParams();
  const query = useGetAllImages(albumId, "review-albums");
  const masonryBreakpoints = {
    default: 4,
    576: 2,
    768: 3,
    992: 4,
  };

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
        <h4 className="text-center color-yellow my-">My Photos</h4>
        <SRLWrapper>
          <Masonry
            breakpointCols={masonryBreakpoints}
            className="review-masonry"
            columnClassName="review-masonry-column"
          >
            {query.data.map((image) => (
              <ReviewImageCard
                key={image._id}
                albumId={albumId}
                image={image}
              />
            ))}
          </Masonry>
        </SRLWrapper>
      </>
    )
  );
};

export default ReviewAlbumPage;
