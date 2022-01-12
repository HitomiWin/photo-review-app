import { Card, Col } from "react-bootstrap";

const ReviewImageCard = ({ image }) => {
  return (
    <Col sm={12} md={4} lg={3} className="my-3">
      <Card>
        <a href={image.url}>
          <Card.Img
            className="image-card"
            variant="top"
            src={image.url}
            title={image._id}
          />
        </a>
      </Card>
    </Col>
  );
};

export default ReviewImageCard;
