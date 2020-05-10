import React,{ Component } from "react";
import "../scss/Join.scss";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Container } from "@material-ui/core";

const styles = theme =>({
  card: {
    minWidth: 275,
    fontFamily: 'NanumGothic'
  },
  pos: {
    marginBottom: 12
  },
  tex: {
    width: 215,
    marginLeft: 10
  }
});

/** regular expression **/
//공백체크
const blankRegExp = /[\s]/g;
//2~20자 완성형 유니코드 글자
const nameRegExp = /^[가-힣]{2,20}$/;
//이메일 정규표현식
const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

class Join extends Component {
  state = {
    nameEntered: '',
    isNameValid: false,
    emailEntered: '',
    isEmailValid: false
  };
  
  /**
   * 이름 유효성 검사
   * param nameEntered
   * @memberof Join
   */
  validateName = nameEntered => {
    let nameError = ""; //에러 메시지
    //2자 이상 20자 미만의 입력 여부 체크
    if (nameEntered.length >= 2 && nameEntered.length < 20) {
      //공백 여부 체크
      if(!nameEntered.match(blankRegExp)){
        //완성형 유니코드 글자 여부 체크
        if(nameEntered.match(nameRegExp)){
          nameError = "";
          this.setState({
            isNameValid: true,
            nameEntered, nameError
          });
        } else {
          nameError = "성명은 한글입력만 가능합니다.";
          this.setState({
            isNameValid: false,
            nameEntered, nameError
          });
        }
      }else {
        nameError = "공백이 포함되어 있습니다.";
        nameError.replace(/ /gi, "");
        this.setState({
          isNameValid: false,
          nameEntered, nameError
        });
      }
    } else {
      nameError = "성명은 2자 이상 20자 미만 입력입니다.";
      this.setState({
        isNameValid: false,
        nameEntered, nameError
      });
    }
  };
  /**
   * 이메일 유효성 검사
   * param emailEntered
   * @memberof Join
   */
  validateEmail = emailEntered => {
    let emailError = ""; //에러 메시지
    if(emailEntered.length !== 0){
      if(!emailEntered.match(blankRegExp)){
        if (emailEntered.match(emailRegExp)) {
          this.setState({
            isEmailValid: true,
            emailEntered, emailError
          });
        } else {
          emailError = "이메일을 확인해주시기 바랍니다.";
          this.setState({
            isEmailValid: false,
            emailEntered, emailError
          });
        }
      } else {
        emailError = "공백이 포함되어 있습니다.";
        this.setState({
          isEmailValid: false,
          emailEntered, emailError
        });
      }
    } else {
      emailError = "이메일을 입력받지 못했습니다.";
      this.setState({
        isEmailValid: false,
        emailEntered, emailError
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
  isEveryFieldValid = () => {
    const { isNameValid, isEmailValid } = this.state;
    return isNameValid && isEmailValid;
  }
  renderSubmitBtn = () => {
    if (this.isEveryFieldValid()) {
      return (
        <button type="submit" className="btn btn-primary btn-block">
          Next Step
        </button>
      )
    } else {
      return (
        <button type="submit" className="btn btn-primary btn-block" disabled>
          Next Step
        </button>
      )
    }
  }

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
                  <Typography className={classes.pos} color="textSecondary" variant="h5" >
                    User Info
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
                      <span id="nameInfo">{this.state.nameError}</span>
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
                      <span id="emailInfo">{this.state.emailError}</span>
                    </div>
                    {this.renderSubmitBtn()}
                  </form>
                </CardContent>
              </Card>
              <br />
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default (withStyles)(styles)(Join);
