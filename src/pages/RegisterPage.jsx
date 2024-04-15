import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../libs/request";
import uservalidation from "../validations/uservalidation";

export default function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    city: "",
    userid: "",
    pwd: "",
    cpwd: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(uservalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      apiRequest
        .post("customers", user)
        .then((resp) => {
          console.log(resp);
          toast.success("Customer registered successfully");
          navigate("/login");
        })
        .catch((error) => console.log("Error", error));
    }
  }, [errors]);
  return (
    <div className="container">
      <div className="card shadow bg-transparent mt-3 text-white">
        <div
          className="card-body"
          style={{
            backgroundImage: "url('assets/bglogin.jpg')",
            backgroundSize: "100% 100%",
            height: "80vh",
          }}
        >
          <div className="row">
            <div className="col-sm-7 mx-auto">
              <h4 className="text-center p-2 my-3">Customer Registration</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input
                        type="text"
                        placeholder="Customer Name"
                        name="name"
                        value={user.name}
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.name && (
                        <small className="text-danger float-right">
                          {errors.name}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.city && (
                        <small className="text-danger float-right">
                          {errors.city}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={user.gender}
                        onChange={handleInput}
                        className="form-control"
                      >
                        <option value="">Select Gender</option> /option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                      {errors.gender && (
                        <small className="text-danger float-right">
                          {errors.gender}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    maxLength="10"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    className="form-control"
                  />
                  {errors.phone && (
                    <small className="text-danger float-right">
                      {errors.phone}
                    </small>
                  )}
                </div>
                  </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                    <div className="form-group">
                      <label>User Id</label>
                      <input
                        type="text"
                        name="userid"
                        value={user.userid}
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.userid && (
                        <small className="text-danger float-right">
                          {errors.userid}
                        </small>
                      )}
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="pwd"
                    value={user.pwd}
                    onChange={handleInput}
                    className="form-control"
                  />
                  {errors.pwd && (
                    <small className="text-danger float-right">
                      {errors.pwd}
                    </small>
                  )}
                </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-6">
                    <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="cpwd"
                    value={user.cpwd}
                    onChange={handleInput}
                    className="form-control"
                  />
                  {errors.cpwd && (
                    <small className="text-danger float-right">
                      {errors.cpwd}
                    </small>
                  )}
                </div>
                    </div>
                </div>
                
                <button className="btn btn-primary float-right">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
