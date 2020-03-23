import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  
  /**
   * id값은 왜 state 에 안넣어줘요?
   * id 값은 렌더링 되는 값이 아니기 때문에 굳이 state에 넣어줄 필요가 없다
   * setState를 하는 이유는 어떤 값이 수정되었을 때 꼭 re-rendering을 하기 위함인데
   * id값은 렌더링과 별 관련이 없기 때문이다...
   */
  id = 2;
  
  state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ],
  }
  
  handleCreate = (data) => {
    console.log('data', data);
    const { information } = this.state;
    this.setState({
      /**
       * 배열 메서드 concat() 을 쓰는 이유 :
       * 불변성을 유지해줘야 하기때문에, 내부의 객체나 배열을 수정하게 될 때
       * 기존의 객체나 배열을 수정하는게 아니라
       * 그것을 기반으로 새로운 객체나 배열을 만든 후에 값을 다시 주입해줘야 한다...
       */
      information: information.concat({ // information 이라는 것과 concat() 메서드의 인자를 합쳐서 새로운 배열을 반환함
        id: this.id++,
        ...data
      })
    });
  }
  
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }
  
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? {...info, ...data} // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : info // 바꿀 필요 없는것들은 그냥 기존 값 사용
      )
    })
  }
  
  render() {
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <PhoneInfoList 
          data={ this.state.information }
          onRemove={ this.handleRemove }
          onUpdate={ this.handleUpdate }
        />
      </div>
    );
  }
}

export default App;
