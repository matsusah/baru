import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BtnLoginHeader from "./BtnLoginLogoutHeader";

function Header() {
  // Deklarasi Navigate
  const [check_login, setCheckLogin] = useState(["false", "Logout", ""]);

  // Cek login logout
  useEffect(() => {
    if (localStorage._token && localStorage._user) {
      setCheckLogin("true");
    } else {
      setCheckLogin("false");
    }
  }, [check_login]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#121214" }}>
      <div className="container-fluid mx-5">
        <a className="navbar-brand fs-3 fw-bold px-2">Airdrop4Bucks</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4 fs-5">
            <li className="nav-item">
              <Link className="nav-link active" to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/guide"}>Guide</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/faq"}>FAQ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/campaign"}>Airdrop Campaign</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/announcement"}>Announcement</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <BtnLoginHeader data_check_login={check_login} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
