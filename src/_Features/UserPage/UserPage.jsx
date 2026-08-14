import React from "react";
import protpet from "../../assets/propet.png";
import { useGetAllAnimals,useGetAllVisiters } from "./API/apiHook";

function UserPage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const { data: Animals = [] } = useGetAllAnimals();
  const { data: Visiters = [] } = useGetAllVisiters();

  function CountUseranimals()
  {
    let count = 0;
    Animals.forEach((animal) => {
    if (animal.owner_id === user.user_id) {
        count++;

    }
  });
    return count;
  }

  
    function CountUserVisits() {
      let count = 0;
      Visiters.forEach((visit) => {
          Animals.forEach((animal) => {
              if (
                  visit.animal_id === animal.animal_id &&
                  animal.owner_id === user.user_id
              ) {
                  count++;
              }
  
          });
  
      });
  
      return count;
  }




  return (
    <div style={style.page}>

     
      <div style={style.firstDiv}>

        <div style={style.profito}>
          <img
            src="/src/assets/person.png"
            alt="Person"
            style={{
              borderRadius: "100px",
              width: "150px",
              height: "150px"
            }}
          />
           <div style={{
             width: "70%",
             height: "100%",
             padding:"50px",
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center",
           }}>
          <h4>Welcome back,</h4>
          <h2>
            {user?.name}
            <span style={{ color: "#8B7CE8" }}>🐾</span>
          </h2>
          <p>We're happy to see you again!</p>
          </div>

        </div>

        <div style={style.profitopet}>
          <p>Your pets,</p>

          <h1>
            Our Priority <span style={{ color: "#8B7CE8" }}>♥</span>
          </h1>

          <p>
            Provide the best care and love
            <br />
            for your furry friends.
          </p>        
        </div>

      </div>

      <div style={style.secondDiv}>
      <h3>Quick OverView</h3> 
        <div style={style.OverViewBoxs}>
          <div style={style.overview}>
            <h1 style={{ margin: "5px" }}>{CountUseranimals()}</h1>
            <p style={{ margin: "5px", fontWeight: "bold" }}>My Pets</p>
            <h6 style={{ margin: "5px" }}>View all your pets</h6>
          </div>

          <div style={style.overview}>
          <h1 style={{ margin: "5px" }}>{CountUserVisits()}</h1>
            <p style={{ margin: "5px", fontWeight: "bold" }}>Upcoming Visits</p>
            <h6 style={{ margin: "5px" }}>Check scheduled visits</h6>
          </div>

          <div style={style.overview}>
          vacc
          </div>

          <div style={style.overview}>
          allrecords
          </div>
        </div>
      </div>


     
      <div style={style.thirdDiv}>

       
        <div style={style.appointmentsSection}>

          <h3>Upcoming Appointments</h3>

          <div style={style.appointmentsBox}>
            
          </div>

        </div>


       
        <div style={style.tipsSection}>

          <h3>Pet Tips</h3>

          <div style={style.tipsBox}>
            
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserPage;


const style = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#F3EEF9",
    padding: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
    boxSizing: "border-box"
  },


  firstDiv: {
    width: "100%",
    height: "250px",
    display: "flex",
    alignItems: "center",
    
    gap: "20px"
  },


  profito: {
    height: "100%",
    width: "35%",
    backgroundColor: "white",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center"
  },


  profitopet: {
    height: "100%",
    width: "65%",
    padding:"10px",
    backgroundColor: "white",
    borderRadius: "15px",
    backgroundImage: `url(${protpet})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },


  secondDiv: {
    width: "100%",
    height: "160px",
   
  },


  overview: {
    flex: 1,
    height: "120px",
    backgroundColor: "white",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },


  thirdDiv: {
    width: "100%",
    height: "350px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "40px",
    marginTop: "20px"
  },

  OverViewBoxs:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px"
  },


  appointmentsSection: {
    width: "60%",
    height: "100%"
  },


  appointmentsBox: {
    width: "100%",
    height: "280px",
    backgroundColor: "white",
    borderRadius: "15px"
  },


  tipsSection: {
    flex: 1,
    height: "100%"
  },


  tipsBox: {
    height: "80%",
    backgroundColor: "white",
    borderRadius: "15px"
  }

};