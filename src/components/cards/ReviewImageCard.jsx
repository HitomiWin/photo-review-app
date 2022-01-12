import { Card, Col } from "react-bootstrap";

const ReviewImageCard = ({ image }) => {
  return (
    <>
      <Card>
        <a href={image.url}>
          <Card.Img variant="top" src={image.url} title={image._id} />
        </a>
      </Card>
    </>
  );
};

export default ReviewImageCard;
