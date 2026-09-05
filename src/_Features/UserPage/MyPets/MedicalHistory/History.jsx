import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllAnimals,useGetAllVisiters,useGetAllVet,useGetAllVaccines } from "../../../API/apiHook";


function History() {

  const { animal_id } = useParams();

  const { data: AllAnimals } = useGetAllAnimals();

  const Animals = AllAnimals?.list || [];

  const Pet = Animals.find((animal) => {
    return animal.animal_id === Number(animal_id);
  });

 const { data: AllVisits } = useGetAllVisiters();

 const Visits = AllVisits?.list || [];

 const PetVisits = Visits.filter((visit) => {
 
  const visitDate = new Date(visit.visit_date);
  const today = new Date();

  visitDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return (
    visit.animal_id === Number(animal_id) &&
    visitDate < today
  );

});

const { data: VetsData } = useGetAllVet();
const Vets = VetsData?.list || [];

const { data: VaccinesData } = useGetAllVaccines();
const Vaccines = VaccinesData?.list || [];

const VaccPet = Vaccines.filter((Vaccin) => {

  return Vaccin.animal_id === Number(animal_id);

});


  return (
    <div style={style.page}>

    
      <div style={style.header}>

        <h1 style={style.title}>
          Medical History
        </h1>

        <p style={style.subtitle}>
          View your pet's visits and vaccine history
        </p>

      </div>


      
      <div style={style.petCard}>

        <div style={style.petIcon}>
          <img
            src={`http://localhost:6127${Pet?.photo_url}`}
            alt={Pet?.name}
            style={style.appointmentImage}
          />
        </div>

        <div>

          <h2 style={style.petName}>
            {Pet?.name}
          </h2>

          <p style={style.petDetails}>
            {Pet?.species} • {Pet?.age} years old
          </p>

        </div>

      </div>

     
      <div style={style.section}>

        <h2 style={style.sectionTitle}>
          Visit History
        </h2>

        {PetVisits.map((visit) => {
                  
          const Vet = Vets.find((vet) => {
            return vet.vet_id === visit.vet_id;
          });

          return (
            <div
              key={visit.visit_id}
              style={style.historyCard}
            >
            
              <div style={style.cardTop}>
          
                <div>
                  <h3 style={style.cardTitle}>
                    Veterinary Visit
                  </h3>
          
                  <p style={style.date}>
                    {new Date(visit.visit_date).toLocaleDateString("en-GB")}
                  </p>
                </div>
          
                <div style={style.doctor}>
                  {Vet?.full_name}
                </div>
          
              </div>
          
          
              <div style={style.details}>
          
                <div style={style.detailItem}>
                  <span style={style.detailTitle}>
                    Diagnosis
                  </span>
          
                  <p style={style.detailText}>
                    {visit.diagnosis}
                  </p>
                </div>
          
          
                <div style={style.detailItem}>
                  <span style={style.detailTitle}>
                    Treatment
                  </span>
          
                  <p style={style.detailText}>
                    {visit.treatment}
                  </p>
                </div>
          
          
                <div style={style.detailItem}>
                  <span style={style.detailTitle}>
                    Veterinarian Notes
                  </span>
          
                  <p style={style.detailText}>
                    {visit.vet_notes}
                  </p>
                </div>
          
              </div>
          
            </div>
          );
          
          })}
          
      </div>

         
<div style={style.section}>

<h2 style={style.sectionTitle}>
  Vaccine History
</h2>

{VaccPet.map((vac) => {

  const Vet = Vets.find((vet) => {
    return vet.vet_id === vac.vet_id;
  });

  return (
    <div
      key={vac.vaccine_id}
      style={style.historyCard}
    >

      <div style={style.cardTop}>

        <div>
          <h3 style={style.cardTitle}>
            {vac.type}
          </h3>

          <p style={style.date}>
            Date Given:{" "}
            {new Date(vac.date_given).toLocaleDateString("en-GB")}
          </p>
        </div>

        <div style={style.doctor}>
          {Vet?.full_name}
        </div>

      </div>

      <div style={style.details}>

        <div style={style.detailItem}>
          <span style={style.detailTitle}>
            Next Due
          </span>

          <p style={style.detailText}>
            {new Date(vac.next_due).toLocaleDateString("en-GB")}
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


export default History;



const style = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#F3EEF9",
    padding: "35px",
    maxWidth: "1400px",
    margin: "0 auto",
    boxSizing: "border-box"
  },

  header: {
    marginBottom: "30px"
  },

  title: {
    margin: "0",
    fontSize: "32px"
  },

  subtitle: {
    margin: "8px 0 0 0",
    color: "#666",
    fontSize: "16px"
  },

  petCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)"
  },

  petIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    backgroundColor: "#F3EEF9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px"
  },

  petName: {
    margin: "0",
    fontSize: "22px"
  },

  petDetails: {
    margin: "5px 0 0 0",
    color: "#666"
  },

  section: {
    marginBottom: "35px"
  },

  sectionTitle: {
    color: "#5B4DB7",
    marginBottom: "15px"
  },

  historyCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "22px",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)"
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee"
  },

  cardTitle: {
    margin: "0",
    fontSize: "19px"
  },

  date: {
    margin: "6px 0 0 0",
    color: "#777"
  },

  doctor: {
    backgroundColor: "#F3EEF9",
    color: "#5B4DB7",
    padding: "8px 14px",
    borderRadius: "20px",
    fontWeight: "bold"
  },

  details: {
    marginTop: "20px"
  },

  detailItem: {
    marginBottom: "18px"
  },

  detailTitle: {
    color: "#5B4DB7",
    fontWeight: "bold"
  },

  detailText: {
    margin: "5px 0 0 0",
    color: "#555"
  },

  vaccineCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "22px",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)"
  },

  nextDue: {
    margin: "15px 0 0 0",
    color: "#555"
  },

  appointmentImage: {

    width: "55px",
    height: "55px",
    minWidth: "55px",
    borderRadius: "50%",
    objectFit: "cover"

  },

};