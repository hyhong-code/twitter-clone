import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, ListGroup, Image, Button, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import { getFollow } from "../../actions/profileAction";
import { setChatTarget, clearChatTarget } from "../../actions/chatActions";
import { setAlert } from "../../actions/alertActions";
import Spinner from "../layout/Spinner";
import ChatModal from "../components/ChatModal";

const Follow = ({
  match,
  history,
  loading,
  profile,
  getFollow,
  socket,
  setChatTarget,
  clearChatTarget,
  setAlert,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    clearChatTarget();
    setShow(false);
  };
  const handleShow = (targetUser) => {
    setChatTarget(targetUser);
    setShow(true);
  };

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getFollow(match.params.profileId);
  }, [getFollow, match]);

  useEffect(() => {
    socket.emit("getOnlineUser");

    socket.on("onlineUsersUpdate", (users) => {
      setOnlineUsers(users);
    });
  }, [socket]);

  const userListItem = (follower) =>
    !loading &&
    follower &&
    follower.user && (
      <ListGroup.Item key={follower._id} className="py-1">
        <Image
          src={process.env.PUBLIC_URL + `/uploads/users/${follower.photo}`}
          width="35"
          rounded
        />
        <span className="ml-1 ml-md-3">@ {follower.user.handle}</span>
        {onlineUsers.includes(follower.user._id) ? (
          <Fragment>
            <Badge className="ml-2" variant="success">
              Online
            </Badge>
            <span className="text-primary ml-1">
              <i
                onClick={() => handleShow(follower.user)}
                className="fas fa-comment fa-2x chatIcon"
              ></i>
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <Badge className="ml-2" variant="danger">
              Offline
            </Badge>
            <span className="text-primary ml-1">
              <i
                onClick={() =>
                  setAlert(true, `User offline, cannot chat`, 3000)
                }
                className="fas fa-comment fa-2x chatIcon text-secondary"
              ></i>
            </span>
          </Fragment>
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
      <ChatModal show={show} handleClose={handleClose} />
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

export default connect(mapStateToProps, {
  getFollow,
  setChatTarget,
  clearChatTarget,
  setAlert,
})(Follow);
