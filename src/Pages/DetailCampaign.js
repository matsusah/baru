import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { get_api_detail_campaign, get_api_get_comment_campaign, get_api_store_comment_campaign, get_public_url } from "../Utils/Utils";

function DetailCampaign() {
  const data_params = useParams();
  const [detailCampaignApi, setDetailCampaignApi] = useState([]);
  const [commentAPi, setCommentApi] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitComment(); // Fungsi enter sama dengan submit pada komen
    }
  };

  // Check is already login or not
  useEffect(() => {
    if (!localStorage._token && !localStorage._user) {
      navigate("/login");
    } else {
      getDetailCampaign();
      getCommentByCampaign();
    }
  }, []);


  function CardAndButton({ data }) {
    return (
      <div className="wrapper-data mt-5 mb-5" key={data.id_campaign}>
        <div className="form border-none"> {/*mengubah card menjadi form agar tidak ada border */}
          <div className="card-body p-0">
            <img src={`${get_public_url}/uploads/picture_campaign/${data.picture}`} className="img-fluid img-detail rounded" />
          </div>
        </div>
        <div className="card border mt-4 px-5 pb-4" style={{ backgroundColor: "#ffffff" }}> {/* background content detail campaign */} {/*mengubah card menjadi form agar tidak ada border */}
          <div className="card-body py-4">
            <h2 className="card-title mb-4">{data.title_campaign}</h2>
            <p className="card-text fs-5 text-start">{data.description_campaign}</p>
          </div>
        </div>
      </div>
    );
  }

  function handleSubmitComment() {
    if (commentInput == "") {
      // const MySwal = withReactContent(Swal)
      // MySwal.fire({
      //     title: <strong>Kesalahan Input</strong>,
      //     html: <i>Pastikan Input tidak kosong</i>,
      //     icon: 'error'
      // })
      return false;
    }

    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("edit_comment", "false");
    Form.append("id_comment", "0");
    Form.append("id_campaign", data_params.id_campaign);
    Form.append("text_comment", commentInput);


    fetch(get_api_store_comment_campaign, {
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
          window.location.reload();
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

  function ContentDetailCampaign() {
    if (detailCampaignApi && detailCampaignApi.status == "success") {
      // Map Table
      return (
        <div className="container-fluid">
          <CardAndButton data={detailCampaignApi.data} />
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
  function getDetailCampaign() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("id_campaign", data_params.id_campaign);

    fetch(get_api_detail_campaign, {
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
          setDetailCampaignApi(data);
        } else {
          setDetailCampaignApi(data);
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

  function getCommentByCampaign() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("id_campaign", data_params.id_campaign);

    fetch(get_api_get_comment_campaign, {
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
          setCommentApi(data);
        } else {
          setCommentApi(data);
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

  function MapComment() {
    if (commentAPi && commentAPi.status == "success") {
      return commentAPi.data.map((value, index) => {
        return (
          <div className="pt-2 d-flex gap-4 px-5 py-3 text-start" key={index}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>
            </div>
            <div>
              <p>{value.name}</p>
              <p>{value.text_comment}</p>
            </div>
          </div>
        );
      });
    }
  }

  function CommentComponent() {
    return (
      <div className="wrapper-data container-fluid mt-5 mb-5 ">
        <div className="card" style={{ backgroundColor: "#ffffff" }}>  {/* background color comment */}
          <div className="card-header">Diskusi</div>
          <div className="card-body p-0 mt-4">
            <MapComment />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />

      {/* Content Start */}
      <div className="container-fluid bg-white px-5" style={{ minHeight: "100vh", maxWidth: "1000px" }}>
        {/* <h2 className="fw-bold mt-5 mb-5">Review</h2> */}

        <div style={{ whiteSpace: "pre-line" }}> {/* Agar Enter Terbaca */}
          <ContentDetailCampaign />
        </div>

        {/* Comment Start */}
        <div className="wrapper-data container-fluid mt-5 mb-5">
          <div className="card" style={{ backgroundColor: "#ffffff" }}> {/* background color comment header */}
            <div className="card-header">
              Comment
            </div>
            <div className="card-body p-0 mt-3">
              <form>
                <div className="pt-2 d-flex gap-4 px-5 py-4">
                  <label className="form-label">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>
                  </label>
                  <div className="input-group">
                    <input type="text" className="form-control border-none" id="comment_input" placeholder="Join the discussion..." value={commentInput} onChange={(e) => { setCommentInput(e.target.value) }} onKeyPress={handleKeyPress} style={{ border: "none" }} />
                    <div className="d-flex align-items-center bg-white rounded-end-2" style={{ cursor: "pointer" }} onClick={() => handleSubmitComment()}><img src={`../../img/send-circle-outline.png`} width="40" className="rounded mx-auto d-block" alt="*Icon Send" /></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <CommentComponent />
      </div>
      {/* Content End */}


      <Footer />
    </div>
  );
}

export default DetailCampaign;