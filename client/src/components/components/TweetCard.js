import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const TweetCard = ({ tweet }) => {
  const {
    text,
    createdAt,
    user: { handle, _id },
  } = tweet;
  return (
    <Card className="mb-3">
      <Card.Body>
        <LinkContainer className="user" to={`/profile/${_id}`}>
          <Card.Title>@{handle}</Card.Title>
        </LinkContainer>
        <Card.Text className="my-1">{text}</Card.Text>
        <hr className="my-0" />
        <small className="text-muted">{createdAt}</small>
        {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
};

export default TweetCard;
