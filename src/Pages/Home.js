import Header from "./../Components/Header";
import Footer from "./../Components/Footer";

function Home() {
  return (
    <div className="App">
      <Header />

      {/* Content Start */}
      <div className="container-fluid text-start" style={{ minHeight: "90vh", backgroundColor: "#F3F5F7", paddingTop: "100px" }}>
        <div className="col-md-12 col-sm-12 row">
          <div className="col-md-6 col-sm-12 px-3 row">
            <h2 className="mx-5 fw-normal">
              Halo, Selamat datang <br></br> di komunitas Airdrop4Bucks
            </h2>
            <h1 className="fw-bold mx-5 mt-4" style={{ color: "#F7A600", fontSize: "2.5rem" }}>
              Disini kalian bisa menemukan berbagai informasi tentang kampanye airdrop
            </h1>
            <h2 className="mx-5 fw-normal mt-4">
              Jadi, apalagi yang kalian tunggu, <br></br>mari kita kerjakan airdrop bersama
            </h2>
          </div>
          <div className="col-md-6 col-sm-12 px-3 row">
            <div className="col-md-7 col-sm-12">
              <img src={`img/laptop-home.png`} width="450" className="rounded mx-auto d-block" alt="*Gambar Laptop" />
            </div>
            <div className="col-md-5 col-sm-12 row" >
              <div className="col-12 pt-5">
                <img src={`img/cap-home.png`} width="100" className="rounded mx-auto d-block mt-5" alt="*Gambar Cup" />
              </div>
              <div className="col-12">
              </div>
              <div className="col-12">
                <img src={`img/handphone-home.png`} width="100" className="rounded mx-auto d-block" alt="*Gambar Handphone" />
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* Content End */}


      <Footer />
    </div>
  );
}

export default Home;
