import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import { AiFillUnlock } from "react-icons/ai";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);

    this.state = {
      email: "",
      password: "",
      Confirmpassword: "",
      modalHeading: "",
      modalBody: "",
      showModal: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleModalClose() {
    this.setState({
      showModal: false,
    });
  }

  handleModalShow() {
    this.setState({
      showModal: true,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      Confirmpassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.password === this.state.Confirmpassword) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };

      console.log(user);

      axios.post("http://localhost:5005/v1/auth/register", user).then(
        (res) => {
          this.setState({
            email: "",
            password: "",
            Confirmpassword: "",
            modalHeading: "Account Created Successfully",
            modalBody: `Email: ${res.data["user"].email}`,
          });
          this.handleModalShow();
        },
        (error) => {
          if (error.response.status === 409) {
            console.log(error.response.data);

            this.setState({
              modalHeading: error.response.data.message,
              modalBody: error.response.data.errors[0].messages[0],
            });
            this.handleModalShow();
          } else {
            this.setState({
              modalHeading: "Error Encountered",
              modalBody: error.response.data.errors[0].messages[0],
            });
            this.handleModalShow();
          }
        }
      );
    } else {
      this.setState({
        modalHeading: "Password Validation",
        modalBody: "Password mismatch, please re-type!",
        Confirmpassword: "",
      });
      this.handleModalShow();
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: "#2b2b2d" }} className="pt-5">
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Form>
              <Form.Control
                type="email"
                placeholder="Email"
                className="mb-3 form-control text-white border-dark"
                style={{ backgroundColor: "#222224" }}
                value={this.state.email}
                onChange={this.onChangeEmail}
              ></Form.Control>
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3 form-control text-white border-dark"
                style={{ backgroundColor: "#222224" }}
                value={this.state.password}
                onChange={this.onChangePassword}
              ></Form.Control>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className="mb-3 form-control text-white border-dark"
                style={{ backgroundColor: "#222224" }}
                value={this.state.Confirmpassword}
                onChange={this.onChangeConfirmPassword}
              ></Form.Control>
              <Button
                onClick={this.onSubmit}
                block
                className="mb-2 py-2 font-weight-bold"
                style={{
                  backgroundColor: "#56c595",
                  border: "#56c595",
                  borderRadius: 0,
                }}
              >
                {/* <AiFillUnlock style={{ marginBottom: "4px" }} /> */}
                REGISTER
              </Button>

              <div className="pb-4">
                <p>
                  <Link
                    style={{ float: "left" }}
                    className="text-secondary py-0 text-left"
                    to="./login"
                  >
                    Login
                  </Link>
                </p>
                <p className="text-secondary py-0 text-right">
                  Forgot Password?
                </p>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleModalClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Register;
