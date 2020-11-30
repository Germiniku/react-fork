import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.textInput = React.createRef();
  }
  handleFocus = () => {
    this.textInput.current.textInput.current.focus();
  }
  render(){
    return (
      <>
        <TextInput ref={this.textInput} />
        <button onClick={this.handleFocus}>focus</button>
      </>
    )
  }
}

function TextInput2(props,ref){
  return <input ref={ref}/>
}

let TextInput3 = React.forwardRef(TextInput2)

function createRef(){
  return {current: null};
}

function forwardRef(funcComponent){
  return function(props){ // {ref: {current: null}}
    return TextInput2(props,props.ref);
  }
}

class TextInput extends React.Component{
  constructor(props){
    super(props);
    this.textInput = React.createRef();
  }
  render(){
    return <input ref={this.textInput}/>
  }
}

ReactDOM.render(
    <Form />,
  document.getElementById('root')
);

