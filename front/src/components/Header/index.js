import { Component } from "react";
import {Link} from "react-router-dom"
import HeadeMenu from "./Menu";
class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-light">
            <div className="container">
            <div>
             <Link to="/" >MY-BLOG-版本1</Link>
             <HeadeMenu currentUser={this.props.currentUser} />
            </div>
            </div>
        </nav>
        )
    }
}
export default Header;