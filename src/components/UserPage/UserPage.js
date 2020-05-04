import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class Users extends Component {
  render() {
    if (this.props.store.user.is_admin) {
      this.props.history.push("/admin");
    } else if (this.props.store.user.is_teacher) {
      this.props.history.push("/teacher");
    } else if (this.props.store.user.is_specials) {
      this.props.history.push("/specials");
    } else {
      this.props.history.push("/student");
    }
    return <div></div>;
  }
}

export default connect(mapStoreToProps)(Users);
