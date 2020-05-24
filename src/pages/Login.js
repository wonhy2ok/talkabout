import React,{ Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../scss/App.scss";
import "../scss/Login.scss";
import { withStyles } from "@material-ui/core/styles";
import {Button } from "@material-ui/core";
import Router from "next/router";

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
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pass: ''
    };
  }
  idChange = (e) => {
    this.setState({
      id: e.target.value
    })
  }
  passChange = (e) => {
    this.setState({
      pass: e.target.value
    })
  }
  
  //api 요청을 통한 메일 발송
  callApi = async (history) => {
    axios.post('/api/loginUser', {userId:this.state.id, userPass:this.state.pass})
    .then( response => {
      console.log(response);
      if(response.data){
        this.props.history.push("/home");
      }else{
        alert("로그인 실패");
      }
      
    })
    .catch(err => console.log(err));
  }
  render() {
    const {classes} = this.props;
    
    return (
      <div className="Login">
        <header className="Login-header">
          <p>Talk About</p>
          <form className="lgnForm">
            <input
              type="text"
              className="form-control lgnText"
              id="passwordInput"
              placeholder="E-mail"
              value={this.state.id}
              onChange={this.idChange}
              required
            />
            <input
              type="password"
              className="form-control lgnText"
              id="passwordInput"
              placeholder="Password"
              value={this.state.pass}
              onChange={this.passChange}
              required
            />
            <Button className={classes.logBtn} onClick={e => this.callApi()}>Login</Button>
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
