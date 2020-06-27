import React from "react";
import { Card, Button } from "react-bootstrap";

const TweetCard = ({ tweet }) => {
  const {
    text,
    createdAt,
    user: { handle },
  } = tweet;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{handle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{createdAt}</Card.Subtitle>
        <Card.Text>{text}</Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
};

export default TweetCard;
