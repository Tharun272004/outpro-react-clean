import "./Portfolio.css";
import { Helmet } from "react-helmet-async";
import corporateWebsite from "../assets/projects/corporatewebsite.png";
import ecommerce from "../assets/projects/e-commerce.png";
import dashboard from "../assets/projects/dashboard.png";
import portfolioWebsite from "../assets/projects/portfoliowebsite.png";
import mobileAppUI from "../assets/projects/mobileappui.png";
import cloudComputing from "../assets/projects/cloudcomputing.png";
import jobPortal from "../assets/projects/jobportal.png";
import foodWebsite from "../assets/projects/foodwebsite.png";

function Portfolio() {
  const projects = [
    {
      title: "Corporate Website Revamp",
      image: corporateWebsite,
      description:
        "A modern corporate website designed to strengthen brand credibility and improve lead generation.",
      kpis: [
        "45% increase in user engagement",
        "2.1s average page load time",
        "Mobile-first responsive design"
      ],
      tech: ["React", "CSS", "UI/UX"],
      theme: "purple"
    },
    {
      title: "E-Commerce Platform",
      image: ecommerce,
      description:
        "A scalable e-commerce platform with optimized checkout flow and improved user experience.",
      kpis: [
        "30% conversion rate increase",
        "Secure payment integration",
        "Optimized performance"
      ],
      tech: ["React", "JavaScript", "API"],
      theme: "blue"
    },
    {
      title: "Business Analytics Dashboard",
      image: dashboard,
      description:
        "A real-time analytics dashboard enabling businesses to make data-driven decisions.",
      kpis: [
        "Live data visualization",
        "Improved reporting speed",
        "Role-based access control"
      ],
      tech: ["React", "Charts", "Analytics"],
      theme: "green"
    },
    {
      title: "Portfolio Website",
      image: portfolioWebsite,
      description:
        "A professional portfolio website built to showcase skills, projects, and achievements.",
      kpis: [
        "Clean UI/UX design",
        "Fast loading pages",
        "SEO-friendly structure"
      ],
      tech: ["React", "HTML", "CSS"],
      theme: "pink"
    },
    {
      title: "Mobile App UI Design",
      image: mobileAppUI,
      description:
        "A sleek mobile application interface designed for seamless user interaction.",
      kpis: [
        "User-friendly navigation",
        "Consistent design system",
        "Improved usability score"
      ],
      tech: ["Figma", "UX Design", "Prototyping"],
      theme: "orange"
    },
    {
      title: "Cloud Migration Project",
      image: cloudComputing,
      description:
        "A cloud migration strategy ensuring seamless transition with minimal downtime.",
      kpis: [
        "99.9% system uptime",
        "Improved scalability",
        "Reduced infrastructure cost"
      ],
      tech: ["AWS", "Azure", "Cloud"],
      theme: "violet"
    },
    {
      title: "Job Portal Platform",
      image: jobPortal,
      description:
        "A job portal connecting recruiters and job seekers with search and filter functionality.",
      kpis: [
        "Advanced job filtering",
        "Resume upload support",
        "Improved hiring efficiency"
      ],
      tech: ["React", "API", "CSS"],
      theme: "violet"
    },
    {
      title: "Food Ordering Website",
      image: foodWebsite,
      description:
        "A responsive food ordering platform with cart, checkout, and order confirmation features.",
      kpis: [
        "Smooth checkout experience",
        "Mobile-first design",
        "Improved order accuracy"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      theme: "orange"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio | Outpro.India</title>
        <meta
          name="description"
          content="View our case studies and projects delivered using modern technologies."
        />
      </Helmet>

      <section className="portfolio" id="portfolio">
        <div className="portfolio-container">
          <h1>Portfolio & Case Studies</h1>
          <p className="portfolio-intro">
            A detailed overview of projects delivered by Outpro.India, highlighting
            business impact, performance metrics, and technical excellence.
          </p>

          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div className={`portfolio-card ${project.theme}`} key={index}>

                {/* Project Image */}
                <img
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  loading="lazy"
                  className="portfolio-image"
                />

                {/* Card Content */}
                <div className="portfolio-icon">📁</div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {/* KPI Highlights */}
                <ul className="portfolio-kpis">
                  {project.kpis.map((kpi, i) => (
                    <li key={i}>✔ {kpi}</li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="portfolio-tags">
                  {project.tech.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
