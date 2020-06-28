import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { getComments } from "../../actions/commentAction";
import CommentTweet from "../components/CommentTweet";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";
import Spinner from "../layout/Spinner";

const Comment = ({
  match,
  loading,
  user,
  getComments,
  commentingTweet,
  comments,
}) => {
  useEffect(() => {
    getComments(match.params.tweetId);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <CommentTweet tweet={commentingTweet} user={user} />
        <CommentForm />
        <div className="px-4">
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} user={user} />
          ))}
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({
  auth: { user },
  loading,
  comments: { commentingTweet, comments },
}) => ({ loading, user, commentingTweet, comments });

export default connect(mapStateToProps, { getComments })(Comment);
