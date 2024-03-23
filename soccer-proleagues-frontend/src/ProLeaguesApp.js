import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./Nav";
import TeamsAndLeaguesContext from "./Contexts";
import Homepage from "./Homepage";
// import httpClient from "./httpClient";

const BASE_API_URL = "http://localhost:5001";


function ProLeaguesApp() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));


  useEffect(() => {
    async function setInitialLeagues() {
      const response = await fetch(`${BASE_API_URL}/leagues`);
      const leagues = await response.json();
      setLeagues(leagues);
    }
    setInitialLeagues();
  }, []);

  useEffect(() => {
    async function setInitialTeams() {
      const response = await fetch(`${BASE_API_URL}/teams`);
      const leagueTable = await response.json();
      setTeams(leagueTable);
    }
    setInitialTeams();
  }, []);



  useEffect(() => {
    async function setInitialUser() {
      const response = await fetch(`${BASE_API_URL}/user`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        credentials: 'include',
        headers: {
          'Content-Type': "application/json",
          'authorization': "Bearer " + token
          }
      })
      // const response = await fetch(`${BASE_API_URL}/user`, {
      //   method: "GET", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   credentials: "include", // include, *same-origin, omit
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Content-Type": "application/json",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   redirect: "follow", // manual, *follow, error
      //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //   // body: JSON.stringify(data), // body data type must match "Content-Type" header
      // });
      // const response = await fetch(`${BASE_API_URL}/user`);
      console.log("response!", response);
      const user = response.json();
      console.log("user!@", user);

      setUser(user);
    }
    setInitialUser();
  }, "");

  console.log("teams!", teams);
  console.log("leagues!", leagues);
  console.log("user!", user);


  return (
    <>
      <BrowserRouter>
        <TeamsAndLeaguesContext.Provider value={{ teams: teams, leagues: leagues }}>

          {/* <Homepage user={user} logoutUser={logoutUser}/>
          <NavBar logoutUser={logoutUser}/> */}

          <Homepage user={user} />
          <NavBar />

          <RoutesList />
        </TeamsAndLeaguesContext.Provider>
      </BrowserRouter>
    </>
  );


}

export default ProLeaguesApp;
