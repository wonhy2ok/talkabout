import React,{ Component } from "react";
import "../scss/Join.scss";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Container } from "@material-ui/core";
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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
const emailRegExp = /^[a-z0-9_-]{2,20}$/;
//이메일 정규표현식
const domainRegExp = /^([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
//const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
//비밀번호 정규표현식
//const passRegExp = /[0-9a-z]/;
//닉네임 정규표현식
const nickRegExp = /^[가-힣0-9a-zA-Z_-]+$/;
//연락처 정규표현식
const contactRegExp = /^[0-9]+$/;

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: true,
      date: props.initialDate,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }
  onDateChange(date) {
    date = date.format('YYYY-MM-DD');
    this.setState({ date });
  }

  onFocusChange() {
    this.setState({ focused: true });
  }

  state = {
    nameEntered: '', //사용자 성명 입력
    isNameValid: false, //성명 검사결과
    emailEntered: '', //사용자 이메일 입력
    isEmailValid: false, //이메일 검사결과
    passEntered: '', //사용자 비밀번호 입력
    isPassValid: false, //비밀번호 검사결과
    psChkEntered: '', //사용자 비번 재확인 입력
    isPsChkValid: false, //비번 재확인 검사결과
    nickEntered: '', //사용자 닉네임 입력
    isNickValid: false, //닉네임 검사결과
    birthEntered: '', //사용자 생년월일 입력
    isBirthValid: false, //생년월일 검사결과
    contactEntered: '', //사용자 연락처 입력
    isContactValid: false, //연락처 검사결과
    domainEntered:'',
    isDomainValid: false,
    useDomainValid:false
  };
  
  /**
   * 이름 유효성 검사
   * param nameEntered
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
   */
  validateEmail = emailEntered => {
    let emailError = ""; //에러 메시지
    if(emailEntered.length !== 0){
      if(!emailEntered.match(blankRegExp)){
        if (emailEntered.match(emailRegExp)) {
          emailError = "";
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
  /**
   * 이메일 유효성 검사
   * param emailEntered
   */
  validateDomain = domainEntered => {
    let domainError = ""; //에러 메시지
    if(domainEntered.length !== 0){
      if(!domainEntered.match(blankRegExp)){
        if (domainEntered.match(domainRegExp)) {
          domainError = "";
          this.setState({
            isDomainValid: true,
            domainEntered, domainError
          });
        }else {
          domainError = "도메인을 확인하여 주시기 바랍니다.";
        this.setState({
          isDomainValid: false,
          domainEntered, domainError
        });
        }
      }else {
        domainError = "공백이 포함되어 있습니다.";
      this.setState({
        isDomainValid: false,
        domainEntered, domainError
      });
      }
    }else {
      domainError = "도메인을 입력받지 못했습니다.";
      this.setState({
        isDomainValid: false,
        domainEntered, domainError
      });
    }
  }
  /**
   * 비밀번호 유효성 검사
   * param passEntered
   */
  validatePass = passEntered => {
    //소문자 정규표현식
    const smParRegExp = new RegExp(/[a-z]/);
    //숫자 정규표현식
    const digParRegExp = new RegExp(/[0-9]/);
    //대문자 정규표현식
    const bidParRegExp = new RegExp(/[A-Z]/);
    //특수문자 정규표현식
    const speParRegExp = new RegExp(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);

    let passError = ""; //에러 메시지
    if(passEntered.length >= 10 && passEntered.length <20 ){
      if(!passEntered.match(blankRegExp)){
        if (smParRegExp.test(passEntered) && digParRegExp.test(passEntered)) {
          if(bidParRegExp.test(passEntered) && speParRegExp.test(passEntered)){
            passError = "보안등급 상";
          }else if(smParRegExp.test(passEntered) && digParRegExp.test(passEntered) && (bidParRegExp.test(passEntered) || speParRegExp.test(passEntered))){
            passError = "보안등급 중";
          }else { 
            passError = "보안등급 하";
          }
          this.setState({
            isPassValid: true,
            passEntered, passError
          });
        }else {
          passError = "비밀번호는 소문자&숫자 입력이 필수입니다.";
          this.setState({
            isPassValid: false,
            passEntered, passError
          });
        }
      }else {
        passError = "공백을 입력받았습니다.";
        this.setState({
          isPassValid: false,
          passEntered, passError
        });
      }
    }else {
      passError = "비밀번호는 10자 이상 20자 미만입니다.";
      this.setState({
        isPassValid: false,
        passEntered, passError
      });
    }
  }
  /**
   * 비번 재확인 유효성 검사
   * param psChkEntered
   */
  validatePsChk = psChkEntered => {
    const { passEntered } = this.state;
    let psChkError = ""; //에러 메시지
    console.log(psChkEntered, passEntered);
    if(psChkEntered===passEntered){
      psChkError = "";
      this.setState({
        isPsChkValid: true,
        psChkEntered, psChkError
      });
    }else {
      psChkError = "불일치 합니다";
      this.setState({
        isPsChkValid: false,
        psChkEntered, psChkError
      });
    }
  }
  /**
   * 닉네임 유효성 검사
   * param nickEntered
   */
  validateNick = nickEntered => {
    let nickError = ""; //에러 메시지
    if(nickEntered.length >= 5 && nickEntered.length < 15){
      if(!nickEntered.match(blankRegExp)){
        if (nickEntered.match(nickRegExp)) {
          nickError = "";
          this.setState({
            isNickValid: true,
            nickEntered, nickError
          });
        }else {
          nickError = "한글, 대/소문자, 숫자, 특수문자(_, -)만 입력가능합니다.";
          this.setState({
            isNickValid: false,
            nickEntered, nickError
          });
        }
      }else {
        nickError = "공백을 입력받았습니다.";
        this.setState({
          isNickValid: false,
          nickEntered, nickError
        });
      }
    }else {
      nickError = "닉네임은 5자 이상 15자 미만입니다.";
      this.setState({
        isNickValid: false,
        nickEntered, nickError
      });
    }
  }
  /**
   * 연락처 유효성 검사
   * param contactEntered
   */
  validateContact = contactEntered => {
    let contactError = ""; //에러 메시지
    if(contactEntered.length >=9 && contactEntered.length < 12){
      if(!contactEntered.match(blankRegExp)){
        if (contactEntered.match(contactRegExp)) {
          contactError = "";
          this.setState({
            isContactValid: true,
            contactEntered, contactError
          });
        }else {
          contactError = "특수문자를 제외한 숫자만 입력해주세요.";
          this.setState({
            isContactValid: false,
            contactEntered, contactError
          });
        }
      }else {
        contactError = "공백을 입력받았습니다.";
        this.setState({
          isContactValid: false,
          contactEntered, contactError
        });
      }
    }else {
      contactError = "연락처 입력을 확인해 주시기 바랍니다.";
      this.setState({
        isContactValid: false,
        contactEntered, contactError
      });
    }
  }
  /**
   * 생년월일 유효성 검사
   * param contactEntered
   */
  validateBirth = birthEntered => {
    let birthError = ""; //에러 메시지
    if(birthEntered.length !== 0){
      this.setState({
        isBirthValid: false,
        birthEntered, birthError
      });
    }else {

    }
  }
  //도메인 변경시 결과 반영
  isSelectEmail = (vaild) => {
    const domainEntered = this.state.domainEntered;
    console.log(vaild);
    if(vaild !== '기타'){
      this.setState({
        domainEntered: vaild,
        useDomainValid: true
      });
    }else {
      this.setState({
        domainEntered: domainEntered,
        useDomainValid: false
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
  //도메인 검사결과 반영
  isEnteredDomainValid = () => {
    const { domainEntered, isDomainValid } = this.state;
    if (domainEntered) return isDomainValid;
  };
  //비밀번호 검사결과 반영
  isEnteredPassValid = () => {
    const { passEntered, isPassValid } = this.state;
    if (passEntered) return isPassValid;
  };
  //비번 재입력 검사결과 반영
  isEnteredPsChkValid = () => {
    const { psChkEntered, isPsChkValid } = this.state;
    if (psChkEntered) return isPsChkValid;
  };
  //닉네임 검사결과 반영
  isEnteredNickValid = () => {
    const { nickEntered, isNickValid } = this.state;
    if (nickEntered) return isNickValid;
  };
  //연락처 검사결과 반영
  isEnteredContactValid = () => {
    const { contactEntered, isContactValid } = this.state;
    if (contactEntered) return isContactValid;
  };
  //생년월일 검사결과 반영
  isEnteredBirthValid = () => {
    const { birthEntered, isBirthValid } = this.state;
    if (birthEntered) return isBirthValid;
  };
  //유효성 검사 결과 css 반영
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

  //성명 & 이메일의 유효성 검사 결과 전달
  isEveryFieldValid = () => {
    //현재 상태의 성명/이메일 유효성 검사 결과 받기
    const { isNameValid, isEmailValid, isPassValid, isPsChkValid, isNickValid, isContactValid } = this.state;
    return isNameValid && isEmailValid && isPassValid && isPsChkValid && isNickValid && isContactValid;
  }

  //유효성 검사 통과 후 버튼 활성화
  renderSubmitBtn = () => {
    if (this.isEveryFieldValid()) {
      return (
        <button className="btn btn-primary btn-block" onClick={e => this.callApi()}>
          메일 발송
        </button>
      )
    } else {
      return (
        <button className="btn btn-primary btn-block" disabled>
          모두 입력해주세요
        </button>
      )
    }
  }

  //api 요청을 통한 메일 발송
  callApi = async () => {
    axios.post('/api/insUserCtfInfo', {userName:this.state.nameEntered,
                                      userEmail:this.state.emailEntered+'@'+this.state.domainEntered,
                                      userPass:this.state.passEntered,
                                      userNick:this.state.nickEntered,
                                      userBirth:this.state.date,
                                      userContact:this.state.contactEntered})
    .then( response => {
      console.log(response);
      if(response.data === "stat01"){
        alert("이미 있는 계정입니다");
      }else if(response.data === "stat02"){
        alert("메일 발송 성공");
      }else {
        alert("메일 발송 실패");
      }
      
    })
    .catch(err => console.log(err));
  }

  render() {
    const { focused, date } = this.state;
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
                    <div className="form-group">
                      <div><label htmlFor="emailInput">아이디(이메일)</label></div>
                      <input
                        type="email"
                        className={`form-control form-input ${this.inputClassNameHelper(this.isEnteredEmailValid())}`}
                        id="emailInput"
                        aria-describedby="emailHelp"
                        placeholder="아이디 입력"
                        onChange={e => this.validateEmail(e.target.value)}
                        required
                      /> 
                      <div className="form-span">@</div>
                      <input
                        type="email"
                        className={`form-control form-input ${this.inputClassNameHelper(this.isEnteredDomainValid())}`}
                        id="domainInput"
                        placeholder="기타 선택시 작성"
                        onChange={e => this.validateDomain(e.target.value)}
                        readOnly={this.state.useDomainValid}
                        value={this.state.domainEntered}
                        required
                      />
                      <select class="form-control form-input"
                        onChange={e => this.isSelectEmail(e.target.value)}>
                          <option>naver.com</option>
                          <option>daum.net</option>
                          <option>gmail.com</option>
                          <option>yahoo.co.kr</option>
                          <option>hotmail.net</option>
                          <option selected>기타</option>
                        </select>
                      <span id="emailInfo">{this.state.emailError}</span>
                      <span id="domainInfo">{this.state.domainError}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="passInput">비밀번호</label>
                      <input
                        type="password"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredPassValid())}`}
                        id="passInput"
                        onChange={e => this.validatePass(e.target.value)}
                        required
                      />
                      <span id="passInfo">{this.state.passError}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="psChkInput">비밀번호 재확인</label>
                      <input
                        type="password"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredPsChkValid())}`}
                        id="psChkInput"
                        onChange={e => this.validatePsChk(e.target.value)}
                        required
                      />
                      <span id="psChkInfo">{this.state.psChkError}</span>
                    </div>
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
                      <label htmlFor="nickInput">닉네임</label>
                      <input
                        type="text"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredNickValid())}`}
                        id="nickInput"
                        placeholder="5~15자의 한글, 대/소문자, 숫자, 특수문자(_, -)만 입력가능"
                        onChange={e => this.validateNick(e.target.value)}
                        required
                      />
                      <span id="nickInfo">{this.state.nickError}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthInput">생년월일</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${this.inputClassNameHelper(this.isEnteredBirthValid())}`}
                          id="birthInput"
                          placeholder=""
                          value={this.state.date}
                          readOnly="true"
                          required
                        />
                      </div>
                      <span id="birthInfo">{this.state.birthError}</span>
                      <DayPickerSingleDateController
                        onDateChange={this.onDateChange}
                        onFocusChange={this.onFocusChange}
                        focused={focused}
                        date={date}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactInput">연락처</label>
                      <input
                        type="text"
                        className={`form-control ${this.inputClassNameHelper(this.isEnteredContactValid())}`}
                        id="contactInput"
                        placeholder="숫자로만 입력바랍니다"
                        onChange={e => this.validateContact(e.target.value)}
                        required
                      />
                      <span id="contactInfo">{this.state.contactError}</span>
                    </div>
                    {this.renderSubmitBtn()}
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
