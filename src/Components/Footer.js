import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="bg-dark text-white text-lg-start pt-1">
      {/* <!-- Grid container --> */}
      <div className="container p-4 text-center">
        {/* <!--Grid row--> */}
        <div className="row justify-content-center">
          {/* <!--Grid column--> */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Airdrop4Bucks</h5>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare enim ut risus tristique, at ullamcorper felis posuere. Vivamus convallis quam et libero pulvinar convallis. Fusce sit amet sapien imperdiet, pretium elit et, varius nisl. Etiam sollicitudin eros velit, porttitor ullamcorper odio fermentum eu. Aenean nec dignissim tortor. In magna erat, consectetur ut ullamcorper nec, mollis feugiat massa.
            </p>
          </div>
          {/* <!--Grid column--> */}

        </div>
        {/* <!--Grid row--> */}
        {/* <!--Grid row--> */}
        <div className="row justify-content-center">
          {/* <!--Grid column--> */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 row">
            <div className="col-lg-4 col-md-6 col-sm-12 rounded-circle">
              <a className="text-decoration-none" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className='rounded-circle border border-white p-2 m-1' height="42" width="42" viewBox="0 0 320 512"><path fill='#ffffff' d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <a className="text-decoration-none" href="#">
                <FontAwesomeIcon className='rounded-circle border border-white p-2 m-1' icon="fa-brands fa-twitter" size="xl" style={{ color: "#ffffff" }} />
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <a className="text-decoration-none" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className='rounded-circle border border-white p-2 m-1' height="42" width="42" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
              </a>
            </div>
          </div>
          {/* <!--Grid column--> */}

        </div>
        {/* <!--Grid row--> */}
      </div>
      {/* <!-- Grid container --> */}

      {/* <!-- Copyright --> */}
      <div className="text-left p-3 fw-bold" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
        Copyright ©2024 :
        <a className="text-decoration-none" href="#">&nbsp;Airdrop4Bucks</a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
  );
}


export default Footer;