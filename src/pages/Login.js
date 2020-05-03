import React,{ Component } from "react";
import { Link } from "react-router-dom";
import "../scss/App.scss";
import "../scss/Login.scss";
import { withStyles } from "@material-ui/core/styles";
import {Button } from "@material-ui/core";

const styles = theme =>({
  logBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 43,
    padding: "0 45px"
  }
});

class Login extends Component {
  render() {
    const {classes} = this.props;
  return (
    <div className="Login">
      <header className="Login-header">
        <p>Talk About!!!!</p>
        <form className="lgnForm">
          <input
            type="text"
            className="form-control lgnText"
            id="passwordInput"
            placeholder="E-mail"
            required
          />
          <input
            type="password"
            className="form-control lgnText"
            id="passwordInput"
            placeholder="Password"
            required
          />
          <Button className={classes.logBtn} type="submit">Login</Button>
        </form>
        <p className="blk-small" >
          지금 talk about하세요.
          <Link className="btnJoin" to="/join">
            회원가입
          </Link>
        </p>
      </header>
    </div>
  );
  }
}

export default (withStyles)(styles)(Login);
