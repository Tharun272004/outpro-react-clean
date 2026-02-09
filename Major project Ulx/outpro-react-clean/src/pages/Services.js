import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Services.css";

function Services() {
  const services = [
    {
      id: "web-development",
      title: "Web Development",
      icon: "🌐",
      description:
        "Custom, scalable, and secure web solutions using modern technologies."
    },
    {
      id: "software-solutions",
      title: "Software Solutions",
      icon: "🧩",
      description:
        "Enterprise software tailored to specific business requirements."
    },
    {
      id: "ui-ux-design",
      title: "UI / UX Design",
      icon: "🎨",
      description:
        "User-focused interface designs for better engagement and usability."
    },
    {
      id: "digital-consulting",
      title: "Digital Consulting",
      icon: "📊",
      description:
        "Expert guidance to adopt the right digital strategies and tools."
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions",
      icon: "☁️",
      description:
        "Scalable cloud infrastructure and migration services."
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      icon: "📱",
      description:
        "Native and cross-platform mobile applications."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Outpro.India</title>
        <meta
          name="description"
          content="Explore web development, cloud solutions, UI/UX design, and digital consulting services."
        />
      </Helmet>

      <section className="services-page">
        <div className="services-container">
          <h1>Our Services</h1>
          <p className="services-intro">
            We offer a comprehensive range of digital services designed to help
            businesses grow, innovate, and scale effectively.
          </p>

          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services/${service.id}`} className="service-link">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;

