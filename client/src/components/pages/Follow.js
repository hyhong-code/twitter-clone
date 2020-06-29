import React, { useEffect, useRef, useState, Fragment } from "react";
import { Row, Col, ListGroup, Image, Button, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import { getFollow } from "../../actions/profileAction";
import Spinner from "../layout/Spinner";

const Follow = ({ match, history, loading, profile, getFollow, socket }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getFollow(match.params.profileId);
  }, [getFollow, match]);

  useEffect(() => {
    socket.emit("getOnlineUser");

    socket.on("onlineUsersUpdate", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });
  }, []);

  const handleClick = () => {};

  const userListItem = (follower) =>
    !loading &&
    follower &&
    follower.user && (
      <ListGroup.Item
        key={follower._id}
        className="py-1"
        action
        onClick={handleClick}
      >
        <Image
          src={process.env.PUBLIC_URL + `/uploads/users/${follower.photo}`}
          width="35"
          rounded
        />
        <span className="ml-1 ml-md-3">@ {follower.user.handle}</span>
        {onlineUsers.includes(follower.user.handle) && (
          <Badge variant="success">Online</Badge>
        )}
      </ListGroup.Item>
    );

  const backBtn = () => (
    <Row className="pt-6 mb-1">
      <Col>
        <Button
          variant="dark"
          className="d-block px-4"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Col>
    </Row>
  );

  return !loading && profile && match ? (
    <Fragment>
      {backBtn()}
      <Row>
        <Col className="mb-2" md={{ span: 6 }}>
          <div className="px-5 py-3 border rounded">
            <p className="lead">{profile.followers.length} Followers:</p>
            <hr className="my-2" />
            <ListGroup variant="flush">
              {profile.followers.map((follower) => userListItem(follower))}
            </ListGroup>
          </div>
        </Col>
        <Col md={{ span: 6 }}>
          <div className="px-5 py-3 border rounded">
            <p className="lead">{profile.following.length} Following:</p>
            <hr className="my-2" />
            <ListGroup variant="flush">
              {profile.following.map((follower) => userListItem(follower))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Fragment>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ loading, profile, socket }) => ({
  loading,
  profile,
  socket,
});

export default connect(mapStateToProps, { getFollow })(Follow);
