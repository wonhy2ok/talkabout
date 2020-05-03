import React,{ Component } from "react";
import "../scss/App.scss";
import "../scss/Home.scss";
import { withStyles } from "@material-ui/core/styles";

const styles = theme =>({
});

class Home extends Component {
  render() {
  return (
    <div className="Home">
      <header className="Home-header">
        HOME
      </header>
    </div>
  );
  }
}

export default (withStyles)(styles)(Home);
