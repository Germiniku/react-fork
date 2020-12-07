import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/login'
class Login extends Component {
  constructor(props) {
    super(props)
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
  }
  login = () => {
    let username = this.usernameRef.current.value
    let password = this.passwordRef.current.value
    this.props.login(username, password)
  }
  logout = () => {
    this.props.logout()
  }
  render() {
    let loginForm = (
      <>
        <form>
          <label>用户名</label>
          <input ref={this.usernameRef} />
          <label ref={this.passwordRef}>密码</label>
          <input />
          <button onClick={this.login}>登陆</button>
        </form>
      </>
    )
    let logoutForm = (
      <>
        <form>
          <label>用户名{this.props.token}</label>
          <button onClick={this.logout}>退出</button>
        </form>
      </>
    )
    return this.props.token ? logoutForm : loginForm
  }
}

export default connect((state) => state.user, actions)(Login)
