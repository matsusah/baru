import Header from "./../Components/Header";
import Footer from "./../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { get_api_register } from "../Utils/Utils";

function SignUp() {
  // left getter, rigth setter
  const [username, SetUsername] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();

  // Check is already login or not
  useEffect(() => {
    if (localStorage._token && localStorage._user) {
      navigate("../");
      console.log("Ada");
    }
  }, []);

  function signup(e) {
    e.preventDefault();
    if (password == "" || email == "" || username == '') {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <strong>Kesalahan Input</strong>,
        html: <i>Pastikan Input tidak kosong</i>,
        icon: 'error'
      })
      return false;
    }

    var Form = new FormData();
    Form.append("email", email);
    Form.append("password", password);
    Form.append("username", username);
    Form.append("edit", "false");
    Form.append("id", 0);

    fetch(get_api_register, {
      method: "POST",
      body: Form,
    })
      .then(
        (response) => {
          return response.json();
        }
      )
      .then((data) => {
        if (data.status == 'success') {
          const MySwal = withReactContent(Swal)
          localStorage.setItem("_token", data.data.token);
          localStorage.setItem("_user", JSON.stringify(data.data));
          MySwal.fire({
            title: <strong>{data.message}</strong>,
            html: <p>Klik oke, dan kita akan mengarahkan kamu ke halaman home</p>,
            icon: 'success'
          }).then(() => {
            navigate("../");
          })
        } else {
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            title: <strong>Error Di Bagian Server</strong>,
            html: <p>{data.message}</p>,
            icon: 'error'
          })
        }
      })
      .catch((error) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          title: <strong>Error Di Bagian Server</strong>,
          html: <p>{error.message}</p>,
          icon: 'error'
        })
      });
  }

  return (
    <div className="App">
      <Header />

      {/* Content Start */}
      <div className="wrapper-data container-fluid p-5 mt-5 mb-5">
        <div className="card w-25 mx-auto" style={{ minWidth: "270px" }}>
          <div className="card-body" style={{ backgroundColor: "F3F5F7" }}>
            <h2 className="card-title">SIGN UP</h2>
            <form className="mt-4 mb-4 form-sign-up">
              <div className="mb-3 text-start">
                <label htmlFor="username" className="form-label fw-bold">Username</label>
                <input type="text" className="form-control" id="username" value={username} onInput={(e) => { SetUsername(e.target.value) }} />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="username" className="form-label fw-bold">Email</label>
                <input type="email" className="form-control" id="email" value={email} onInput={(e) => { Setemail(e.target.value) }} />
              </div>
              <div className="mb-4 text-start">
                <label htmlFor="password" className="form-label fw-bold">Password</label>
                <input type="password" className="form-control" id="password" value={password} onInput={(e) => { Setpassword(e.target.value) }} />
              </div>

              <button type="submit" className="btn btn-dark d-block w-100 fw-bold" style={{ color: "#F7A600" }} onClick={(e) => { signup(e) }}>SIGN UP</button>

            </form>
            <span className="fw-bold" style={{ color: "#F7A600" }}>Already have account? <Link className="text-decoration-none text-dark fw-bold" to={"/login"}>LOGIN</Link></span>
          </div>
        </div>
      </div>
      {/* Content End */}


      <Footer />
    </div>
  );
}


export default SignUp;