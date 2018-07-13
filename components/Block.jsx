import React from "react";
import { Col, Glyphicon } from "react-bootstrap";
let clicks = [];
let timeout;
class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      click: false,
      color: false,
      duble: false
    };
  }

  componentDidMount() {
    if (this.props.info.type == "complex") {
      if (this.props.info.id > 50) {
        this.setState({ color: "red" });
      } else {
        this.setState({ color: "green" });
      }
    }
  }

  handlerDelete(id, type, color) {
    this.props.onDelete({
      id: id,
      type: type,
      color: color,
      active: this.state.click
    });
  }

  handlerClick() {
    this.setState({
      click: !this.state.click
    });
    this.props.isActive(this.state.click, this.state.color);
  }

  doubleHandlerClick() {
    const { type, id } = this.props.info;
    if (type == "complex") {
      if (this.state.color == "red") {
        this.setState({ color: "green" });
      } else {
        this.setState({ color: "red" });
      }
    } else {
      if (id > 50) {
        this.setState({ color: "red" });
        this.props.editType(id);
      } else {
        this.setState({ color: "green" });
        this.props.editType(id);
      }
    }

    if (this.state.click) {
      this.props.isActive(this.state.click, this.state.color, true);
    }
  }

  clickHandler(event) {
    event.preventDefault();
    clicks.push(new Date().getTime());
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (
        clicks.length > 1 &&
        clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250
      ) {
        this.doubleHandlerClick();
      } else {
        this.handlerClick();
      }
    }, 250);
  }

  render() {
    const { text, type, id } = this.props.info;
    const { click, color } = this.state;
    return (
      <Col sm={4} xs={6}>
        <div
          className={`card ${color ? color : ""} ${click ? "click" : ""}`}
          onClick={this.clickHandler.bind(this)}
        >
          <p>{text}</p>
        </div>
        <Glyphicon
          onClick={this.handlerDelete.bind(this, id, type, color)}
          className="closeBtn"
          glyph="glyphicon glyphicon-remove"
        />
      </Col>
    );
  }
}

export default Block;
