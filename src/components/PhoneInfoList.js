import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

// PhoneInfoList : 여러개의 PhoneInfo 들을 보여주는 컴포넌트
class PhoneInfoList extends Component {
  // 부모로부터 받아오는 props 중에 data가 없을 때 뿌려줄 기본 값
  static defaultProps = {
    data: []
  }
  
  render() {
    const { data } = this.props;
    const list = data.map(
      info => (<PhoneInfo key={ info.id } info={ info } />)
    ); // 부모 컴포넌트에서 props로 받아온 data 값을 가지고 map 메서드를 이용해 얻은 새배열을 list에 담는다.
    
    return (
      <div>
        { list }
      </div>
    );
  }
}

export default PhoneInfoList;