import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useGetAllAnimals,
  useGetAllUsers,
  useGetAllVisiters} from "../../../API/apiHook"

function ViewPatient() {

  const { animal_id } = useParams();

  const { data: AllAnimals, isLoading: isAnimals } = useGetAllAnimals();
  const { data: AllUsers, isLoading: IsUsers } = useGetAllUsers();
  const { data: AllVisiters, isLoading: IsVisiters } = useGetAllVisiters();

  if(isAnimals || IsUsers || IsVisiters){
    return <p>Trying to Load...</p>;
  }

  const Pets = AllAnimals.list;
  const Users = AllUsers.list;
  const Visits = AllVisiters.list;

  const ThePet = Pets.find((Pet) => {
      return Pet.animal_id === Number(animal_id);
  })

  const Owner = Users.find((user) => {
    return user.user_id === ThePet.owner_id;
})

  function CountAnimalVisits(){
    let cnt=0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    Visits.forEach((visit) => {
      const visitDate = new Date(visit.visit_date);
            visitDate.setHours(0, 0, 0, 0);

      if(visit.animal_id === ThePet.animal_id 
        && visitDate.getTime() <= today.getTime()){
        cnt++;
      }
      
    });

    return cnt;

  }

  const AnimalsVisits = Visits.filter((visit) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const visitDate = new Date(visit.visit_date);
    visitDate.setHours(0, 0, 0, 0);
  
    return visit.animal_id === ThePet.animal_id &&
           visitDate.getTime() <= today.getTime();
  })

  return (
    <div style={style.page}>

      <div style={style.container}>

        <Link to="/Doctor/Patients" style={style.backLink}>
          ← Back To My Patients
        </Link>


        <div style={style.patientCard}>

          <div style={style.patientTop}>

            <img
              src={`http://localhost:6127${ThePet.photo_url}`} 
              alt={ThePet.name}
              style={style.petImage}
            />

            <div>
              <h1 style={style.petName}>{ThePet.name}</h1>

              <p style={style.petType}>
                {ThePet.species}
              </p>
            </div>

          </div>


          <div style={style.infoSection}>

            <div>
              <p style={style.label}>Owner</p>
              <h3 style={style.value}>{Owner.name}</h3>
            </div>

            <div>
              <p style={style.label}>Email</p>
              <h3 style={style.value}>
               {Owner.email}
              </h3>
            </div>

            <div>
              <p style={style.label}>Total Visits</p>
              <h3 style={style.value}>{CountAnimalVisits()}</h3>
            </div>

          </div>

        </div>


        <h2 style={style.historyTitle}>
          Visit History
        </h2>


       

          {AnimalsVisits.map((visit) => { 
            console.log(visit.visit_id, visit.visit_date);
          return (
           <div
           key={visit.visit_id} 
           style={style.visitCard}>
             <div style={style.visitHeader}>

               <h3 style={style.visitDate}>
               {
              new Date(visit.visit_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            }
               </h3>

             </div>


             <div style={style.visitDetails}>

               <div>
                 <p style={style.label}>Diagnosis</p>

                 <p style={style.detailText}>
                   {visit.diagnosis}
                 </p>
               </div>


               <div>
                 <p style={style.label}>Treatment</p>

                 <p style={style.detailText}>
                   {visit.treatment}
                 </p>
               </div>


               <div>
                 <p style={style.label}>Vet Notes</p>

                 <p style={style.detailText}>
                  {visit.vet_notes}
                 </p>
               </div>

              </div>
             </div>

        );
          


      })}

          
     </div>
    </div>
    
        
    
        
  );
}


const style = {

    page: {
      minHeight: "100vh",
      backgroundColor: "#f5effb",
      padding: "35px 0"
    },
  
    container: {
      width: "86%",
      margin: "0 auto"
    },
  
    backLink: {
      display: "inline-block",
      marginBottom: "25px",
      color: "#5B4DB7",
      textDecoration: "none",
      fontSize: "20px",
      fontWeight: "bold"
    },
  
    patientCard: {
      backgroundColor: "white",
      borderRadius: "25px",
      padding: "30px 40px",
      marginBottom: "30px"
    },
  
    patientTop: {
      display: "flex",
      alignItems: "center",
      gap: "22px",
      paddingBottom: "25px",
      borderBottom: "1px solid #eee"
    },
  
    petImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover"
    },
  
    petName: {
      margin: "0 0 8px 0",
      fontSize: "30px"
    },
  
    petType: {
      margin: 0,
      color: "#777",
      fontSize: "18px"
    },
  
    infoSection: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "30px",
      paddingTop: "25px"
    },
  
    label: {
      margin: "0 0 7px 0",
      color: "#777",
      fontSize: "15px"
    },
  
    value: {
      margin: 0,
      fontSize: "17px"
    },
  
    historyTitle: {
      margin: "0 0 18px 0",
      fontSize: "25px"
    },
  
    visitCard: {
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "25px 35px",
      marginBottom: "18px"
    },
  
    visitHeader: {
      paddingBottom: "16px",
      marginBottom: "20px",
      borderBottom: "1px solid #eee"
    },
  
    visitDate: {
      margin: 0,
      fontSize: "19px"
    },
  
    visitDetails: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 2fr",
      gap: "40px"
    },
  
    detailText: {
      margin: 0,
      fontSize: "16px",
      lineHeight: "1.5"
    }
  
  };
  
  export default ViewPatient;