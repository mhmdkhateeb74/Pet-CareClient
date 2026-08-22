import React, { useState } from "react";
import { useRegisterPetApi,useGetAllVet } from "./apiHook";

function MyPets() {

  const [showAddPet, setShowAddPet] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    setFormData(prevData => ({
      ...prevData,
      [name]: name === "photo_url" ? files[0] : value
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();

    RegisterPet(formData, {
      onSuccess: () => {
          setShowAddPet(false);
      }
  });
};

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

    </div>
  );
}

export default MyPets;



const style = {

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


  // SECOND DIV

  secondDiv: {
    width: "100%",
    minHeight: "450px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "25px"
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


  // BUTTONS

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