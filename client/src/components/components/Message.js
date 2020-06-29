import React from "react";
import { ListGroup } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";

const Message = ({ chat: { name, text, date }, handle }) => {
  console.log(name);
  return (
    <ListGroup.Item>
      <div className={`${handle === name ? "text-right" : ""}`}>
        {name !== "$chat$admin" && <p className="message-user">@{name}</p>}
        <p className="message">{text}</p>
        <small className="text-muted text-nowrap">
          <Moment format="h:mm:ss a">{date}</Moment>
        </small>
      </div>
    </ListGroup.Item>
  );
};

const mapStateToProps = ({
  auth: {
    user: { handle },
  },
}) => ({ handle });

export default connect(mapStateToProps)(Message);
