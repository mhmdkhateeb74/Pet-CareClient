
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllAnimals,
  useGetAllUsers,
  useGetAllVisiters,
  useUpdateVisit,
  useAddVaccine,
} from "../../API/apiHook";

function DoctorVisits() {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data: AllAnimals, isLoading: isAnimals } = useGetAllAnimals();
  const { data: AllUsers, isLoading: isUsers } = useGetAllUsers();
  const { data: AllVisiters, isLoading: isVisits } = useGetAllVisiters();

  const { updateVisit, IsUpdatingVisit } = useUpdateVisit();
  const { addVaccine, IsAddingVaccine } = useAddVaccine();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedVisitId, setSelectedVisitId] = useState(null);

  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    vet_notes: "",
  });

  const [vaccineData, setVaccineData] = useState({
    type: "",
    date_given: "",
    next_due: "",
  });

  const [message, setMessage] = useState("");

  if (isAnimals || isUsers || isVisits) {
    return <p>Trying to Load...</p>;
  }

  if (!AllAnimals || !AllUsers || !AllVisiters) {
    return <p>Unable to load data.</p>;
  }

  if (!user || !user.vet_id) {
    return <p>Doctor login required.</p>;
  }

  const Animals = AllAnimals.list;
  const Users = AllUsers.list;
  const Visits = AllVisiters.list;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getVisitDate = (value) => {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const DoctorVisitsList = Visits.filter(
    (visit) => Number(visit.vet_id) === Number(user.vet_id)
  );

  const FilteredVisits = DoctorVisitsList
    .filter((visit) => {
      const visitDate = getVisitDate(visit.visit_date);

      if (activeTab === "upcoming") {
        return visitDate >= today;
      }

      return visitDate < today;
    })
    .sort((a, b) => {
      if (activeTab === "upcoming") {
        return new Date(a.visit_date) - new Date(b.visit_date);
      }

      return new Date(b.visit_date) - new Date(a.visit_date);
    });

  const selectedVisit = DoctorVisitsList.find(
    (visit) => Number(visit.visit_id) === Number(selectedVisitId)
  );

  const selectedAnimal = Animals.find(
    (animal) => Number(animal.animal_id) === Number(selectedVisit?.animal_id)
  );

  const selectedOwner = Users.find(
    (owner) => Number(owner.user_id) === Number(selectedAnimal?.owner_id)
  );

  const canEdit =
    selectedVisit &&
    getVisitDate(selectedVisit.visit_date) <= today;

  const handleSelectVisit = (visit) => {
    setSelectedVisitId(visit.visit_id);

    setFormData({
      diagnosis: visit.diagnosis || "",
      treatment: visit.treatment || "",
      vet_notes: visit.vet_notes || "",
    });

    setVaccineData({
      type: "",
      date_given: "",
      next_due: "",
    });

    setMessage("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedVisitId(null);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVaccineChange = (e) => {
    const { name, value } = e.target;

    setVaccineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {

    if (!selectedVisit || !canEdit || IsUpdatingVisit) return;

    setMessage("");

    updateVisit(
        {
            visit_id: selectedVisit.visit_id,
            animal_id: selectedVisit.animal_id,
            vet_id: selectedVisit.vet_id,
            visit_date: selectedVisit.visit_date,
            diagnosis: formData.diagnosis,
            treatment: formData.treatment,
            vet_notes: formData.vet_notes
        },
        {
            onSuccess: () => {
                setMessage("Visit details saved successfully!");
            },

            onError: (error) => {
                setMessage(error.message);
            }
        }
    );

};

  const handleAddVaccination = () => {
    if (!selectedVisit || !canEdit || IsAddingVaccine) return;

    if (
      !vaccineData.type.trim() ||
      !vaccineData.date_given ||
      !vaccineData.next_due
    ) {
      setMessage("Please complete all vaccination fields.");
      return;
    }

    if (vaccineData.next_due <= vaccineData.date_given) {
      setMessage("Next due date must be after date given.");
      return;
    }

    const givenDate = new Date(`${vaccineData.date_given}T00:00:00`);

    if (givenDate > new Date()) {
      setMessage("Cannot record a future vaccination.");
      return;
    }

    setMessage("");

    addVaccine(
      {
        animal_id: selectedVisit.animal_id,
        vet_id: user.vet_id,
        type: vaccineData.type.trim(),
        date_given: vaccineData.date_given,
        next_due: vaccineData.next_due,
      },
      {
        onSuccess: () => {
          setVaccineData({
            type: "",
            date_given: "",
            next_due: "",
          });

          setMessage("Vaccination added successfully!");
        },
        onError: (error) => {
          setMessage(error.message);
        },
      }
    );
  };

  const handleCancel = () => {
    setSelectedVisitId(null);
    setMessage("");

    setFormData({
      diagnosis: "",
      treatment: "",
      vet_notes: "",
    });

    setVaccineData({
      type: "",
      date_given: "",
      next_due: "",
    });
  };

  return (
    <div style={style.page}>

      <div style={style.container}>

        <Link to="/Doctor" style={style.backLink}>
          ← Back To The Doctor Page
        </Link>

        <div style={style.titleSection}>
          <h1 style={style.title}>Doctor Visits</h1>

          <p style={style.subtitle}>
            Manage your scheduled visits and add medical details after each appointment.
          </p>
        </div>

        <div style={style.mainLayout}>

          <div style={style.leftSection}>

            <div style={style.tabs}>
              <button
                type="button"
                style={activeTab === "upcoming" ? style.activeTab : style.tab}
                onClick={() => handleTabChange("upcoming")}
              >
                Upcoming Visits
              </button>

              <button
                type="button"
                style={activeTab === "past" ? style.activeTab : style.tab}
                onClick={() => handleTabChange("past")}
              >
                Past Visits
              </button>
            </div>

            <div style={style.visitsBox}>

              <div style={style.visitsHeader}>
                <span>Pet</span>
                <span>Owner</span>
                <span>Appointment</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {FilteredVisits.length === 0 && (
                <p style={style.emptyText}>No visits found.</p>
              )}

              {FilteredVisits.map((visit) => {

                const animal = Animals.find(
                  (animal) =>
                    Number(animal.animal_id) === Number(visit.animal_id)
                );

                const owner = Users.find(
                  (owner) =>
                    Number(owner.user_id) === Number(animal?.owner_id)
                );

                const isFuture = getVisitDate(visit.visit_date) > today;

                return (
                  <div key={visit.visit_id} style={style.visitRow}>

                    <div style={style.petInfo}>
                      {animal?.photo_url && (
                        <img
                          src={`http://localhost:6127${animal.photo_url}`}
                          alt={animal.name}
                          style={style.petImage}
                        />
                      )}

                      <div>
                        <h3 style={style.petName}>
                          {animal?.name || "Unknown"}
                        </h3>
                        <p style={style.smallText}>
                          {animal?.species || "-"}
                        </p>
                      </div>
                    </div>

                    <div style={style.ownerInfo}>
                      <h4 style={style.ownerName}>
                        {owner?.name || "Unknown"}
                      </h4>
                      <p style={style.smallText}>
                        {owner?.email || "-"}
                      </p>
                    </div>

                    <div>
                      <p style={style.date}>
                        {formatDate(visit.visit_date)}
                      </p>
                    </div>

                    <div>
                      <span
                        style={
                          isFuture
                            ? style.upcomingBadge
                            : style.pastBadge
                        }
                      >
                        {isFuture ? "Upcoming" : "Today / Past"}
                      </span>
                    </div>

                    <button
                      type="button"
                      style={style.viewButton}
                      onClick={() => handleSelectVisit(visit)}
                    >
                      View
                    </button>

                  </div>
                );
              })}
            </div>
          </div>

          <div style={style.detailsCard}>

            {!selectedVisit ? (
              <div style={style.emptyDetails}>
                <h2>Select a Visit</h2>
                <p>Click View to see the pet's medical details.</p>
              </div>
            ) : (
              <>
                <div style={style.detailsTop}>

                  {selectedAnimal?.photo_url && (
                    <img
                      src={`http://localhost:6127${selectedAnimal.photo_url}`}
                      alt={selectedAnimal.name}
                      style={style.detailsPetImage}
                    />
                  )}

                  <div>
                    <h2 style={style.detailsPetName}>
                      {selectedAnimal?.name || "Unknown"}
                    </h2>

                    <p style={style.smallText}>
                      {selectedAnimal?.species || "-"} •{" "}
                      {selectedAnimal?.age ?? "-"} years old
                    </p>

                    <p style={style.detailsOwner}>
                      Owner: {selectedOwner?.name || "Unknown"}
                    </p>

                    <p style={style.smallText}>
                      {selectedOwner?.email || "-"}
                    </p>
                  </div>

                </div>

                <div style={style.appointmentBox}>
                  <div>
                    <p style={style.label}>Visit Date</p>
                    <h3 style={style.appointmentDate}>
                      {formatDate(selectedVisit.visit_date)}
                    </h3>
                  </div>

                  <span
                    style={
                      canEdit
                        ? style.pastBadge
                        : style.upcomingBadge
                    }
                  >
                    {canEdit ? "Today / Past" : "Upcoming"}
                  </span>
                </div>

                {!canEdit && (
                  <p style={style.notice}>
                    Medical details and vaccinations can be recorded
                    on or after the visit date.
                  </p>
                )}

                <div style={style.formSection}>

                  <div style={style.formGroup}>
                    <label style={style.formLabel}>
                      Diagnosis
                    </label>

                    <textarea
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      disabled={!canEdit}
                      style={style.textarea}
                      placeholder="Enter diagnosis..."
                    />
                  </div>

                  <div style={style.formGroup}>
                    <label style={style.formLabel}>
                      Treatment
                    </label>

                    <textarea
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      disabled={!canEdit}
                      style={style.textarea}
                      placeholder="Enter treatment..."
                    />
                  </div>

                  <div style={style.formGroup}>
                    <label style={style.formLabel}>
                      Vet Notes
                    </label>

                    <textarea
                      name="vet_notes"
                      value={formData.vet_notes}
                      onChange={handleChange}
                      disabled={!canEdit}
                      style={style.textarea}
                      placeholder="Enter vet notes..."
                    />
                  </div>

                  <div style={style.vaccinationSection}>

                    <div style={style.vaccinationHeader}>
                      <h3 style={style.vaccinationTitle}>
                        Vaccinations
                      </h3>

                      <p style={style.vaccinationSubtitle}>
                        Record a vaccine given during this visit.
                      </p>
                    </div>

                    <div style={style.formGroup}>
                      <label style={style.formLabel}>
                        Vaccine Name
                      </label>

                      <input
                        type="text"
                        name="type"
                        value={vaccineData.type}
                        onChange={handleVaccineChange}
                        disabled={!canEdit}
                        placeholder="Enter vaccine name..."
                        style={style.vaccineInput}
                      />
                    </div>

                    <div style={style.vaccineDates}>

                      <div style={style.formGroup}>
                        <label style={style.formLabel}>
                          Date Given
                        </label>

                        <input
                          type="date"
                          name="date_given"
                          value={vaccineData.date_given}
                          onChange={handleVaccineChange}
                          disabled={!canEdit}
                          style={style.vaccineInput}
                        />
                      </div>

                      <div style={style.formGroup}>
                        <label style={style.formLabel}>
                          Next Due Date
                        </label>

                        <input
                          type="date"
                          name="next_due"
                          value={vaccineData.next_due}
                          onChange={handleVaccineChange}
                          disabled={!canEdit}
                          style={style.vaccineInput}
                        />
                      </div>

                    </div>

                    <button
                      type="button"
                      style={style.addVaccineButton}
                      onClick={handleAddVaccination}
                      disabled={!canEdit || IsAddingVaccine}
                    >
                      {IsAddingVaccine ? "Adding..." : "+ Add Vaccination"}
                    </button>

                  </div>

                  {message && (
                    <p style={style.message}>{message}</p>
                  )}

                  <div style={style.buttonGroup}>

                    <button
                      type="button"
                      style={style.saveButton}
                      onClick={handleSaveChanges}
                      disabled={!canEdit || IsUpdatingVisit}
                    >
                      {IsUpdatingVisit ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      style={style.cancelButton}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              </>
            )}

          </div>

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

  container: {
    width: "86%",
    margin: "0 auto"
  },

  backLink: {
    display: "inline-block",
    marginBottom: "22px",
    color: "#5B4DB7",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold"
  },

  titleSection: {
    marginBottom: "28px"
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "bold"
  },

  subtitle: {
    margin: "8px 0 0 0",
    color: "#777",
    fontSize: "17px"
  },

  mainLayout: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "22px",
    alignItems: "start"
  },

  leftSection: {
    minWidth: 0
  },

  tabs: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px"
  },

  activeTab: {
    backgroundColor: "#7659cc",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "13px 25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  tab: {
    backgroundColor: "white",
    color: "#29213e",
    border: "none",
    borderRadius: "10px",
    padding: "13px 25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  visitsBox: {
    backgroundColor: "white",
    borderRadius: "22px",
    padding: "15px",
    overflowX: "auto"
  },

  visitsHeader: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1.5fr 1fr 0.9fr 0.7fr",
    gap: "12px",
    alignItems: "center",
    padding: "16px 12px",
    borderBottom: "2px solid #eee",
    color: "#666",
    fontWeight: "bold",
    fontSize: "14px",
    minWidth: "650px"
  },

  visitRow: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1.5fr 1fr 0.9fr 0.7fr",
    gap: "12px",
    alignItems: "center",
    padding: "18px 12px",
    borderBottom: "1px solid #eee",
    minWidth: "650px"
  },

  petInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  petImage: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  petName: {
    margin: "0 0 5px 0",
    fontSize: "17px"
  },

  smallText: {
    margin: "4px 0",
    color: "#888",
    fontSize: "13px",
    overflowWrap: "anywhere"
  },

  ownerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },

  ownerName: {
    margin: 0,
    fontSize: "15px"
  },

  date: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "bold"
  },

  upcomingBadge: {
    display: "inline-block",
    backgroundColor: "#dcf8e7",
    color: "#168348",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  pastBadge: {
    display: "inline-block",
    backgroundColor: "#eee7ff",
    color: "#6748b5",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  viewButton: {
    backgroundColor: "#f0eaff",
    color: "#7659cc",
    border: "none",
    borderRadius: "9px",
    padding: "11px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  detailsCard: {
    backgroundColor: "white",
    borderRadius: "22px",
    padding: "25px",
    boxSizing: "border-box",
    minWidth: 0
  },

  detailsTop: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    paddingBottom: "25px",
    borderBottom: "1px solid #eee"
  },

  detailsPetImage: {
    width: "100px",
    height: "100px",
    borderRadius: "15px",
    objectFit: "cover"
  },

  detailsPetName: {
    margin: "0 0 8px 0",
    fontSize: "26px"
  },

  detailsOwner: {
    margin: "12px 0 5px 0",
    fontSize: "15px",
    fontWeight: "bold"
  },

  appointmentBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    backgroundColor: "#f5effb",
    borderRadius: "15px",
    padding: "18px 20px",
    marginTop: "22px",
    marginBottom: "25px"
  },

  label: {
    margin: "0 0 7px 0",
    color: "#777",
    fontSize: "14px"
  },

  appointmentDate: {
    margin: 0,
    fontSize: "17px"
  },

  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "9px"
  },

  formLabel: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#29213e"
  },

  textarea: {
    width: "100%",
    minHeight: "85px",
    padding: "13px 15px",
    border: "1px solid #ded7ed",
    borderRadius: "12px",
    backgroundColor: "white",
    fontSize: "15px",
    fontFamily: "inherit",
    resize: "vertical",
    outlineColor: "#7659cc",
    boxSizing: "border-box"
  },

  vaccinationSection: {
    backgroundColor: "#faf7ff",
    border: "1px solid #e8def7",
    borderRadius: "16px",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginTop: "10px"
  },

  vaccinationHeader: {
    borderBottom: "1px solid #e8def7",
    paddingBottom: "14px"
  },

  vaccinationTitle: {
    margin: "0 0 7px 0",
    fontSize: "21px",
    fontWeight: "bold",
    color: "#29213e"
  },

  vaccinationSubtitle: {
    margin: 0,
    color: "#777",
    fontSize: "14px"
  },

  vaccineInput: {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #ded7ed",
    borderRadius: "10px",
    backgroundColor: "white",
    fontSize: "15px",
    fontFamily: "inherit",
    outlineColor: "#7659cc",
    boxSizing: "border-box"
  },

  vaccineDates: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },

  addVaccineButton: {
    width: "100%",
    backgroundColor: "#f0eaff",
    color: "#7659cc",
    border: "1px solid #ded1f7",
    borderRadius: "10px",
    padding: "13px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  buttonGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "5px"
  },

  saveButton: {
    backgroundColor: "#7659cc",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  cancelButton: {
    backgroundColor: "#f0eaff",
    color: "#29213e",
    border: "none",
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  notice: {
    backgroundColor: "#fff5df",
    padding: "13px",
    borderRadius: "10px",
    color: "#805900",
    fontSize: "14px"
  },

  message: {
    backgroundColor: "#f0eaff",
    padding: "13px",
    borderRadius: "10px",
    color: "#4c388c"
  },

  emptyText: {
    padding: "25px",
    textAlign: "center",
    color: "#777"
  },

  emptyDetails: {
    textAlign: "center",
    padding: "50px 10px",
    color: "#777"
  }

};

export default DoctorVisits;
