import React, { Component } from 'react';

// PhoneInfo : 각 전화번호 정보를 보여주는 컴포넌트
class PhoneInfo extends Component {
  // 부모로부터 받아오는 props 중에 info가 없을 때 뿌려줄 기본값
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }
  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px',
    }
    
    const { name, phone, id } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;