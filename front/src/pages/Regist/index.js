import {PureComponent } from "react";
import {Link} from "react-router-dom"
class Regist extends PureComponent{
    render(){
        return(
            <div className="container page">
             <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
              <h1>注册</h1>
               {/* 调转到登录 */}
            <p className='text-xs-center'>
             <Link to='/login'>
                有账号直接登录?
            </Link>
             </p>
              <form>
               <fieldset>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户邮箱"
                />
               </fieldset>
               <fieldset>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户名称"
                />
               </fieldset>
               <fieldset>
                <input type="text" 
                  className="form-control form control-lg"
                  placeholder="用户密码"
                />
               </fieldset>
               <button className="btn btn-lg btn-promary pull-xs-right"
                 type="submit"
               >注册</button>
              </form>
              </div>
              </div>
            </div>
        )
    }
}
export default Regist