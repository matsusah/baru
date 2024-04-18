import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get_api_index_campaign, get_api_index_announcement_pagination, get_api_store_announcement, get_public_url } from "../Utils/Utils";

function Announcement() {
  // left getter, rigth setter
  const [announcementApi, SetAnnouncementAPI] = useState([]);
  const [search, SetSearch] = useState("");
  const [page, SetPage] = useState(0);
  const [totalPage, SetTotalPage] = useState(0);
  const [pagePrev, SetPagePrev] = useState(0);
  const [pageAfter, SetPageAfter] = useState(0);
  const [levelUsersLogin, SetLevelUsersLogin] = useState("");
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Check is already login or not
  useEffect(() => {
    if (!localStorage._token && !localStorage._user) {
      navigate("/login");
    } else {
      getAnnouncement();

      checkComponentLoginUser();
    }
  }, []);

  const validateChangePrev = () => {
    if (pagePrev >= 0) {
      SetPage(SetPagePrev);
    }
  }
  const validateChangeAfter = () => {
    if (page < totalPage) {
      SetPage(pageAfter);
    }
  }

  // Check is already login or not
  useEffect(() => {
    getAnnouncement();
  }, [search, page]);

  // Get data dashboard from API
  function getAnnouncement() {
    var token = localStorage.getItem("_token");

    var Form = new FormData();
    Form.append("token", token);
    Form.append("search", search);
    Form.append("page", page);

    fetch(get_api_index_announcement_pagination, {
      method: "POST",
      body: Form,
    })
      .then(
        (response) => {
          return response.json();
        }
      )
      .then((data) => {
        SetAnnouncementAPI(data);
      })
      .catch((error) => {
        // const MySwal = withReactContent(Swal)
        // MySwal.fire({
        //     title: <strong>Error Di Bagian Server</strong>,
        //     html: <p>{error.message}</p>,
        //     icon: 'error'
        // })
      });
  }

  function checkComponentLoginUser() {
    var data_users = localStorage.getItem("_user");
    var user_data_parse = JSON.parse(data_users);
    SetLevelUsersLogin(user_data_parse.level_users);
  }

  // function ContentList() {
  //   if (announcementApi && announcementApi.status == "success") {
  //     SetPage(announcementApi.pagination.current_page);
  //     SetTotalPage(announcementApi.pagination.total);
  //     SetPagePrev(announcementApi.pagination.previous_page);
  //     SetPageAfter(announcementApi.pagination.next_page);
  //     return announcementApi.data.map((value, index) => {
  //       return (
  //         <div className="container-list-text" key={index}>
  //           <p><Link className="text-black text-decoration-none" to={`/announcement/detail/` + value.id_announcement}>{value.title_announcement}</Link></p>
  //           <p style={{ color: "#9b9e9c" }}>{value.tanggal_buat_announcement}</p>
  //         </div>
  //       );
  //     });
  //   } else {
  //     return (
  //       <div className="px-5 fw-bold text-center">
  //         Tidak ada data announcement
  //       </div>
  //     );
  //   }
  // }

  function ContentList() {
    if (announcementApi && announcementApi.status === "success") {
      // Mengurutkan data dari yang terbaru
      const sortedData = announcementApi.data.sort((a, b) => new Date(b.tanggal_buat_announcement) - new Date(a.tanggal_buat_announcement));

      SetPage(announcementApi.pagination.current_page);
      SetTotalPage(announcementApi.pagination.total);
      SetPagePrev(announcementApi.pagination.previous_page);
      SetPageAfter(announcementApi.pagination.next_page);

      // Memetakan data yang telah diurutkan
      return sortedData.map((value, index) => {
        return (
          <div className="container-list-text" key={index}>
            <p><Link className="text-black text-decoration-none" to={`/announcement/detail/` + value.id_announcement}>{value.title_announcement}</Link></p>
            <p style={{ color: "#9b9e9c" }}>{value.tanggal_buat_announcement}</p>
          </div>
        );
      });
    } else {
      return (
        <div className="px-5 fw-bold text-center">
          Tidak ada data pengumuman
        </div>
      );
    }
  }//Content yang ditampilkan sudah urut sesuai tanggal terbaru


  function handleSubmitAnnouncement(e) {
    e.preventDefault();

    if (title == "" || description == "") {
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
    Form.append("token", token);
    Form.append("title", title);
    Form.append("description", description);


    fetch(get_api_store_announcement, {
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
            html: <p>Klik oke, untuk mereload halaman</p>,
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

  function SetPaginate() {
    if (totalPage > 1) {
      let int_map_button = page;
      let list_angka_paginate = [];
      for (let index = 0; index < totalPage; index++) {
        if (index < 10) {
          int_map_button += 1;
          list_angka_paginate.push(int_map_button);
        }
      }
      return (
        <div className="warpper-pagination d-flex justify-content-center gap-4 m-3">
          <div className="prev-button border border-1 p-3" onClick={() => validateChangePrev()}>
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          </div>
          <MapPaginateAngka arrayAngka={list_angka_paginate} />
          <div className="after-button border border-1 p-3" onClick={() => validateChangeAfter()}>
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
          </div>
        </div>
      );
    }
  }

  function MapPaginateAngka({ arrayAngka }) {
    return arrayAngka.map((value, index) => {
      return (
        <div className="container-list-text-paginate-angka border border-1 p-3" key={index} onClick={() => SetPage(value - 1)}>
          {value}
        </div>
      );
    });
  }

  function ComponentBtnAdd() {
    if (levelUsersLogin == "Admin") {
      return (
        <button type="submit" className="btn fw-bold w-100" style={{
          color: "#121214", backgroundColor: "#F7A600", transition: "background-color 0.3s, color 0.3s",
          borderRadius: "4px",
          cursor: "pointer"
        }} onClick={(e) => { handleShow() }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#FFC940"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#F7A600"}>Tambahkan Announcement</button>
      );
    }
  }

  return (
    <div className="App">
      <Header />

      {/* Content Start */}
      <div className="container-fluid text-start" style={{ minHeight: "20vh", backgroundColor: "#000000", padding: "25px" }}>
        <div className="container-fluid" style={{ maxWidth: "1300px" }}>
          <div className="col-md-12 col-sm-12 row">
            <div className="col-6">
              <h2 className="mx-5 fw-bold" style={{ color: "#F7A600" }}>
                Announcement
              </h2>
              <p className="mx-5 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur mi ac erat tincidunt</p>
            </div>

            <div className="col-6 d-flex align-items-center justify-content-center">
              <div className="input-group mb-3 mx-5">
                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></span>
                <input type="text" id="Search" className="form-control" placeholder="Cari Informasi" aria-describedby="basic-addon1" onInput={(e) => { SetSearch(e.target.value) }} />
              </div>
            </div>
            <div className="col-12">
              <div className="mx-5">
                <ComponentBtnAdd />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container-fluid text-start" style={{ minHeight: "90vh", backgroundColor: "#ffffff", maxWidth: "1300px" }}>
        {/* Content Card */}
        <div className="row mx-5 mb-5" style={{ paddingTop: "20px" }}>
          <ContentList />
        </div>
        <SetPaginate />
      </div>



      {/* Modal Announcement Start */}
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header className="border-bottom border-dark" style={{ backgroundColor: "#DCE1E7" }} closeButton>
          <Modal.Title className="text-center w-100">Announcement</Modal.Title>
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
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-top-0" style={{ backgroundColor: "#DCE1E7" }}>
          {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
          <Button className="btn-lg btn-warning px-5 fw-bold" variant="warning" onClick={(e) => handleSubmitAnnouncement(e)}>
            Submit Form
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Announcement End */}
      {/* Content End */}


      <Footer />
    </div>
  );
}

export default Announcement;
