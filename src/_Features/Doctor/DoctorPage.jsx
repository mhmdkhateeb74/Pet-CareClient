import React from 'react'
import protpet from "../../assets/propet.png";
import {
  useGetAllVet,
  useGetAllVisiters,
  useGetAllVaccines,

} from "../API/apiHook"

function DoctorPage() {

  const user = JSON.parse(localStorage.getItem("user"));
  
  const {data: AllVets,  isLoading: IsVet} = useGetAllVet();
  const { data: AllVisiters, isLoading: IsVisiters } = useGetAllVisiters();
  const { data: AllVaccines, isLoading: IsVaccines } = useGetAllVaccines();
  
  if (IsVet || IsVisiters || IsVaccines) {
    return <p>Trying to Load...</p>;
  }
  
  const Vets = AllVets.list;
  const Visits = AllVisiters.list;
  const Vaccines = AllVaccines.list;
  

  const Doctor = Vets.find((vet) => {
    return vet.vet_id === user.vet_id;
  });

  if (!Doctor) {
    return <p>Doctor not found</p>;
  }
  
  function CountDoctorVisits() {

    let count = 0;

    Visits.forEach((visit) => {

      if (visit.vet_id === Doctor.vet_id) {
        count++;
      }

    });

    return count;
  }

  function CountDoctorTodayVisits() {

    let count = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    Visits.forEach((visit) => {

      const visitDate = new Date(visit.visit_date);
      visitDate.setHours(0, 0, 0, 0);

      if (visit.vet_id === Doctor.vet_id &&
        visitDate.getTime() === today.getTime()) {
        count++;
      }

    });

    return count;
  }

  function CountDoctorPatients() {

    let Patients = [];
  
    Visits.forEach((visit) => {
  
      if (visit.vet_id === Doctor.vet_id) {
  
        const Patient = Patients.find((animal_id) => {
          return animal_id === visit.animal_id;
        });
  
        if (Patient === undefined) {
          Patients.push(visit.animal_id);
        }
  
      }
  
    });
  
    return Patients.length;
  }

  function CountDoctorVaccinationsDue() {

    let count = 0;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    Vaccines.forEach((vaccine) => {
  
      const dueDate = new Date(vaccine.next_due);
      dueDate.setHours(0, 0, 0, 0);
  
      if (
        vaccine.vet_id === Doctor.vet_id &&
        dueDate.getTime() <= today.getTime()
      ) {
        count++;
      }
  
    });
  
    return count;
  }

  return (
    <div style={style.page}>
  
      <div style={style.firstDiv}>
  
        <div style={style.profito}>
  
          <img
            src="/src/assets/doctor.png"
            alt="Doctor"
            style={style.profileImage}
          />
  
          <div style={style.profileInfo}>
  
            <h4>Welcome back,</h4>
  
            <h2>
              Dr.{Doctor.full_name}
              <span style={{ color: "#8B7CE8" }}> 🐾</span>
            </h2>
  
  
            <p>We're glad to have you here!</p>
  
          </div>
  
        </div>
  
  
        <div style={style.profitopet}>
  
          <p>Caring for pets,</p>
  
          <h1>
            Our Priority
            <span style={{ color: "#8B7CE8" }}> ♥</span>
          </h1>
  
          <p>
            Providing the best care and
            <br />
            professional treatment for
            <br />
            every furry friend.
          </p>
  
        </div>
  
      </div>
  
  
  
      <div style={style.secondDiv}>
  
        <h3>Quick OverView</h3>
  
        <div style={style.OverViewBoxs}>
  
  
          <div style={style.overview}>
  
            <div
              style={{
                ...style.overviewIcon,
                backgroundColor: "#8B7CE8"
              }}
            >
              📅
            </div>
  
            <div style={style.overviewInfo}>
  
              <h2 style={style.overviewCount}>
                {CountDoctorTodayVisits()}
              </h2>
  
              <p style={style.overviewTitle}>
                Today's Appointments
              </p>
  
              <p style={style.overviewText}>
                Your scheduled visits
              </p>
  
            </div>
  
          </div>
  
  
          <div style={style.overview}>
  
            <div
              style={{
                ...style.overviewIcon,
                backgroundColor: "#5DD394"
              }}
            >
              🐾
            </div>
  
            <div style={style.overviewInfo}>
  
              <h2 style={style.overviewCount}>
                {CountDoctorPatients()}
              </h2>
  
              <p style={style.overviewTitle}>
                Total Patients
              </p>
  
              <p style={style.overviewText}>
                All registered patients
              </p>
  
            </div>
  
          </div>
  
  
          <div style={style.overview}>
  
            <div
              style={{
                ...style.overviewIcon,
                backgroundColor: "#FFA726"
              }}
            >
              💉
            </div>
  
            <div style={style.overviewInfo}>
  
              <h2 style={style.overviewCount}>
                {CountDoctorVaccinationsDue()}
              </h2>
  
              <p style={style.overviewTitle}>
                Vaccinations Due
              </p>
  
              <p style={style.overviewText}>
                Upcoming vaccinations
              </p>
  
            </div>
  
          </div>
  
  
          <div style={style.overview}>
  
            <div
              style={{
                ...style.overviewIcon,
                backgroundColor: "#E85D75"
              }}
            >
              📋
            </div>
  
            <div style={style.overviewInfo}>
  
              <h2 style={style.overviewCount}>
                {CountDoctorVisits()}
              </h2>
  
              <p style={style.overviewTitle}>
                Total Visits
              </p>
  
              <p style={style.overviewText}>
                All time visits
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
  
  
      <div style={style.thirdDiv}>
  
  
        <div style={style.appointmentsSection}>
  
          <h3>Today's Appointments</h3>
  
          <div style={style.appointmentsBox}>
  
            <div style={style.appointment}>
  
              <div style={style.emptyAppointments}>
                Today's appointments will appear here
              </div>
  
            </div>
  
          </div>
  
        </div>
  
  
  
        <div style={style.rightSection}>
  
          <h3>Pet Tips</h3>
  
          <div style={style.tipsBox}>
  
            <div style={style.tipIcon}>
              ✓
            </div>
  
            <div style={style.tipInfo}>
  
              <h3 style={style.tipTitle}>
                Regular check-ups keep pets healthy
              </h3>
  
              <p style={style.tipText}>
                Routine examinations help detect health issues
                <br />
                early and keep every furry friend happy.
              </p>
  
            </div>
  
          </div>
  
  
          <h3 style={style.quickTitle}>
            Quick Actions
          </h3>
  
          <div style={style.quickActions}>
  
            <button style={style.actionPurple}>
              🐾 View Patients
            </button>
  
            <button style={style.actionGreen}>
              📅 View Visits
            </button>
  
            <button style={style.actionOrange}>
              💉 Add Vaccination
            </button>
  
            <button style={style.actionRed}>
              📋 View Reports
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    </div>
  );
}

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
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box"
  },


  profileImage: {
    borderRadius: "100px",
    width: "200px",
    height: "200px"
  },


  profileInfo: {
    width: "70%",
    height: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    boxSizing: "border-box"
  },




  profitopet: {
    height: "100%",
    width: "65%",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "15px",
    backgroundImage: `url(${protpet})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxSizing: "border-box"
  },


  secondDiv: {
    width: "100%",
    height: "160px"
  },


  OverViewBoxs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px"
  },


  overview: {
    flex: 1,
    height: "120px",
    backgroundColor: "white",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "18px",
    padding: "20px",
    boxSizing: "border-box"
  },


  overviewIcon: {
    width: "60px",
    height: "60px",
    minWidth: "60px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px"
  },


  overviewInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },


  overviewCount: {
    margin: "0",
    fontSize: "28px"
  },


  overviewTitle: {
    margin: "2px 0",
    fontSize: "16px",
    fontWeight: "bold"
  },


  overviewText: {
    margin: "0",
    fontSize: "14px",
    color: "#777"
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


  appointmentsSection: {
    width: "65%",
    height: "100%"
  },


  appointmentsBox: {
    width: "100%",
    height: "300px",
    backgroundColor: "white",
    borderRadius: "15px",
    overflowY: "auto"
  },


  appointment: {
    width: "100%",
    minHeight: "90px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 25px",
    boxSizing: "border-box",
    borderBottom: "1px solid #eee"
  },


  emptyAppointments: {
    width: "100%",
    textAlign: "center",
    color: "#777",
    fontSize: "15px"
  },


  rightSection: {
    width: "35%",
    height: "100%"
  },


  tipsBox: {
    width: "100%",
    height: "140px",
    backgroundColor: "#F3FAF3",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "25px",
    padding: "25px 35px",
    boxSizing: "border-box"
  },


  tipIcon: {
    width: "55px",
    height: "55px",
    minWidth: "55px",
    borderRadius: "50%",
    backgroundColor: "#DDF3DF",
    color: "#42B95C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold"
  },


  tipInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },


  tipTitle: {
    margin: "0 0 10px 0",
    color: "#16752C",
    fontSize: "17px",
    fontWeight: "bold"
  },


  tipText: {
    margin: "0",
    color: "#444",
    fontSize: "14px",
    lineHeight: "1.5"
  },


  quickTitle: {
    marginTop: "20px",
    marginBottom: "10px"
  },


  quickActions: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },


  actionPurple: {
    height: "55px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#EEE9FF",
    color: "#6F5DD8",
    fontWeight: "bold",
    cursor: "pointer"
  },


  actionGreen: {
    height: "55px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#E6F8EF",
    color: "#299A61",
    fontWeight: "bold",
    cursor: "pointer"
  },


  actionOrange: {
    height: "55px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#FFF4DD",
    color: "#E59419",
    fontWeight: "bold",
    cursor: "pointer"
  },


  actionRed: {
    height: "55px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#FDE8EC",
    color: "#D94B66",
    fontWeight: "bold",
    cursor: "pointer"
  }

};

export default DoctorPage