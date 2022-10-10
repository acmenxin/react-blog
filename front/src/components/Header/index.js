import { Component } from "react";
import {Link} from "react-router-dom"
import HeadeMenu from "./Menu";
class Header extends Component{
    render(){
        return(
            <div>
             <Link to="/" >左侧</Link>
             <HeadeMenu currentUser={null} />
            </div>
        )
    }
}
export default Header;