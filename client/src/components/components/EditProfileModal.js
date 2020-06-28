import React, { useState, Fragment, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { updateProfile } from "../../actions/profileAction";

const EditProfileModal = ({ updateProfile, profile }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    address: "",
  });

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Profile Picture");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFile = (evt) => {
    console.log(evt.target.files[0]);
    setFile(evt.target.files[0]);
    setFileName(evt.target.files[0].name);
  };

  const handleSave = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("name", name);
    form.append("bio", bio);
    form.append("address", address);
    if (await updateProfile(form)) {
      setFileName("Profile Picture");
      setFile("");
      setShow(false);
    }
  };

  const { name, bio, address } = formData;

  useEffect(() => {
    setFormData({
      name: profile.name || "",
      bio: profile.bio || "",
      address: profile.address || "",
    });
  }, []);

  return (
    <Fragment>
      <Button variant="dark" onClick={handleShow}>
        Edit Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.File
              id="custom-file"
              label={
                fileName.length <= 15 ? fileName : `${fileName.slice(0, 14)}...`
              }
              custom
              className="mb-3"
              onChange={handleFile}
            />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Bio"
                name="bio"
                value={bio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your address with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { updateProfile })(EditProfileModal);
