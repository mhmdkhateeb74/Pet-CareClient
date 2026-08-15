import React from "react";
import protpet from "../../assets/propet.png";
import {
  useGetAllAnimals,
  useGetAllVisiters,
  useGetAllVaccines
} from "./API/apiHook";

function UserPage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const { data: AnimalsData } = useGetAllAnimals();
  const { data: VisitersData } = useGetAllVisiters();
  const { data: VaccinesData } = useGetAllVaccines();

  const Animals = AnimalsData?.list || [];
  const Visiters = VisitersData?.list || [];
  const Vaccines = VaccinesData?.list || [];

  function CountUseranimals() {
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

  function CountVaccines() {
    let count = 0;

    Animals.forEach((animal) => {
      Vaccines.forEach((vaccine) => {
        if (
          animal.owner_id === user.user_id &&
          animal.animal_id === vaccine.animal_id
        ) {
          count++;
        }
      });
    });

    return count;
  }

  function CountAllRecords() {
    return CountUserVisits() + CountVaccines();
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

          <div
            style={{
              width: "70%",
              height: "100%",
              padding: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
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
            Our Priority
            <span style={{ color: "#8B7CE8" }}> ♥</span>
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

            <div
              style={{
                ...style.overviewIcon,
                backgroundColor: "#8B7CE8"
              }}
            >
              🐾
            </div>

            <div style={style.overviewInfo}>
              <h2 style={style.overviewCount}>
                {CountUseranimals()}
              </h2>

              <p style={style.overviewTitle}>
                My Pets
              </p>

              <p style={style.overviewText}>
                View all your pets
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
              📅
            </div>

            <div style={style.overviewInfo}>
              <h2 style={style.overviewCount}>
                {CountUserVisits()}
              </h2>

              <p style={style.overviewTitle}>
                Upcoming Visits
              </p>

              <p style={style.overviewText}>
                Check scheduled visits
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
                {CountVaccines()}
              </h2>

              <p style={style.overviewTitle}>
                Vaccinations Due
              </p>

              <p style={style.overviewText}>
                Keep your pets safe
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
                  {CountAllRecords()}
                </h2>
              
                <p style={style.overviewTitle}>
                  All Records
                </p>
              
                <p style={style.overviewText}>
                  View all history
                </p>
              
              </div>
              
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
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "15px",
    backgroundImage: `url(${protpet})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
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