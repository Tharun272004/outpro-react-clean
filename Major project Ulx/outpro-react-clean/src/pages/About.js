import "./About.css";

function About() {
  return (
    // About Section
    <section className="about" id="about">
      <div className="about-container">
        <h1>About Us</h1>

        <p className="about-intro">
          Outpro.India is a corporate digital solutions company focused on
          delivering high-quality, scalable, and performance-driven digital
          products for modern businesses.
        </p>

        <div className="about-sections">
          {/* Mission */}
          <div className="about-box mission">
            <div className="about-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              To empower businesses with innovative digital solutions that
              drive growth, enhance customer experiences, and create long-term
              value.
            </p>
          </div>

          {/* Vision */}
          <div className="about-box vision">
            <div className="about-icon">👁️</div>
            <h2>Our Vision</h2>
            <p>
              To be the leading digital partner for businesses in India,
              recognized for excellence, innovation, and commitment to client
              success.
            </p>
          </div>

          {/* Values */}
          <div className="about-box values">
            <div className="about-icon">❤️</div>
            <h2>Our Values</h2>
            <p>
              Integrity, innovation, collaboration, and excellence guide
              everything we do. We believe in building lasting relationships
              with our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
