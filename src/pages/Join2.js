import React,{ Component } from "react";
import { Link } from "react-router-dom";
import "../scss/Join2.scss";
import axios from "axios";

class Join2 extends Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    this.state = { // 이 컴포넌트의 state 설정
      isValid: "NO"
    };
  };
  
  //성명 & 이메일의 유효성 검사 결과 전달
  isFieldValid = () => {
    //현재 상태의 성명/이메일 유효성 검사 결과 받기
    const { isValid } = this.state;
    console.log(isValid);
    return isValid;
  }

  

  componentDidMount = async () => {
    console.log("component did mount");
    //const { isValid } = this.state;
    axios.post('/api/chkUserPass', {userPass:this.props.location.search.split("=")[1]})
    .then( response => {
      if(response.data.length>0){
        console.log(response.data.length>0);
        this.setState({
          isVaild: 
          <div>인증되었습니다! Next step을 누르시면 로그인 화면으로 이동합니다.
              <button className="btn btn-primary btn-block">
                <Link className="btn-step2" to="/login">Next Step</Link>
              </button>
          </div>
        });
      }else {
        this.setState({
          isVaild: 
          <div>
            정체가 무엇입니까?
          </div>
        });
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    
    console.log("렌더링 시작");
    return (
      <div className="Join2">
        Stap 2
        <div className="stap2">{this.state.isVaild}</div>
      </div>
    );
  }
}

export default Join2;
