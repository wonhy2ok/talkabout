import React, { Component } from "react";
import axios from "axios";

class ChatTitle extends Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    this.state = { // 이 컴포넌트의 state 설정
      setKwrd: "-",
      setRelt: "-",
      setDate: "-"
    };
  };

  componentDidMount = async () => {
    //const { isValid } = this.state;
    axios.post('/api/srchTitle')
    .then( response => {
      console.log(response.data);
      const cntKwrd = response.data[0].cntKwrd;
      const cntKwDate = response.data[0].kwDate;
      let cntRelt = '';
      for(let i=0; i<response.data.length; i++){
        cntRelt += response.data[i].reltKwrd+', ';
      }
      this.setState({
        setKwrd:cntKwrd,
        setRelt:cntRelt.slice(0,-2),
        setDate:cntKwDate
      });
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <div>
        {this.state.setDate}자, 관심 키워드 : {this.state.setKwrd}
        </div>
        <div>
          <span>연관 키워드 : {this.state.setRelt}</span>
        </div>
      </div>
    );
  }
}

export default ChatTitle;
