import React from "react";

const CommentCard = ({ comment, user }) => {
  return (
    <Card className="mb-3">
      )}
      <Card.Body className="py-2">
        <LinkContainer className="user" to={`/profile/${_id}`}>
          <Card.Title>
            <Image
              src={
                process.env.PUBLIC_URL + `/uploads/users/${tweet.profile.photo}`
              }
              className="mr-2"
              roundedCircle
              width="35"
              alt="profilePic"
            />
            @{handle}
          </Card.Title>
        </LinkContainer>
        <Card.Text className="my-1 mt-0">{text}</Card.Text>
        <hr className="my-0" />
        <small className="text-muted d-block">
          <Moment format="YYYY/MM/DD h:mm">{createdAt}</Moment>
        </small>
        {user && user.id === _id && (
          <Badge
            pill
            variant="danger"
            className="delete float-right mt-1"
            onClick={() => deleteTweet(tweet._id)}
          >
            X
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
