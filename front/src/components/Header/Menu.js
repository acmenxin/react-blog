import {Link} from "react-router-dom"
import {memo} from "react" 
const HeadeMenu =memo( ({currentUser})=>{
    if (currentUser) {
        return(
            <ul>
             <li>
              <Link to="/">主页</Link>
             </li>
             <li>
              <Link to="/">写作</Link>
             </li>
             <li>
              <Link to="/">沸点</Link>
             </li>
            </ul>
        )
    } else {
        return(
            <ul>
            <li>
             <Link to="/">主页</Link>
            </li>
            <li>
             <Link to="/login">登录</Link>
            </li>
            <li>
             <Link to="/regist">注册</Link>
            </li>
           </ul>
        )
    }
})
export default HeadeMenu