import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { get_api_detail_review, get_api_update_verified_status, get_public_url, mainUrl } from "../Utils/Utils";

function DetailReview() {
  const data_params = useParams();
  const [detailReviewApi, setDetailReviewApi] = useState([]);
  const navigate = useNavigate();

  // Check is already login or not
  useEffect(() => {
    if (!localStorage._token && !localStorage._user) {
      navigate("/login");
    } else {
      getDetailReview();
    }
  }, []);


  function ubahStatus(id, status_ubah) {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("id_campaign", id);
    Form.append("status_verified_campaign", status_ubah);


    fetch(get_api_update_verified_status, {
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
          MySwal.fire({
            title: <strong>{data.message}</strong>,
            html: <p>Klik Oke, Modal Akan Tertutup</p>,
            icon: 'success'
          }).then(() => {
            window.location.reload();
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


  function CardAndButton({ data }) {
    if (data.status_verified_campaign == "Pending") {
      return (
        <div className="wrapper-data mt-5 mb-5" key={data.id_campaign}>
          <div className="form border-none">
            <div className="card-body p-0">
              <img src={`${get_public_url}/uploads/picture_campaign/${data.picture}`} className="img-fluid rounded" />
            </div>
          </div>
          <div className="card mt-4 px-5 pb-4" style={{ backgroundColor: "#ffffff" }}>
            <div className="card-body py-4">
              <h2 className="card-title mb-4">{data.title_campaign}</h2>
              <p className="card-text fs-5 text-start">{data.description_campaign}</p>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="d-grid gap-2 mt-5 col-6 mx-auto">
                <button className="btn btn-success fw-bold" type="button" onClick={() => ubahStatus(data.id_campaign, 'Accepted')}>Accepted</button>
              </div>
              <div className="d-grid gap-2 mt-5 col-6 mx-auto">
                <button className="btn btn-danger fw-bold" type="button" onClick={() => ubahStatus(data.id_campaign, 'Declined')}>Declined</button>
              </div>
            </div>
          </div>


        </div>
      );
    }
    // else {
    //   return (
    //     <div className="wrapper-data mt-5 mb-5" key={data.id_campaign}>
    //       <div className="form border-none"> {/*mengubah card menjadi form agar tidak ada border */}
    //         <div className="card-body p-0">
    //           <img src={`${get_public_url}/uploads/picture_campaign/${data.picture}`} className="img-fluid rounded" />
    //         </div>
    //       </div>
    //       <div className="card mt-4 px-5 pb-4" style={{ backgroundColor: "#ffffff" }}>
    //         <div className="card-body py-4">
    //           <h2 className="card-title mb-4">{data.title_campaign}</h2>
    //           <p className="card-text fs-5 text-start">{data.description_campaign}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // } Detail Campaign yang telah di acc/dec akan tetap ditampilkan
  }

  function ContentDetailReview() {
    if (detailReviewApi && detailReviewApi.status == "success") {
      // Map Table
      return detailReviewApi.data.map((value, index) => {
        return (
          <CardAndButton data={value} key={index} />
        );
      });
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
  function getDetailReview() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("id_users", data_params.id_users);

    fetch(get_api_detail_review, {
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
          setDetailReviewApi(data);
        } else {
          setDetailReviewApi(data);
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
      <div className="container-fluid bg-white px-5" style={{ minHeight: "100vh", maxWidth: "1300px", whiteSpace: "pre-line" }}>
        <h2 className="fw-bold mt-5 mb-5">Review</h2>
        <ContentDetailReview />
      </div>
      {/* Content End */}


      <Footer />
    </div>
  );
}

export default DetailReview;