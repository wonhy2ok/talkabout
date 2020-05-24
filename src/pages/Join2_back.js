import React,{ Component } from "react";
import "../scss/Join2.scss";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

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

class Join2 extends Component {
  state = {
    isValid: false
  };
  
  //성명 & 이메일의 유효성 검사 결과 전달
  isFieldValid = () => {
    //현재 상태의 성명/이메일 유효성 검사 결과 받기
    const { isValid } = this.state;
    return isValid;
  }

  //유효성 검사 통과 후 버튼 활성화
  renderSubmitBtn = () => {
    console.log(this.isFieldValid());
    if (this.isFieldValid()) {
      return (
        <button className="btn btn-primary btn-block" onClick={e => this.callApi()}>
          Next Step
        </button>
      )
    } else {
      return (
        <div>
          잘못된 접근입니다.
        </div>
      )
    }
  }
  componentWillMount = async () => {
    console.log("qwer");
    axios.post('/api/chkUserPass', {userPass:this.props.location.search.split("=")[1]})
    .then( response => {
      console.log(response.data.length>0);
      if(response.data.length>0){
        this.setState({
          isVaild: true
        });
      }else {
        this.setState({
          isVaild: false
        });
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="Join2">
        {this.renderSubmitBtn()}
      </div>
    );
  }
}

export default (withStyles)(styles)(Join2);
