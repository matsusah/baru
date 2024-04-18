import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { get_api_detail_campaign, get_api_detail_announcement, get_api_store_comment_campaign, get_public_url } from "../Utils/Utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DetailAnnouncement() {
  const data_params = useParams();
  const [detailAnnouncementApi, setDetailAnnouncementApi] = useState([]);
  const navigate = useNavigate();

  // Check is already login or not
  useEffect(() => {
    if (!localStorage._token && !localStorage._user) {
      navigate("/login");
    } else {
      getDetailAnnouncement();
    }
  }, []);



  function CardAndButton({ data }) {
    return (
      <div className="wrapper-data mt-5 mb-5" key={data.id_announcement}>
        <h1 className="fw-bold">{data.title_announcement}</h1>
        <p className="text-start mt-3">{data.tanggal_buat_announcement}</p>
        <pre class="fs-5 container-text-wrapping text-start">{data.description_announcement}</pre>
      </div>
    );
  }


  function ContentDetailAnnouncement() {
    if (detailAnnouncementApi && detailAnnouncementApi.status == "success") {
      // Map Table
      return (
        <div className="container-fluid">
          <CardAndButton data={detailAnnouncementApi.data} />
        </div>
      );
    } else {
      // Map Table
      return (
        <div className="wrapper-data mt-5">
          <h1 className="mx-auto">Tidak Ada Data</h1>
        </div>
      );
    }
  }

  // Get data dashboard from API
  function getDetailAnnouncement() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("id_announcement", data_params.id_announcement);

    fetch(get_api_detail_announcement, {
      method: "POST",
      body: Form,
    })
      .then(
        (response) => {
          return response.json();
        }
      )
      .then((data) => {
        if (data.status == true) {
          setDetailAnnouncementApi(data);
        } else {
          setDetailAnnouncementApi(data);
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
      <div className="container-fluid bg-white px-5" style={{ minHeight: "90vh", maxWidth: "1000px" }}>
        <ContentDetailAnnouncement />
      </div>
      {/* Content End */}


      <Footer />
    </div>
  );
}

export default DetailAnnouncement;