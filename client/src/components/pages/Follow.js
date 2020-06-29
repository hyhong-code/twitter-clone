import React, { useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";

import { getFollow } from "../../actions/profileAction";
import Spinner from "../layout/Spinner";

const Follow = ({ match, loading, profile, getFollow }) => {
  useEffect(() => {
    console.log(match.params.profileId);
    getFollow(match.params.profileId);
  }, [getFollow, match.params.profileId]);

  return !loading && profile && match ? (
    <Row className="pt-6">
      <Col md={{ span: 6 }}>
        <div className="px-5 py-3 border rounded">
          <p className="lead">5 Followers:</p>
          <hr className="my-2" />
          <ListGroup variant="flush">
            <ListGroup.Item action>Some Name</ListGroup.Item>
          </ListGroup>
        </div>
      </Col>
      <Col md={{ span: 6 }}>
        <div className="px-5 py-3 border rounded">
          <p className="lead">5 Following:</p>
          <hr className="my-2" />
          <ListGroup variant="flush">
            <ListGroup.Item action>Some Name</ListGroup.Item>
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
