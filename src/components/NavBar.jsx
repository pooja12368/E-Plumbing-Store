import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../libs/request";

const { useState, useEffect } = require("react");

function NavBar() {
    const state = useSelector((state) => state);
    const [cats, setcats] = useState([]);
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const isLoggedIn = state.loggedin.IsLoggedIn;
    const role = state.loggedin.Role;
    const logout=()=>{
        dispatch({type:'LogOut'})        
        sessionStorage.clear();
        toast.success('logout successfully')
        setTimeout(() => {
          navigate('/')
       }, 1)
    }

    useEffect(() => {
        apiRequest
        .get("categories")
        .then((resp) => setcats(resp.data))
        .catch((error) => alert(error));
    }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark position-sticky mb-0"
        style={{ top: 0, zIndex: "1000",backgroundColor:"darkgreen" }}
      >
        <Link className="navbar-brand" to="#">
          E-Plumbing
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {cats
                  .filter((x) => x.isactive)
                  .map((x) => (
                    <Link key={x.id} className="dropdown-item" to={"/cats/" + x.id}>
                      {x.catname}
                    </Link>
                  ))}
              </div>
            </li>
            <ul className="navbar-nav ml-auto">
              {isLoggedIn ? (
                <>
                <li className="nav-item active">
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>
                </li>
                  {role === "Customer" ? (
                    <>
                      <li className="nav-item active">
                        <Link className="nav-link" to="/cart">
                          View Cart{" "}
                          {state.cart.length === 0 ? (
                            ""
                          ) : (
                            <span className="badge badge-primary p-2">
                              {state.cart
                                .map((x) => x.qty)
                                .reduce((a, b) => parseInt(a) + parseInt(b))}
                            </span>
                          )}
                        </Link>
                      </li>
                      
                      <li className="nav-item active">
                        <Link className="nav-link" to="/myorders">
                          My Orders
                        </Link>
                      </li>
                      
                    </>
                  ) : null}
                  {role === "admin" ? (
                    <>
                      <li className="nav-item active">
                        <Link className="nav-link" to="/categories">
                          Categories
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link" to="/products">
                          Products
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link" to="/customers">
                          Customers
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link" to="/orders">
                          Orders
                        </Link>
                      </li>
                    </>
                  ) : null}
                  <li className="nav-item active">
                    <Link className="nav-link" onClick={logout} to="#">
                        Logout
                    </Link>
                </li>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
