import { PureComponent } from 'react'
import { connect } from 'react-redux';
import * as action from '../../actions/user'
import { Link } from 'react-router-dom'
import Errors from '../../components/Errors'
import SetForm from './setForm';
import {store} from '../../store'
import {replace,push} from 'connected-react-router'


/**
 * 设置
 * 条件：登录 / 自己编辑自己用户信息
 * 用户信息：从store user
 * 
 * 01 获取用户信息
 * 02 用户信息回显
 */

class Setting extends PureComponent {
  render() {
    return (
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>设置</h1>

            {/* 错误显示 */}
            <Errors errors={this.props.errors} />

            {/* 设置form */}
            <SetForm />

            {/* 退出按钮 */}
            {/* <hr /> */}
            <button
              className='btn btn-outline-danger'
              onClick={this.props.onClickLogout}
            >
              退出
            </button>
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate(preProps){
    if(this.props.redirect && this.props.redirect!==preProps.redirect){
      store.dispatch(replace(this.props.redirect))
    }
  }
}
const mapState = state => ({ 
  ...state.user
})
const mapDispatch = dispatch => {
  return {
    onUnload: () => dispatch(action.unload()),
    onClickLogout: () => dispatch(action.logout()) //退出
  }
}
export default connect(mapState, mapDispatch)(Setting)