import "./Testimonials.css";
import { Helmet } from "react-helmet-async";
import projectDemo from "../assets/videos/project-demo.mp4";
// import ecommerceDemo from "../assets/videos/ecommerce-demo.mp4";
// import dashboardDemo from "../assets/videos/dashboard-demo.mp4";
// import adminDemo from "../assets/videos/admin-panel-demo.mp4";

function Testimonials() {
  const textTestimonials = [
    {
      name: "Ravi Kumar",
      role: "Founder, TechNova",
      feedback:
        "Outpro.India delivered a highly professional website that exceeded our expectations. Their technical expertise and communication were outstanding."
    },
    {
      name: "Anjali Sharma",
      role: "Operations Manager, BizCorp",
      feedback:
        "The digital solutions provided by Outpro.India helped streamline our business operations and significantly improved efficiency."
    },
    {
      name: "Suresh Patel",
      role: "CEO, DataWorks",
      feedback:
        "Excellent service and on-time delivery. Their expertise in React and modern web technologies is impressive."
    }
  ];
  const demoVideos = [
    {
      title: "Portfolio Website Demo",
      subtitle: "React Project Walkthrough",
      video: projectDemo
    },
    {
      title: "Portfolio Website Demo",
      subtitle: "React Project Walkthrough",
      video: projectDemo
    }
    // {
    //   title: "E-Commerce Platform Demo",
    //   subtitle: "Product Flow & Checkout",
    //   video: ecommerceDemo
    // },
    // {
    //   title: "Analytics Dashboard Demo",
    //   subtitle: "Charts & Data Visualization",
    //   video: dashboardDemo
    // },
    // {
    //   title: "Admin Panel Demo",
    //   subtitle: "Role-based Management",
    //   video: adminDemo
    // }
  ];

  return (
    <>
      <Helmet>
        <title>Testimonials | Outpro.India</title>
      </Helmet>

      <section className="testimonials" id="testimonials">
        <div className="testimonials-container">
          <h1>Client Testimonials</h1>

          {/* TEXT TESTIMONIALS */}
          <h2 className="testimonial-section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {textTestimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <p className="testimonial-text">“{item.feedback}”</p>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            ))}
          </div>

          {/* video testimonials */}
          <h2 className="testimonial-section-title">Project Demo Videos</h2>

          <div className="video-testimonials-grid">
            {demoVideos.map((item, index) => (
              <div className="video-card dark-video-card" key={index}>
                <div className="video-wrapper">
                  <video
                    src={item.video}
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>

                <div className="video-info">
                  <h4>{item.title}</h4>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;

