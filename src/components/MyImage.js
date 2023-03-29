import React, { Component } from "react";
import "../css/figure-card.css";

class MyImage extends Component {
  render() {
    return (
      <>
        <img
          src={this.props.imageUrl}
          alt={this.props.imageDescription}
          title={this.props.imageDescription}
          className="figure-img"
        />
      </>
    );
  }
}

export default MyImage;
