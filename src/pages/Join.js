import React,{ Component } from "react";
import "../scss/Join.scss";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Container, Paper } from "@material-ui/core";

const styles = theme =>({
  card: {
    minWidth: 275
  },
  pos: {
    marginBottom: 12
  },
  tex: {
    width: 215,
    marginLeft: 10
  }
});

class Join extends Component {
  state = {
    nameEntered: '',
    isNameValid: false,
    emailEntered: '',
    isEmailValid: false,
    passwordEntered: '',
    isPasswordValid: false
  };
  //이름 유효성검사
  validateName = nameEntered => {
    const nameRegExp = /^[가-힣]{2,4}$/;
    if (nameEntered.match(nameRegExp)) {
      this.setState({
        isNameValid: true,
        nameEntered
      });
    } else {
      this.setState({
        isNameValid: false,
        nameEntered
      });
    }
  };
  //이메일 유효성검사
  validateEmail = emailEntered => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
  
    if (emailEntered.match(emailRegExp)) {
      this.setState({
        isEmailValid: true,
        emailEntered
      });
    } else {
      this.setState({
        isEmailValid: false,
        emailEntered
      });
    }
  };
  //비밀번호 유효성검사
  validatePassword = passwordEntered => {
    console.log(passwordEntered.length < 3);
    if (passwordEntered.length < 20 && passwordEntered.length >= 10) {
      this.setState({
        isPasswordValid: true,
        passwordEntered 
      });
    } else {
      this.setState({
        isPasswordValid: false,
        passwordEntered
      });
    }
  };

  //이름 검사결과 반영
  isEnteredNameValid = () => {
    const { nameEntered, isNameValid } = this.state;
  
    if (nameEntered) return isNameValid;
  };
  //이메일 검사결과 반영
  isEnteredEmailValid = () => {
    const { emailEntered, isEmailValid } = this.state;
  
    if (emailEntered) return isEmailValid;
  };
  //이메일 검사결과 반영
  isEnteredPasswordValid = () => {
    const { passwordEntered, isPasswordValid } = this.state;
  
    if (passwordEntered) return isPasswordValid;
  };
  inputClassNameHelper = boolean => {
    switch (boolean) {
      case true:
        return 'is-valid';
      case false:
        return 'is-invalid';
      default:
        return '';
    }
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api");
    const body = await response.json();
    return body;
  }
  render() {
    const {classes} = this.props;
    return (
      <div className="Join">
        <div className="Join-header">
          <div className="Join-contents">
            <Container fixed maxWidth="sm">
              <h2 className="Join-title">회원 가입 [ step : 1 ]</h2>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.pos}
                    color="textSecondary"
                    variant="h5"
                  >
                    Login Info
                  </Typography>
                  <form className="myForm">
                    <div className="form-group">
                      <label htmlFor="nameInput">이름</label>
                      <input
                        type="text"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredNameValid())}`}
                        id="nameInput"
                        placeholder="이름 입력"
                        onChange={e => this.validateName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailInput">아이디(이메일)</label>
                      <input
                        type="email"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredEmailValid())}`}
                        id="emailInput"
                        aria-describedby="emailHelp"
                        placeholder="abc@gmail.com"
                        onChange={e => this.validateEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passwordInput">비밀번호</label>
                      <input
                        type="password"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredPasswordValid())}`}
                        id="passwordInput"
                        placeholder="비밀번호 입력"
                        onChange={e => this.validatePassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Submit
                    </button>
                  </form>
                </CardContent>
              </Card>
              <br />
            </Container>
          </div>
        </div>
        <Paper>
        
      </Paper>
      </div>
    );
  }
}

export default (withStyles)(styles)(Join);
