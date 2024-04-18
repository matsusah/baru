import { useNavigate } from "react-router-dom";

function TableDataDashboard({level_users, data}) {
  

  function TombolKolomKetiga({level_users, data}) {
    const navigate = useNavigate();
    if(level_users == "Admin") {
      return (
        <button type="button" className="btn text-white ms-md-3 fw-bold d-block w-50" style={{ backgroundColor: "#64E987" }} onClick={() => navigate("/dashboard/review/"+data.id_users)}>Views</button>
      );
    } else if(level_users == "Pengguna") {
      if(data.status_campaign == "Pending") {
        return (
          <button type="button" className="btn btn-light ms-md-3 fw-bold d-block w-50">in review</button>
        );
      } else {
        return (
          <button type="button" className="btn btn-light ms-md-3 fw-bold d-block w-50">{data.status_campaign}</button>
        );
      }
    }
  }


  return (
    <tr>
      <td>{data.number}</td>
      <td><span className="d-block w-100 text-start" style={{ width: "20vw" }}>{data.second_column}</span></td>
      <td>
        <span className="d-flex justify-content-center">
          <TombolKolomKetiga level_users={level_users} data={data} />
        </span>
      </td>
    </tr>
  ); 
}


export default TableDataDashboard;
