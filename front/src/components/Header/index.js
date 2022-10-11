import { Component } from "react";
import {Link} from "react-router-dom"
import HeadeMenu from "./Menu";
class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-light">
            <div className="container">
            <div>
             <Link to="/" >左侧</Link>
             <HeadeMenu currentUser={null} />
            </div>
            </div>
        </nav>
        )
    }
}
export default Header;