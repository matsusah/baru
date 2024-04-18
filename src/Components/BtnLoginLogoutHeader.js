import React from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Pindahkan useNavigate ke sini

function BtnLoginHeader({ data_check_login }) {
  const navigate = useNavigate(); // Jika diperlukan, gunakan useNavigate di sini juga

  function logout () {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Apakah Anda Yakin Ingin Logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const MySwal = withReactContent(Swal);
        localStorage.removeItem("_token");
        localStorage.removeItem("_user");
        MySwal.fire({
          title: <strong>Berhasil Logout!</strong>,
          html: <p>Klik oke, dan kamu akan diarahkan ke halaman home</p>,
          icon: "success",
        }).then(() => {
          navigate("../");
          window.location.reload();
        });
      } else {
        MySwal.fire({
          title: <strong>Batal Logout</strong>,
          icon: "success",
        });
      }
    });
  }

  if (data_check_login === "true") {
    return (
      <div className="App">
        {/* Content Start */}
        <button type="button" className="btn btn-warning ms-md-3 fw-bold" onClick={logout}>Logout</button>
        {/* Content End */}
      </div>
    );
  } else if (data_check_login === "false") {
    return (
      <div className="App">
        {/* Content Start */}
        <button type="button" className="btn btn-warning ms-md-3 fw-bold" onClick={() => navigate("/login")}>Login</button>
        {/* Content End */}
      </div>
    );
  }
}

export default BtnLoginHeader;
