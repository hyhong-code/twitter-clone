import React, { useEffect, Fragment } from "react";
import { Row, Col, Button, Image, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import TweetCard from "../components/TweetCard";
import { getProfile, follow, unfollow } from "../../actions/profileAction";
import Spinner from "../layout/Spinner";
import EditProfileModal from "../components/EditProfileModal";

const Profile = ({
  match,
  history,
  getProfile,
  follow,
  unfollow,
  tweets,
  user,
  profile,
  loading,
}) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);

  const handleClick = () => {
    history.goBack();
  };

  const tweetsDisplay = () =>
    tweets.length ? (
      <Fragment>
        <p className="lead">User has {tweets.length} Tweets:</p>
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} user={user} />
        ))}
      </Fragment>
    ) : (
      <p className="lead">User has no tweets</p>
    );

  const userProfile = () => (
    <Fragment>
      <Image
        width="200"
        className="d-block"
        src={process.env.PUBLIC_URL + `/uploads/users/${profile.photo}`}
        roundedCircle
      />
      {profile.user && (
        <h3>
          <strong>HANDLE: @</strong>
          {profile.user.handle}
        </h3>
      )}
      {!!profile.name && (
        <h4>
          <strong>NAME: </strong>
          {profile.name}
        </h4>
      )}
      {!!profile.bio && (
        <p className="lead">
          <strong>BIO: </strong>
          {profile.bio}
        </p>
      )}
    </Fragment>
  );

  const followSection = () => (
    <div className="mb-3">
      <Badge pill variant="primary" className="mr-2">
        {profile.followers.length} followers
      </Badge>
      <Badge pill variant="secondary">
        {profile.following.length} following
      </Badge>
    </div>
  );

  const followButton = () => {
    console.log(profile.followers.includes(user.id), user.id);
    return (
      profile.user._id !== user.id &&
      (!profile.followers.includes(user.profile._id) ? (
        <Button onClick={() => follow(profile.user._id)} variant="info">
          Follow
        </Button>
      ) : (
        <Button onClick={() => unfollow(profile.user._id)} variant="warning">
          Unfolow
        </Button>
      ))
    );
  };

  return !loading && tweets && user && profile ? (
    <Row className="pt-6">
      <Col md={{ span: 8, offset: 2 }}>
        <Button className="my-3" variant="secondary" onClick={handleClick}>
          GO BACK
        </Button>
        {userProfile()}
        {followSection()}
        {followButton()}
        {profile.user && profile.user._id === user.id && <EditProfileModal />}
        {tweetsDisplay()}
      </Col>
    </Row>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ tweets, auth: { user }, loading, profile }) => ({
  tweets,
  user,
  loading,
  profile,
});

export default connect(mapStateToProps, { getProfile, follow, unfollow })(
  Profile
);
