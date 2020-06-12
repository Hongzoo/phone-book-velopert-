import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

// PhoneInfoList : 여러개의 PhoneInfo 들을 보여주는 컴포넌트
class PhoneInfoList extends Component {
  // 부모로부터 받아오는 props 중에 data가 없을 때 뿌려줄 기본 값
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data; // 다음 받아올 data값이 현재 data 랑 다른 배열일 때(그러니까 수정이 있었을때) true 설정하게 함 (이렇게 간단하게 비교가 가능한건 불변성의 법칙을 지켜줬기 때문이야)
  }
  
  render() {
    console.log('render PhoneInfoList'); // App 컴포넌트의 상태가 업데이트 되면, 컴포넌트의 리렌더링이 발생하게 되고 -> 컴포넌트가 리렌더링되면 그 컴포넌트의 자식 컴포넌트도 리렌더링 됨. (App.js의 검색input 에 글씨를 쓸때마다 콘솔로그가 찍히는 걸 확인할 수 있음.) -> 실제로 변화는 없기 때문에 Virtual DOM에만 리렌더링 하겠지만 더 많은 데이터를 관리한다면 Virtual DOM에 렌더링 하는 자원도 아끼면 좋다. 그래서 위에 shouldComponentUpdate 를 추가한다.
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          key={ info.id }
          info={ info }
          onRemove= { onRemove } // 부모 컴포넌트?인 App에서 내려온 props.onRemove 를 자식인 PhoneInfo 컴포넌트에 그대로 전달~
          onUpdate = { onUpdate }
        />)
    ); // 부모 컴포넌트에서 props로 받아온 data 값을 가지고 map 메서드를 이용해 얻은 새배열을 list에 담는다.
    
    return (
      <div>
        { list }
      </div>
    );
  }
}

export default PhoneInfoList;