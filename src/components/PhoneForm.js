import React, { Component } from "react";

class PhoneForm extends Component {
  state = {
    name: "",
    phone: "",
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    // 이거랑
    // this.props.onCreate({
    //   name: this.state.name,
    //   phone: this.state.phone,
    // });
    // 이거랑 같다
    this.props.onCreate(this.state); // App.js 에서 <PhoneForm />에 onCreate props로 넘겨준 함수를 실행하는건데 this.state 값을 넘겨주는거지
    
    // submit 버튼 누르면 input 값 초기화 시키기
    this.setState({
      name: "",
      phone: ""
    })
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          name="phone"
          placeholder="전화번호"
          onChange={this.handleChange}
          value={this.state.phone}
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;