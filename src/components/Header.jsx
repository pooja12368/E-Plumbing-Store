import { useSelector } from "react-redux";

function Header(){
    const state=useSelector((state)=>state);
    return (
        <div className="jumbotron p-3 mb-0 rounded-0 bg-transparent text-white">
            <img src={'/shop.jpg'} style={{width:"100px"}} alt="logo" className="float-left"/>
            {state.loggedin.IsLoggedIn ?
            <>                        
            <h5 className="float-right">Welcome ! {state.loggedin.Username}</h5> </>:
            ''}
            <h4 className="text-center">Welcome to E-Plumbing Website</h4>
            <div className="clearfix"></div>
        </div>
    )
}

export default Header;