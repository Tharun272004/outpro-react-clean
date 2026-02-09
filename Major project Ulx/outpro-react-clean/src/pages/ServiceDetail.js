import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { id } = useParams();

  const serviceDetails = {
    "web-development": {
      title: "Web Development",
      icon: "🌐",
      description:
        "Our web development services deliver high-performance, scalable, and secure solutions tailored to your business needs.",
      technologies: [
        "React.js / Next.js",
        "Node.js & Express",
        "MongoDB / PostgreSQL",
        "REST APIs"
      ],
      process: [
        "Requirement Analysis",
        "UI/UX Design",
        "Development & Testing",
        "Deployment & Support"
      ]
    },
    "software-solutions": {
      title: "Software Solutions",
      icon: "🧩",
      description:
        "Custom-built enterprise software solutions designed to improve efficiency and scalability.",
      technologies: [
        "Custom Software Development",
        "Enterprise Systems",
        "API Integration"
      ],
      process: [
        "Consultation",
        "Agile Development",
        "Quality Assurance",
        "Maintenance"
      ]
    },
    "ui-ux-design": {
      title: "UI / UX Design",
      icon: "🎨",
      description:
        "User-centered designs that enhance usability, accessibility, and engagement.",
      technologies: ["Figma", "Adobe XD", "Design Systems"],
      process: [
        "User Research",
        "Wireframing",
        "Visual Design",
        "Usability Testing"
      ]
    },
    "digital-consulting": {
      title: "Digital Consulting",
      icon: "📊",
      description:
        "Helping businesses adopt the right digital strategies and technologies.",
      technologies: [
        "Digital Strategy",
        "Technology Assessment",
        "Process Optimization"
      ],
      process: [
        "Initial Consultation",
        "Strategy Planning",
        "Implementation Support",
        "Performance Review"
      ]
    },
    "cloud-solutions": {
      title: "Cloud Solutions",
      icon: "☁️",
      description:
        "Secure and scalable cloud infrastructure and migration services.",
      technologies: ["AWS", "Azure", "Google Cloud"],
      process: [
        "Assessment",
        "Migration",
        "Optimization",
        "Security & Monitoring"
      ]
    },
    "mobile-app-development": {
      title: "Mobile App Development",
      icon: "📱",
      description:
        "Cross-platform and native mobile applications with modern UX.",
      technologies: ["React Native", "Flutter", "iOS / Android"],
      process: [
        "Planning",
        "Design & Prototyping",
        "Development",
        "Deployment & Maintenance"
      ]
    }
  };

  const service = serviceDetails[id];

  if (!service) {
    return <h2 style={{ padding: "40px" }}>Service not found</h2>;
  }

  return (
    <>
      <Helmet>
        <title>{service.title} | Outpro.India</title>
        <meta
          name="description"
          content={service.description}
        />
      </Helmet>

      <section className="service-detail">
        <div className="service-detail-container">
          <div className="service-detail-icon">{service.icon}</div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>

          <h2>Technologies Used</h2>
          <ul>
            {service.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>

          <h2>Our Process</h2>
          <ol>
            {service.process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
export default ServiceDetail;



