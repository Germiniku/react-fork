import React from 'react';
import ReactDOM from 'react-dom';

// 非受控组件指的是DOM元素的值保存在DOM元素的内部中，不受React控制
// 受控组件指的是DOM元素的值受React状态控制
class Form extends React.Component{
  constructor(props){
    super(props);
    this.num = React.createRef();
    this.state = {number: ''};
  }
  add = () => {
    // console.log(this.num.current.value);
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      number: e.target.value,
    })
  }
  render(){
    return (
      <>
        {/* <input ref={this.num}></input> */}
        <input onChange={this.handleChange} value={this.state.number}/>
        <button onClick={this.add}>add</button>
      </>
    )
  }
}

ReactDOM.render(
    <Form />,
  document.getElementById('root')
);

