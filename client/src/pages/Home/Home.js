import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Utility/axios";
import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button';

import './sytle.css'
function Home() {
  const [userData, setUserData] = useContext(UserContext);
  const [fullInfo, setfullInfo] = useState([]);
  const [Quesiotns, setQuesiotns] = useState([]);
  const [search, setsearch] = useState([])
  const [searchApiData, setsearchApiData] = useState([])
  const [filterVal, setfilterVal] = useState('')
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let decodedToken = jwt_decode(token);
  let user_id_Ftoken = decodedToken.id;

  let getQuesitons = async () => {
    let token = localStorage.getItem("token");

    if (token === null) {
      localStorage.setItem("token", "");
      token = "";
    } else {
      try {
        const userRes = await axiosInstance
          .get("admin/getUserProfile", {
            headers: { token: token },
          })
          .then((data) => {
            setfullInfo(data.data);
            let getQustions = async () => {
              let responseForQuestion = await axiosInstance.get(
                "/user/getAllQuestions"
              );
              setQuesiotns(responseForQuestion.data);
              setsearchApiData(()=>responseForQuestion.data)
            };
            getQustions();
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    getQuesitons();
  }, []);

  const logout = () => {
    setUserData({
      token: undefined,
    });
    localStorage.setItem("token", "");
    navigate("/login");
  };
  const handleFilter =(e)=>{
    if(e.target.value==""){
      setQuesiotns(searchApiData)
    }else{
     const filterResult = searchApiData.filter(item => item.questions.toLowerCase().includes(e.target.value.toLowerCase()))
     setQuesiotns(filterResult)
    }
    setfilterVal(e.target.value)
  }

  return (
    <div>
      <div className="d-flex headerAkafi container">
      <div>
        <h1>welcome {fullInfo[0]?.user_first_name}</h1>
        <Button variant="info logOut" onClick={logout}>Log out</Button>
      </div>
      <div>
      <Button variant="primary mt-5">
      <a className="askQuestion" href="/question">Ask Question</a>
      </Button>
      </div>
      </div>
      <div>
          <input id='searchQuestions' placeholder='Search using Question asked' value={filterVal} onInput={(e)=>handleFilter(e)}></input>
        </div>
      <div>
        {Quesiotns?.map((quesitonInffo, i) => {
          let questionsShow = (
            <div key={i} className="displayQuestions">

              <div className="col-md-3 nameAndEmail">
                <div>

                Question by : {quesitonInffo.user_first_name}
                </div>
                <div>
                User email : {quesitonInffo.user_email}

                </div>
                <div>
                  Date : {quesitonInffo.time}
                </div>
              </div>
              <div className="col-md-3">
                Question : {quesitonInffo.questions}
              </div>
              <div className="col-md-3">
                Question description : {quesitonInffo.question_description}
              </div>
              <div>
                <a
                  href={`answer/${quesitonInffo.question_id}/${user_id_Ftoken}`}
                >
                  <Button className="m-4" variant='success'>Answer this question</Button>
                </a>
              </div>
             
            </div>
          );
          return questionsShow;
        })}
      </div>
    </div>
  );
}

export default Home;
