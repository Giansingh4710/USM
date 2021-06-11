import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const MyApp = () => {
  const [apiData, setData] = React.useState(null);

  async function api() {
    //let url = "https://www.boredapi.com/api/activity";
    let url = "http://localhost:8080/test";
    await fetch("/test")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        setData("ERROR");
        console.log("THE ERROR:", err);
      });
  }

  function showPeople() {
    if (apiData === "ERROR") {
      return (
        <div className="users">
          Something went WRONG!
          <div className="col">
            <button
              className="indButton"
              onClick={() => {
                api();
              }}
            >
              fetch
            </button>
          </div>
        </div>
      );
    } else if (apiData === null) {
      api();
      return <div className="users">LOADING...</div>;
    } else {
      const lst = apiData.users.map((obj) => {
        return (
          <div className="indBox">
            {obj.firstName + ", " + obj.lastName}
            <button className="indButton">edit</button>
            <button className="indButton">delete</button>
          </div>
        );
      });
      return (
        <div className="users">
          <div className="box">
            USERS
            {lst}
          </div>
          <button className="create">CREATE</button>
        </div>
      );
    }
  }
  return (
    <div>
      <h1>User Management System</h1>
      {showPeople()}
    </div>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
