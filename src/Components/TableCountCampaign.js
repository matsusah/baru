function TableCountCampaign({level_users, first_column, second_column}) {

  if(level_users == "Admin") {
    return (
      <table className="table table-bordered table-striped fs-3 fw-medium">
        <tbody>
          <tr>
            <td>Request accepted: {first_column}</td>
            <td>Request declined: {second_column}</td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return (
      <table className="table table-bordered border-dark table-striped fs-3 fw-medium">
        <tbody>
          <tr>
            <td>Request submited: {first_column}</td>
            <td>Request accepted: {second_column}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default TableCountCampaign