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
  
  state = {
    editing: false,
    name: '',
    phone: '',
  }
  
  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id); // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
  }
  
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  }
  
  // input 에서 onChange 이벤트가 발생 될 때 호출되는 함수
  handleChange = (e) => {
    console.log('e.target', e.target);
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
    
    const { info, onUpdate } = this.props;
    
    if (!prevState.editing && this.state.editing) { // editing 값이 false -> true 로 전환 될 때
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }
    if (prevState.editing && !this.state.editing) { // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if (!this.state.editing && !nextState.editing && nextProps.info === this.props.info) {
      return false;
    }
    // 나머지 경우엔 리렌더링 함
    return true;
  }
  
  render() {
    console.log('render PhoneInfo' + this.props.info.id); // 이 내용이 콘솔에 찍히는 걸 보면, 검색시 이미 검색되어서 노출중인 애들은 두고 새로 노출할 애만 더 그려주면 되는데, 전체적으로 다 새로 렌더링 함을 볼 수 있었다. 그래서 shouldComponentUpdate 를 추가해서 최적화 해보겠다.
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px',
    }
    
    const { editing } = this.state;
    const { name, phone } = this.props.info;
    
    return (
      <div style={style}>
        {
          editing ? (
            <>
              <div>
                <input
                  name="name"
                  placeholder="이름"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div>
                <input
                  name="phone"
                  placeholder="전화번호"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>
            </>
          ) : (
            <>
              <div><b>{name}</b></div>
              <div>{phone}</div>
            </>
          )
        }
        <button onClick={this.handleToggleEdit}>
          { editing ? '적용' : '수정'}
        </button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;