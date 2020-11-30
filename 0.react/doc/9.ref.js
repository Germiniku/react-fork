import React from 'react';
import ReactDOM from 'react-dom';

class Sum extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0,
    }
  }
  add = () => {
    let numA = this.numA.value;
    let numB = this.refs.numB.value;
    this.setState({value: parseFloat(numA)+parseFloat(numB)})
  }
  render(){
    return (
      <>
        <input ref={inst => this.numA = inst} />+
        <input ref="numB" />
        <button onClick={this.add}>=</button>
        <input ref="numC" value={this.state.value}/>
      </>
    )
  }
}

class Sum2 extends React.Component{
  constructor(props){
    super(props);
    this.numA = React.createRef();
    this.numB = React.createRef();
    this.result = React.createRef();    
  }
  add = () => {
    let numA = this.numA.current.value;
    let numB = this.numB.current.value;
    let result = parseFloat(numA)+parseFloat(numB);
    this.result.current.value = result;
  }
  render(){
    return (
      <>
        <input ref={this.numA} />+
        <input ref={this.numB} />
        <button onClick={this.add}>=</button>
        <input ref={this.result}/>
      </>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Sum2 />
  </React.StrictMode>,
  document.getElementById('root')
);

