import Header from "./../Components/Header";
import Footer from "./../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { get_api_index_campaign, get_public_url } from "../Utils/Utils";

function Campaign() {
  // left getter, rigth setter
  const [campaignApi, SetCampaignAPI] = useState("");
  const [status_aktif, SetStatusAktif] = useState("All");
  const navigate = useNavigate();
  const handleAll = () => SetStatusAktif("All");
  const handleExpired = () => SetStatusAktif("Expired");

  // Check is already login or not
  useEffect(() => {
    if (!localStorage._token && !localStorage._user) {
      navigate("/login");
    } else {
      getCampaign();
    }
  }, []);

  // data change base on setStatusChange
  useEffect(() => {
    getCampaign();
  }, [status_aktif]);

  // Get data dashboard from API
  function getCampaign() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("status_verified_campaign", status_aktif);

    fetch(get_api_index_campaign, {
      method: "POST",
      body: Form,
    })
      .then(
        (response) => {
          return response.json();
        }
      )
      .then((data) => {
        SetCampaignAPI(data);
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

  function SubMenuCampaignMain() {
    if (status_aktif == "All") {
      return (
        <div className="row container-sub-menu-main px-5 fw-bold" style={{ cursor: "pointer" }}>
          <div className="col-2 row rounded ms-3 mt-2" style={{ backgroundColor: "#D9D9D9" }}>
            <div className="col-6">
              <div className="container-all text-warning">All</div>
            </div>
            <div className="col-6">
              <div className="container-expired text-dark-emphasis" onClick={handleExpired}>Expired</div>
            </div>
          </div>
          <div className="col-10"></div>
        </div>
      );
    } else {
      return (
        <div className="row container-sub-menu-main px-5 fw-bold" style={{ cursor: "pointer" }}>
          <div className="col-2 row rounded ms-3 mt-2" style={{ backgroundColor: "#D9D9D9" }}>
            <div className="col-6">
              <div className="container-all text-dark-emphasis" onClick={handleAll}>All</div>
            </div>
            <div className="col-6">
              <div className="container-expired text-warning">Expired</div>
            </div>
          </div>
          <div className="col-10"></div>
        </div>
      );
    }
  }

  function ContentCard() {
    if (campaignApi && campaignApi.status == "success") {
      return campaignApi.data.map((value, index) => {
        return (
          <div className="col-md-4 col-sm-6 col-12 d-flex justify-content-center p-5" key={index}>
            <div className="card bg-dark rounded-4" style={{ width: "25rem" }}>
              <div className="p-3">
                <img src={`${get_public_url}/uploads/picture_campaign/${value.picture}`} className="card-img-top image-campaign-main rounded" alt="*Gambar Campaign" />
              </div>
              <div className="card-body">
                <h5 className="card-title text-white card-title-main-campaign text-center">{value.title_campaign}</h5>
                <div className="container-fluid p-0 mt-3">
                  <button type="submit" className="btn btn-light d-block w-100 fw-bold" style={{ color: "#F7A600" }} onClick={(e) => { navigate("/campaign/detail/" + value.id_campaign) }}>Detail Campaign</button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="px-5 fw-bold text-center" style={{ cursor: "pointer" }}>
          Tidak ada data campaign
        </div>
      );
    }
  }

  return (
    <div className="App">
      <Header />

      {/* Content Start */}
      <div className="container-fluid bg-white text-start mt-4" style={{ minHeight: "100vh" }}>
        <div className="col-md-12 col-sm-12 px-1">
          <h2 className="mx-5 fw-bold">
            Campaign
          </h2>
          <SubMenuCampaignMain />
        </div>

        {/* Content Card */}
        <div className="row px-5">
          <ContentCard />
        </div>
      </div>

      {/* Content End */}


      <Footer />
    </div>
  );
}

export default Campaign;
