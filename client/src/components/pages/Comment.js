import React from "react";
import { Rol, Col } from "react-bootstrap";
import { connect } from "react-redux";

import CommentTweet from "../components/CommentTweet";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";

const Comment = ({ match, loading, user }) => {
  return (
    <Rol>
      <Col md={{ span: 8, offset: 2 }}>
        <CommentTweet tweet={tweet} user={user} />
        <CommentForm />
        <div className="px-4">
          <CommentCard user={uesr} />
        </div>
      </Col>
    </Rol>
  );
};

const mapStateToProps = ({ auth: { user }, loading }) => ({ loading, user });

export default connect(mapStateToProps)(Comment);
