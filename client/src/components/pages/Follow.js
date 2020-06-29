import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { connect } from "react-redux";

import { getFollow } from "../../actions/profileAction";
import Spinner from "../layout/Spinner";

const Follow = ({ match, loading, profile, getFollow }) => {
  useEffect(() => {
    getFollow(match.params.profileId);
  }, [getFollow, match]);

  const userListItem = (follower) =>
    !loading &&
    follower &&
    follower.user && (
      <ListGroup.Item key={follower._id} className="py-1" action>
        <Image
          src={process.env.PUBLIC_URL + `/uploads/users/${follower.photo}`}
          width="35"
          rounded
        />
        <span className="ml-1 ml-md-3">@ {follower.user.handle}</span>
      </ListGroup.Item>
    );

  return !loading && profile && match ? (
    <Row className="pt-6">
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
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ loading, profile }) => ({ loading, profile });

export default connect(mapStateToProps, { getFollow })(Follow);
