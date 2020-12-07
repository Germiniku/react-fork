import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions/counter';
class Counter extends Component {
    render() { 
        return ( 
            <div>
                <p>已经摸了{this.props.number}次</p>
                <button onClick={this.props.increment}>摸她</button>
                <button onClick={this.props.asyncIncrement}>等一秒再摸她</button>
                <button>不摸她</button>
            </div>
         );
    }
}
 
export default connect(state=>state.counter,actions)(Counter);