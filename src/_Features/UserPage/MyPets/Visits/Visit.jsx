import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetAllAnimals,useGetAllVet,useAddVisit} from "../../../API/apiHook";

function Visit() {

  const { animal_id } = useParams();

  const { data: AllAnimals, isLoading: IsAnimal } = useGetAllAnimals();
  const { data: AllVets, isLoading: IsVet } = useGetAllVet();
  const { IsVisitng, SetVisit } = useAddVisit();

  const [formData, setFormData] = useState({
    animal_id: Number(animal_id),
    vet_id: "",
    visit_date: "",

  });

  if (IsAnimal) {
    return <p>Trying to Load Animals...</p>;
  }
  
  if (IsVet) {
    return <p>Trying to Load Doctors...</p>;
  }
  
  const Animals = AllAnimals.list;
  const Vets = AllVets.list;
  
  const Pet = Animals.find((animal) => {
    return animal.animal_id === Number(animal_id);
  });
  
  if (!Pet) {
    return <p>Pet not found</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  if(formData.vet_id === ""|| formData.visit_date === ""){
    alert("Please fill the info")
  }else{

  SetVisit(formData);

  }
};

const today = new Date().toISOString().split("T")[0];

  return (
    <div style={style.page}>

     
      <Link to="/User/MyPets" style={style.backLink}>
        ← Back to My Pets
      </Link>

      <div style={style.mainCard}>

     
        <div style={style.header}>
          <div style={style.headerIcon}>🐾</div>

          <div>
            <h1 style={style.title}>Book a Visit</h1>

            <p style={style.subtitle}>
              Schedule a veterinary appointment for your pet
            </p>
          </div>
        </div>


   
        <div style={style.petCard}>

          <img
            src={`http://localhost:6127${Pet.photo_url}`}
            alt="Pet"
            style={style.petImage}
          />

          <div>
            <h2 style={style.petName}>
              {Pet.name}
            </h2>

            <p style={style.petDetails}>
              🐾 {Pet.species}
            </p>

            <p style={style.petDetails}>
              📅 {Pet.age}
            </p>
          </div>

        </div>


        <div style={style.formSection}>

          <h2 style={style.sectionTitle}>
            Appointment Details
          </h2>


       
          <div style={style.formGroup}>

            <label style={style.label}>
              🩺 Veterinarian
            </label>

            <select
              style={style.input}
              name="vet_id"
              onChange={handleChange}
            >
              <option value="">
                Select a veterinarian
              </option>

              {Vets.map((vet) => (
                  <option
                    key={vet.vet_id}
                    value={vet.vet_id}
                  >
                    {vet.full_name}
                  </option>
                ))}

            </select>

          </div>


         
          <div style={style.formGroup}>

            <label style={style.label}>
              📅 Visit Date
            </label>

            <input
              type="date"
              name="visit_date"
              min={today}
              onChange={handleChange}
              style={style.input}
            />

          </div>


          <div style={style.buttons}>

            <Link
              to="/User/MyPets"
              style={style.cancelButton}
            >
              Cancel
            </Link>

            <button
              disabled={IsVisitng}
              onClick={handleSubmit}
              style={style.bookButton}
            >
              📅 &nbsp; Book Visit
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Visit;


const style = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#F3EEF9",
    padding: "35px",
    maxWidth: "1400px",
    margin: "0 auto",
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


  mainCard: {
    backgroundColor: "white",
    borderRadius: "18px",
    padding: "35px",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)"
  },


  header: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "30px"
  },


  headerIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#5B4DB7",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "27px"
  },


  title: {
    margin: "0",
    color: "#5B4DB7",
    fontSize: "32px"
  },


  subtitle: {
    margin: "6px 0 0 0",
    color: "#666",
    fontSize: "16px"
  },


  petCard: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    backgroundColor: "#F7F4FC",
    border: "1px solid #DDD5F5",
    borderRadius: "15px",
    padding: "18px",
    marginBottom: "30px"
  },


  petImage: {
    width: "130px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "13px"
  },


  petName: {
    margin: "0 0 10px 0",
    fontSize: "25px"
  },


  petDetails: {
    margin: "8px 0",
    color: "#666",
    fontSize: "16px"
  },


  formSection: {
    marginTop: "10px"
  },


  sectionTitle: {
    color: "#5B4DB7",
    fontSize: "22px",
    marginBottom: "22px"
  },


  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "22px"
  },


  label: {
    fontWeight: "bold",
    fontSize: "16px"
  },


  input: {
    width: "100%",
    padding: "15px",
    border: "1px solid #CCC3EE",
    borderRadius: "9px",
    fontSize: "16px",
    boxSizing: "border-box",
    backgroundColor: "white"
  },


  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "30px"
  },


  cancelButton: {
    padding: "14px 30px",
    border: "1px solid #BDB4E5",
    borderRadius: "9px",
    color: "#555",
    backgroundColor: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },


  bookButton: {
    padding: "14px 30px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "#5B4DB7",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  }

};