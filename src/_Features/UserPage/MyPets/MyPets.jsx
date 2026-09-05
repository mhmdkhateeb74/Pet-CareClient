import React, { useState } from "react";
import { useRegisterPetApi,useGetAllVet,useDeletePet,useUpdatePet,useGetAllAnimals } from "../../API/apiHook";
import { Link } from "react-router-dom";


function MyPets() {

  const [showAddPet, setShowAddPet] = useState(false);
  const [showEditPet, setShowEditPet] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const {data:AllPets} =useGetAllAnimals();
  const Pets = AllPets?.list || [];

  const { RegisterPet } = useRegisterPetApi();
  const { data:VetsData } = useGetAllVet();
  const Vets = VetsData?.list || [];
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: -1,
    photo_url: "",
    owner_id: user.user_id,
    vet_id: -1,

});
const [editFormData, setEditFormData] = useState({
  animal_id: -1,
  name: "",
  species: "",
  age: -1,
  photo_url: "",
  owner_id: user.user_id,
  vet_id: -1,
});


const { deletePet } = useDeletePet();
 const {updatePet} = useUpdatePet();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    setFormData(prevData => ({
      ...prevData,
      [name]: name === "photo_url" ? files[0] : value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
  
    setEditFormData(prevData => ({
      ...prevData,
      [name]: name === "photo_url" ? files[0] : value
    }));
  };
  

  const handleEdit = (Pet) => {
    setEditFormData({
      animal_id: Pet.animal_id, 
      name: Pet.name,
      species: Pet.species,
      age: Pet.age,
      photo_url: Pet.photo_url,
      owner_id: Pet.owner_id,
      vet_id: Pet.vet_id
    });
  
    setShowEditPet(true);
  };

  const handleDelete = (id) => {
    deletePet(id)
  };

const handleSubmit = (e) => {
    e.preventDefault();

    RegisterPet(formData, {
      onSuccess: () => {
          setShowAddPet(false);
      }
  });
};

const handleUpdate = (e) => {
    e.preventDefault();

    updatePet(editFormData, {
      onSuccess: () => {
        setShowEditPet(false);
      }
    });
  };


const UserPets = Pets.filter((Pet) => {

  return Pet.owner_id === user.user_id;

})


  return (
    <div style={style.page}>

      {/* FIRST DIV */}
      <div style={style.firstDiv}>

        <div>
          <h1 style={style.title}>My Pets</h1>

          <p style={style.subtitle}>
            Manage and view all your pets
          </p>
        </div>

        <button
          style={style.addButton}
          onClick={() => setShowAddPet(true)}
        >
          + Add Pet
        </button>

      </div>


      {/* SECOND DIV - YOU CONNECT YOUR ANIMALS HERE */}
      <div style={style.secondDiv}>

      {UserPets.map((Pet) => {
          return (
            <div key={Pet.animal_id} style={style.petCard}>
            
              <img
                src={`http://localhost:6127${Pet.photo_url}`}
                alt={Pet.name}
                style={style.petImage}
              />

              <div style={style.petInfo}>
          
                <h2 style={style.petName}>{Pet.name}</h2>
          
                <div style={style.petDetail}>
                  <span>🐾</span>
                  <span>{Pet.species}</span>
                </div>
          
                <div style={style.petDetail}>
                  <span>📅</span>
                  <span>{Pet.age} years old</span>
                </div>
          
                <div style={style.actionButtons}>
          
                  <button    
                  onClick={() => handleEdit(Pet)}
                  className="editPetButton"
                  >
                    ✎ &nbsp; Edit
                  </button>
          
                  <button 
                  onClick={()=>handleDelete(Pet.animal_id)}
                  className="deletePetButton"
                  >
                     &nbsp; Delete
                  </button>

                  <Link
                    to={`/User/Visit/${Pet.animal_id}`}
                    className="bookVisitButton"
                  >
                    Book Visit
                  </Link>
                  <Link
                    to={`/User/History/${Pet.animal_id}`}
                    className="medicalHistoryButton"
                  >
                    Medical History
                  </Link>
          
                </div>
          
              </div>
            </div>
          );
        })}

      </div>


      {/* THIRD DIV */}
      <div style={style.thirdDiv}>

        <div style={style.pawIcon}>
          🐾
        </div>

        <h3 style={style.bottomTitle}>
          Don't see your pet?
        </h3>

        <p style={style.bottomText}>
          Click "Add Pet" to register a new furry friend.
        </p>

      </div>


      {/* ADD PET PANEL */}
      {showAddPet && (

        <div style={style.overlay}>

          <div style={style.addPetPanel}>

            {/* HEADER */}
            <div style={style.panelHeader}>

              <div>
                <h2 style={style.panelTitle}>
                  Add New Pet
                </h2>

                <p style={style.panelSubtitle}>
                  Add your pet's information
                </p>
              </div>

              <button
                style={style.closeButton}
                onClick={() => setShowAddPet(false)}
              >
                ✕
              </button>

            </div>


            {/* PHOTO */}
            <div style={style.imageSection}>

              <div style={style.imageCircle}>
                🐾
              </div>

              <label style={style.uploadButton}>

                Choose Photo

                <input
                  type="file"
                  onChange={handleChange}
                  name="photo_url"
                  accept="image/*"
                  style={{ display: "none" }}
                />

              </label>

            </div>


            {/* PET NAME */}
            <div style={style.formGroup}>

              <label style={style.label}>
                Pet Name
              </label>

              <input
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Enter pet name"
                style={style.input}
              />

            </div>


            {/* SPECIES */}
            <div style={style.formGroup}>

              <label style={style.label}>
                Species
              </label>

              <input
                type="text"
                onChange={handleChange}
                name="species"
                placeholder="Dog, Cat, Rabbit..."
                style={style.input}
              />

            </div>


            {/* AGE */}
            <div style={style.formGroup}>

              <label style={style.label}>
                Age
              </label>

              <input
                type="number"
                onChange={handleChange}
                name="age"
                placeholder="Enter pet age"
                style={style.input}
              />

            </div>


            {/* VETERINARIAN / DOCTOR */}
            <div style={style.formGroup}>

              <label style={style.label}>
                Veterinarian
              </label>

              <select
                name="vet_id"
                style={style.input}
                onChange={handleChange}
              >
                <option value="">
                  Select Veterinarian
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


            {/* BUTTONS */}
            <div style={style.panelButtons}>

              <button
                style={style.cancelButton}
                onClick={() => setShowAddPet(false)}
              >
                Cancel
              </button>

              <button
               onClick={handleSubmit} 
              style={style.saveButton}>
                Add Pet
              </button>

            </div>

          </div>

        </div>

      )}

      {showEditPet && (
        <div style={style.overlay}>
        
          <div style={style.addPetPanel}>
      
            {/* HEADER */}
            <div style={style.panelHeader}>
              <div>
                <h2 style={style.panelTitle}>Edit Pet</h2>
                <p style={style.panelSubtitle}>
                  Update your pet's information
                </p>
              </div>
      
              <button
                style={style.closeButton}
                onClick={() => setShowEditPet(false)}
              >
                ✕
              </button>
            </div>
      
      
            {/* PET NAME */}
            <div style={style.formGroup}>
              <label style={style.label}>Pet Name</label>
      
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                style={style.input}
              />
            </div>
      
      
            {/* SPECIES */}
            <div style={style.formGroup}>
              <label style={style.label}>Species</label>
      
              <input
                type="text"
                name="species"
                value={editFormData.species}
                onChange={handleEditChange}
                style={style.input}
              />
            </div>
      
      
            {/* AGE */}
            <div style={style.formGroup}>
              <label style={style.label}>Age</label>
      
              <input
                type="number"
                name="age"
                value={editFormData.age}
                onChange={handleEditChange}
                style={style.input}
              />
            </div>
      
      
            {/* PHOTO */}
            <div style={style.formGroup}>
              <label style={style.label}>Change Photo</label>
      
              <input
                type="file"
                name="photo_url"
                accept="image/*"
                onChange={handleEditChange}
                style={style.input}
              />
            </div>
      
      
            {/* BUTTONS */}
            <div style={style.panelButtons}>
      
              <button
                type="button"
                style={style.cancelButton}
                onClick={() => setShowEditPet(false)}
              >
                Cancel
              </button>
      
              <button
                onClick={handleUpdate}
                style={style.saveButton}
              >
                Update Pet
              </button>
      
            </div>
      
          </div>
        </div>
      )}

    </div>
  );
}

export default MyPets;



const style = {

  // PAGE
  page: {
    minHeight: "100vh",
    backgroundColor: "#F3EEF9",
    padding: "35px",
    maxWidth: "1400px",
    margin: "0 auto",
    boxSizing: "border-box"
  },


  // FIRST DIV
  firstDiv: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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

  addButton: {
    backgroundColor: "#5B4DB7",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "14px 25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },


  // SECOND DIV - PET CARDS
  secondDiv: {
    width: "100%",
    minHeight: "450px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    alignItems: "start"
  },

  petCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "15px",
    boxSizing: "border-box",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.12)"
  },

  petImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    display: "block"
  },

  petInfo: {
    paddingTop: "15px"
  },

  petName: {
    margin: "0 0 15px 0",
    fontSize: "24px",
    fontWeight: "bold"
  },

  petDetail: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginBottom: "12px",
    fontSize: "16px",
    color: "#333"
  },


  actionButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "15px"
  },


  // THIRD DIV
  thirdDiv: {
    width: "100%",
    height: "150px",
    marginTop: "30px",
    border: "1px solid #D8CFF3",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  pawIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "2px solid #CFC5F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },

  bottomTitle: {
    margin: "10px 0 5px 0",
    color: "#5B4DB7"
  },

  bottomText: {
    margin: "0",
    color: "#555"
  },


  // OVERLAY
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },


  // ADD PET PANEL
  addPetPanel: {
    width: "450px",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box"
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px"
  },

  panelTitle: {
    margin: "0",
    fontSize: "26px"
  },

  panelSubtitle: {
    margin: "5px 0 0 0",
    color: "#777"
  },

  closeButton: {
    border: "none",
    backgroundColor: "transparent",
    fontSize: "20px",
    cursor: "pointer"
  },


  // IMAGE
  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  },

  imageCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#F3EEF9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "35px"
  },

  uploadButton: {
    color: "#5B4DB7",
    fontWeight: "bold",
    cursor: "pointer"
  },


  // FORM
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginBottom: "15px"
  },

  label: {
    fontWeight: "bold",
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D8D3E8",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "white"
  },


  // PANEL BUTTONS
  panelButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "25px"
  },

  cancelButton: {
    padding: "11px 22px",
    borderRadius: "8px",
    border: "1px solid #5B4DB7",
    backgroundColor: "white",
    color: "#5B4DB7",
    fontWeight: "bold",
    cursor: "pointer"
  },

  saveButton: {
    padding: "11px 22px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#5B4DB7",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }

};