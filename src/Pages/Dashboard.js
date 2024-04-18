import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { get_api_index_dashboard, get_api_store_campaign } from "../Utils/Utils";
import TableCountCampaign from "../Components/TableCountCampaign";
import TableDataDashboard from "../Components/TableDataDashboard";

function Dashboard() {
  const [dashboardApi, setDashboardApi] = useState('');
  const [levelUserLogin, setLevelUserLogin] = useState('');
  const [levelUserLoginTampil, setLevelUserLoginTampil] = useState('');
  const [headerTableText, setHeaderTableText] = useState('');
  const [firstColumn, setFirstColumn] = useState(0);
  const [secondColumn, setSecondColumn] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [picture, SetPicture] = useState("");
  const [pictureText, SetPictureText] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Check is already login or not
  useEffect(() => {
    if (!localStorage._token && !localStorage._user) {
      navigate("/login");
    } else {
      getDashboard();

      // set level
      var user_data = localStorage.getItem("_user");
      checkComponentLoginUser(user_data);
    }
  }, []);

  // base dashboardAPI State
  useEffect(() => {
    if (dashboardApi && dashboardApi.status == 'success') {
      if (levelUserLogin == "Admin") {
        setFirstColumn(dashboardApi.data.request_accepted_count);
        setSecondColumn(dashboardApi.data.request_declined_count);
      } else {
        setFirstColumn(dashboardApi.data.request_submited_count);
        setSecondColumn(dashboardApi.data.request_accepted_count);
      }
    }
  }, [dashboardApi]);

  function checkComponentLoginUser(user_data) {
    var user_data_parse = JSON.parse(user_data);
    setLevelUserLogin(user_data_parse.level_users);
    if (user_data_parse.level_users == "Admin") {
      setLevelUserLoginTampil("Admin");
      setHeaderTableText('Users Request');
    } else {
      setLevelUserLoginTampil("Users");
      setHeaderTableText('My Request Status');
    }
  }

  function DataTableDashboard() {
    if (dashboardApi && dashboardApi.status == "success") {
      // Map Table
      return dashboardApi.data.data_table.map((value, index) => {
        return (
          <TableDataDashboard level_users={levelUserLogin} data={value} key={index} />
        );
      });
    } else {
      // Map Table
      return (
        <tr>
          <td colSpan={3} className="p-5 text-center">Tidak Ada Data</td>
        </tr>
      );
    }
  }

  // Get data dashboard from API
  function getDashboard() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);

    fetch(get_api_index_dashboard, {
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
          setDashboardApi(data);
        } else {
          setDashboardApi(data);
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

  function handleSubmitRequestForm(e) {
    e.preventDefault();

    if (title == "" || description == "" || picture == '') {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <strong>Kesalahan Input</strong>,
        html: <i>Pastikan Input tidak kosong</i>,
        icon: 'error'
      })
      return false;
    }

    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("edit", "false");
    Form.append("id", "0");
    Form.append("token", token);
    Form.append("title", title);
    Form.append("description", description);
    Form.append("picture", picture);


    fetch(get_api_store_campaign, {
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

  function handleFileInputChange(e) {
    const file = e.target.files[0]; // Ambil file yang dipilih oleh pengguna
    if (file) {
      SetPicture(file);
      // Buat objek FileReader
      const reader = new FileReader();

      // Tentukan apa yang terjadi ketika file selesai dibaca
      reader.onloadend = () => {
        // Ambil konten dari file dan simpan ke state picture
        SetPictureText(reader.result);
      };

      // Baca konten file sebagai URL data
      reader.readAsDataURL(file);
    }
  }

  function handleConnectCustomInputFile() {
    document.getElementById('picture').click();
  }

  function resetInputModal() {
    SetTitle('');
    SetDescription('');
    SetPicture('');
  }

  return (
    <div className="App">
      <Header />

      {/* Content Start */}
      <div className="container-fluid bg-white px-5" style={{ minHeight: "100vh", maxWidth: "1300px" }}>
        <h2 className="fw-bold mt-5 mb-5">{levelUserLoginTampil} Dashboard</h2>
        <TableCountCampaign level_users={levelUserLogin} first_column={firstColumn} second_column={secondColumn} />
        <table className="table table-bordered border-black table-striped fs-3 fw-medium" style={{ marginTop: "7%" }}>
          <thead>
            <tr>
              <th scope="col" colSpan={3} className="text-center" style={{ backgroundColor: "#F3F5F7" }}>{headerTableText}</th>
            </tr>
          </thead>
          <tbody>
            <DataTableDashboard />
          </tbody>
        </table>
        <div className="container-fluid d-flex justify-content-center mt-5 mb-5">
          <button type="button" className="btn btn-warning ms-md-3 fs-3 fw-bold d-block w-25" onClick={handleShow}>Request Form</button>
        </div>
      </div>
      {/* Content End */}

      {/* Modal Request Form Start */}
      <Modal show={show} onHide={handleClose} onExited={resetInputModal} size="xl">
        <Modal.Header className="border-bottom border-dark" style={{ backgroundColor: "#DCE1E7" }} closeButton>
          <Modal.Title className="text-center w-100">Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#DCE1E7" }}>
          <form className="p-3 bg-white">
            <div className="mb-3">
              <label htmlFor="title" className="form-label fs-5 fw-bold">Title: </label>
              <input type="text" className="form-control bg-body-secondary fw-bold" value={title} id="title" onInput={(e) => { SetTitle(e.target.value) }} placeholder="type here..." />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fs-5 fw-bold">Description: </label>
              <textarea className="form-control bg-body-secondary fw-bold" id="description" value={description} onInput={(e) => { SetDescription(e.target.value) }} placeholder="type here..."></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="picture" className="form-label fs-5 fw-bold">Picture: </label>
              <input type="file" className="form-control bg-body-secondary fw-bold d-none" id="picture" onInput={(e) => { handleFileInputChange(e) }} />
              <div className="px-2 w-50">
                <div className="container-input-gambar form-control bg-body-secondary fw-bold mb-3 fw-bold" onClick={handleConnectCustomInputFile}>
                  <span className="d-flex justify-content-end gap-2">Upload file <img src={`img/upload-vektor.svg`} width="20" className="d-block" alt="*Gambar Upload" /></span>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-top-0" style={{ backgroundColor: "#DCE1E7" }}>
          {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
          <Button className="btn-lg btn-warning px-5 fw-bold" variant="warning" onClick={(e) => handleSubmitRequestForm(e)}>
            Submit Form
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Request Form End */}


      <Footer />
    </div>
  );
}

export default Dashboard;
