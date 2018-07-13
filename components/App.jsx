import React from "react";
import { connect } from "react-redux";

import { Grid, Row, Col, Modal, Button } from "react-bootstrap";

import { deleteElement, editElement } from "../actions/index-actions";

import InfoPanel from "./InfoPanel.jsx";
import Block from "./Block.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      active: 0,
      green: 0,
      red: 0
    };
  }

  deleteBlock(element) {
    if (element.type == "complex") {
      if (this.state.modal) {
        this.props.deleteBlock(this.state.modal.id);
        this.setState({
          modal: false,
          [element.color]: element.active
            ? this.state[element.color] - 1
            : this.state[element.color],
          active: element.active ? this.state.active - 1 : this.state.active
        });
      } else {
        this.setState({ modal: element });
      }
    } else {
      this.props.deleteBlock(element.id);
      if (element.active) {
        this.setState({ active: this.state.active - 1 });
      }
    }
  }
  editType(id, color) {
    this.props.editBlock(id);
    this.setState({
      [color]: this.state[color] + 1
    });
  }

  handleHide() {
    this.setState({ modal: false });
  }

  countColor(color) {
    if (color == "red") {
      this.setState({
        red: this.state.red + 1,
        green: this.state.green > 0 ? this.state.green - 1 : 0
      });
    } else {
      this.setState({
        red: this.state.red > 0 ? this.state.red - 1 : 0,
        green: this.state.green + 1
      });
    }
  }

  countActive(value, color, duble) {
    if (value) {
      this.setState({
        active: duble ? this.state.active : this.state.active + 1,
        [color]: this.state[color] + 1,
        [color == "green" ? "red" : "green"]: duble
          ? this.state[color == "green" ? "red" : "green"] - 1
          : this.state[color == "green" ? "red" : "green"]
      });
    } else {
      this.setState({
        active: this.state.active - 1,
        [color]: this.state[color] > 0 ? this.state[color] - 1 : 0
      });
    }
  }

  newBlock() {
    this.props.newBlock();
  }

  render() {
    const { blocks } = this.props;
    const { modal, red, green, active } = this.state;
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={4}>
            <InfoPanel
              active={active}
              red={red}
              green={green}
              all={blocks.length}
              newBlock={this.newBlock.bind(this)}
            />
          </Col>
          <Col sm={8}>
            <Row className="show-grid">
              {blocks.map((val, i) => (
                <Block
                  key={val.id}
                  info={val}
                  onDelete={this.deleteBlock.bind(this)}
                  editType={this.editType.bind(this)}
                  isColor={this.countColor.bind(this)}
                  isActive={this.countActive.bind(this)}
                />
              ))}
            </Row>
          </Col>
        </Row>
        {modal ? (
          <Modal show={true} bsSize="small" onHide={this.handleHide.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Вы уверены?</Modal.Title>
              <Button
                bsStyle="success"
                className="btn"
                onClick={this.deleteBlock.bind(this, modal)}
              >
                Да
              </Button>
              <Button
                className="btn"
                bsStyle="danger"
                onClick={this.handleHide.bind(this)}
              >
                Нет
              </Button>
            </Modal.Header>
          </Modal>
        ) : null}
      </Grid>
    );
  }
}

export default connect(
  state => ({
    blocks: state.indexState.blocks
  }),
  dispatch => ({
    deleteBlock: id => dispatch(deleteElement(id)),
    editBlock: id => dispatch(editElement(id)),
    newBlock: () => dispatch({ type: "NEW" })
  })
)(App);
