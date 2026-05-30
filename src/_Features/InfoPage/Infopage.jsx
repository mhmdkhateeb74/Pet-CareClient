import React from 'react';
import infopic from "../../assets/infopic.jpg";

function Infopage(props) {

    return (
        <div style={styles.page}>

            <section style={styles.hero}>

                <div style={styles.textBox}>

                    <p style={styles.badge}>
                        ABOUT US
                    </p>

                    <h1 style={styles.title}>
                        We Care About <br /> Your Pets
                    </h1>

                    <p style={styles.description}>
                        At Pet Care, we treat your pets like family.
                        Our experienced veterinarians provide loving care,
                        modern facilities, and personalized attention.
                    </p>

                    <div style={styles.features}>
                        <p>🐶 Caring For Every Pet</p>
                        <p>💉 Preventive Health Services</p>
                        <p>❤️ Your Pet's Health Comes First</p>
                    </div>

                </div>

                <div style={styles.imageBox}>
                    <img
                        style={styles.image}
                        src={infopic}
                        alt="Pet Care"
                    />
                </div>

            </section>

            <section style={styles.cardsContainer}>

                <div style={styles.card}>
                    <h3>🩺 Health Checkups</h3>
                    <p>
                        Regular checkups to keep your pet healthy.
                    </p>
                </div>

                <div style={styles.card}>
                    <h3>💉 Vaccinations</h3>
                    <p>
                        Protect your pet with safe vaccines.
                    </p>
                </div>

                <div style={styles.card}>
                    <h3>✂️ Grooming</h3>
                    <p>
                        Professional grooming for clean pets.
                    </p>
                </div>

            </section>

            <section style={styles.whyChooseUs}>

                <h2 style={styles.sectionTitle}>
                    Why Choose Us?
                </h2>

                <div style={styles.whyCards}>

                    <div style={styles.whyCard}>
                        <h3>🐾 Experienced Vets</h3>
                        <p>
                            Our veterinarians have years of experience caring for pets.
                        </p>
                    </div>

                    <div style={styles.whyCard}>
                        <h3>❤️ Compassionate Care</h3>
                        <p>
                            We treat every pet with love, kindness and respect.
                        </p>
                    </div>

                    <div style={styles.whyCard}>
                        <h3>🏥 Modern Facilities</h3>
                        <p>
                            Equipped with modern tools to provide the best care.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

const styles = {

    page: {
        minHeight: "100vh",
        backgroundColor: "#F3EEF9",
        padding: "60px"
    },

    hero: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "80px"
    },

    textBox: {
        width: "40%"
    },

    badge: {
        color: "#6D5C7B",
        fontWeight: "bold",
        marginBottom: "10px"
    },

    title: {
        color: "#4B3F72",
        fontSize: "55px",
        margin: 0
    },

    description: {
        color: "#555",
        fontSize: "18px",
        lineHeight: "1.6"
    },

    features: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        color: "#4B3F72",
        fontSize: "18px",
        fontWeight: "600"
    },

    imageBox: {
        width: "500px",
        height: "320px",
        borderRadius: "45px",
        overflow: "hidden",
        backgroundColor: "#CDB4DB",
        boxShadow: "0 15px 35px rgba(0,0,0,0.12)"
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },

    cardsContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        marginTop: "70px"
    },

    card: {
        width: "250px",
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    },

    whyChooseUs: {
        marginTop: "80px",
        textAlign: "center"
    },

    sectionTitle: {
        color: "#4B3F72",
        fontSize: "40px",
        marginBottom: "40px"
    },

    whyCards: {
        display: "flex",
        justifyContent: "center",
        gap: "25px"
    },

    whyCard: {
        width: "280px",
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    }

};

export default Infopage;