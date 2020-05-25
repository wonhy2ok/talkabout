import React,{ Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
    axios.post('/api/loginUser', {userEmail:this.state.id, userPass:this.state.pass})
    .then( response => {
      let loginError = "";
      console.log(response);
      switch(response.data){
        case "ERR01":
          loginError = "없는 사용자 계정입니다."; //에러 메시지
          this.setState({
            loginError
          });
          break;
        case "ERR02":
          loginError = "비밀번호를 확인해주세요."; //에러 메시지
          this.setState({
            loginError
          });
          break;
        case "ERR03":
          loginError = "인증을 진행해주세요."; //에러 메시지
          this.setState({
            loginError
          });
          break;
        default:
          window.sessionStorage.setItem('userId',response.data.userId);
          window.sessionStorage.setItem('userNm',response.data.userNm);
          window.sessionStorage.setItem('nick',response.data.nick);
          window.sessionStorage.setItem('userRole',response.data.userRole);
          window.sessionStorage.setItem('userState',response.data.userState);
          this.props.history.push("/home/chat");
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
            <div className="errLogin" id="domainInfo">{this.state.loginError}</div>
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
