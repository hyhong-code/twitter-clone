import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { getComments } from "../../actions/commentAction";
import CommentTweet from "../components/CommentTweet";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";
import Spinner from "../layout/Spinner";

const Comment = ({
  match,
  history,
  loading,
  user,
  getComments,
  commentingTweet,
  comments,
}) => {
  useEffect(() => {
    console.log(match.params.tweetId);
    getComments(match.params.tweetId);
  }, [getComments]);

  return user && commentingTweet && comments && !loading ? (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <Button onClick={() => history.goBack()}>Back</Button>
        <CommentTweet tweet={commentingTweet} user={user} />
        <CommentForm />
        <div className="px-4">
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} user={user} />
          ))}
        </div>
      </Col>
    </Row>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({
  auth: { user },
  loading,
  comments: { commentingTweet, comments },
}) => ({ loading, user, commentingTweet, comments });

export default connect(mapStateToProps, { getComments })(Comment);
