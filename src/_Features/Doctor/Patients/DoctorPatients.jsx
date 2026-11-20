import React from 'react'
import { Link } from "react-router-dom";
import {
  useGetAllVet,
  useGetAllVisiters,
  useGetAllAnimals,
  useGetAllUsers,
} from "../../API/apiHook"

function DoctorPatients() {

  const user = JSON.parse(sessionStorage.getItem("user"));

  const { data: AllVets, isLoading: IsVet } = useGetAllVet();
  const { data: AllVisiters, isLoading: IsVisiters } = useGetAllVisiters();
  const { data: AllAnimals, isLoading: isAnimals } = useGetAllAnimals();
  const { data: AllUsers, isLoading: IsUsers } = useGetAllUsers();
  

  if (IsVet || IsVisiters  || isAnimals || IsUsers)  {
    return <p>Trying to Load...</p>;
  }

  const Vets = AllVets.list;
  const Visits = AllVisiters.list;
  const Pets = AllAnimals.list;
  const Users = AllUsers.list;
  

  const Doctor = Vets.find((vet) => {
    return vet.vet_id === user.vet_id;
  });

  if (!Doctor) {
    return <p>Doctor not found</p>;
  }

  const DoctorVisits = Visits.filter((visit) => {
    return visit.vet_id === Doctor.vet_id;
  });

  function GetDoctorPatients() {

    let DoctorPatients = [];
  
    DoctorVisits.forEach((visit) => {
  
      const Pet = Pets.find((pet) => {
        return pet.animal_id === visit.animal_id;
      });
  
      const Patient = DoctorPatients.find((pet) => {
        return pet.animal_id === visit.animal_id;
      });
  
      if (Patient === undefined) {
        DoctorPatients.push(Pet);
      }
  
    });
  
    return DoctorPatients;
  }




  return (
    <div style={style.page}>

  <div style={style.patientsContainer}>

  <   Link to="/Doctor" style={style.backLink}>
        ← Back To The Doctor Page
      </Link>


    <div style={style.titleSection}>
      <h1 style={style.title}>My Patients</h1>

      <p style={style.subtitle}>
        All the pets you have treated
      </p>
    </div>


    <div style={style.patientsBox}>

      <div style={style.patientsHeader}>
        <p>Pet</p>
        <p>Owner</p>
        <p>Total Visits</p>
        <p>Last Visit</p>
        <p></p>
      </div>

      {GetDoctorPatients().map((Patients) => {

         const PetOwner = Users.find((user) =>{
          return user.user_id === Patients.owner_id;
        })

        function CountPatientsVisits() {

          let count = 0;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
      
          DoctorVisits.forEach((visit) => {

            const visitDate = new Date(visit.visit_date);
            visitDate.setHours(0, 0, 0, 0);
  
      
            if (visit.animal_id === Patients.animal_id 
              && visitDate.getTime() <= today.getTime()) {
              count++;
            }
      
          });
      
          return count;
        }

        function GetLastVisit() {

          let LastVisit = null;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
        
          DoctorVisits.forEach((visit) => {

            const visitDate = new Date(visit.visit_date);
            visitDate.setHours(0, 0, 0, 0);
        
            if (visit.animal_id === Patients.animal_id
                && visitDate.getTime() <= today.getTime()) {
        
              if (
                LastVisit === null ||
                new Date(visit.visit_date).getTime() >
                new Date(LastVisit.visit_date).getTime()
              ) {
                LastVisit = visit;
                
              }
        
            }
        
          });
        
          return LastVisit;
        }

    return (
      <div 
        key={Patients.animal_id}  
        style={style.patientRow}
      > 

        <div style={style.petInfo}> 
    
          <img 
            src={`http://localhost:6127${Patients.photo_url}`} 
            alt={Patients.name} 
            style={style.petImage} 
          /> 

          <div> 
            <h3 style={style.petName}>{Patients.name}</h3> 
            <p style={style.petType}>{Patients.species}</p> 
          </div> 
    
        </div> 
    
    
        <div style={style.ownerInfo}> 
    
          <h3 style={style.ownerName}> 
            {PetOwner.name}
          </h3> 
    
          <p style={style.ownerEmail}> 
            {PetOwner.email}
          </p> 
    
        </div> 
    
       
        <div> 
          <span style={style.visitNumber}> 
            {CountPatientsVisits()}
          </span> 
        </div> 
    
    
        <div style={style.lastVisit}> 
    
        <h4 style={style.visitDate}>
            {GetLastVisit() && 
              new Date(GetLastVisit().visit_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            }
          </h4>
    
        </div> 
    
    
        
        <Link 
         to={`/Doctor/View/${Patients.animal_id}`}
         style={style.viewButton}> 
          View 
        </Link> 
    
      </div>
    );
    
    })}

  </div>

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

  patientsContainer: {
    width: "86%",
    margin: "0 auto"
  },

  titleSection: {
    marginBottom: "22px"
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "bold"
  },

  subtitle: {
    margin: "6px 0 0 0",
    color: "#777",
    fontSize: "17px"
  },

  patientsBox: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "25px",
    padding: "12px 20px",
    boxSizing: "border-box",
    overflow: "hidden"
  },

  patientsHeader: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1.5fr 0.8fr 1fr 0.5fr",
    alignItems: "center",
    padding: "14px 25px",
    color: "#555",
    fontSize: "16px",
    fontWeight: "bold",
    borderBottom: "2px solid #eee"
  },

  patientRow: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1.5fr 0.8fr 1fr 0.5fr",
    alignItems: "center",
    padding: "18px 25px",
    borderBottom: "1px solid #eee",
    boxSizing: "border-box",
    minHeight: "100px"
  },

  petInfo: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  petImage: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  petName: {
    margin: "0 0 6px 0",
    fontSize: "18px"
  },

  petType: {
    margin: 0,
    color: "#777",
    fontSize: "15px"
  },

  ownerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  ownerName: {
    margin: 0,
    fontSize: "17px"
  },

  ownerEmail: {
    margin: 0,
    color: "#777",
    fontSize: "14px"
  },

  visitNumber: {
    backgroundColor: "#f0eaff",
    color: "#7c67e8",
    padding: "9px 14px",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "16px"
  },

  lastVisit: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  visitDate: {
    margin: 0,
    fontSize: "16px"
  },


  viewButton: {
    display: "inline-block",
    width: "120px",
    textAlign: "center",
    textDecoration: "none",
    backgroundColor: "#f0eaff",
    color: "#7c67e8",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    boxSizing: "border-box"
  },
  
  backLink: {
    display: "inline-block",
    marginBottom: "20px",
    color: "#5B4DB7",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold"
  },


};

export default DoctorPatients