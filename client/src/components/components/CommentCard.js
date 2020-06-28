import React from "react";
import { Card, Image, Badge } from "react-bootstrap";
import Moment from "react-moment";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";

const CommentCard = ({ comment, user, history }) => {
  const handleClick = () => {
    history.push(`profile/${user.id}`);
  };
  console.log("**********", user);
  return (
    <Card className="mb-3">
      <Card.Body className="py-2">
        <LinkContainer className="user" to={`/profile/${user.id}`}>
          <Card.Title>
            <Image
              src={
                process.env.PUBLIC_URL +
                `/uploads/users/${comment.profile.photo}`
              }
              className="mr-2"
              roundedCircle
              width="35"
              alt="profilePic"
            />
            @{user.handle}
          </Card.Title>
        </LinkContainer>
        <Card.Text className="my-1 mt-0">{comment.text}</Card.Text>
        <hr className="my-0" />
        <small className="text-muted d-block">
          <Moment format="YYYY/MM/DD h:mm">{comment.createdAt}</Moment>
        </small>
        {user && user.id === comment.user._id && (
          <Badge
            pill
            variant="danger"
            className="delete float-right mt-1"
            // onClick={() => deleteTweet(tweet._id)}
          >
            X
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default withRouter(CommentCard);
