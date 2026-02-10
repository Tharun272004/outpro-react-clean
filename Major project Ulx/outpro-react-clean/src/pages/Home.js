import "./Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";



function Home() {

    useEffect(() => {
        const elements = document.querySelectorAll(".animate");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target); // animate once
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const featuredProjects = [
        {
            title: "Corporate Website",
            description: "Modern corporate website focused on branding and lead generation."
        },
        {
            title: "E-Commerce Platform",
            description: "Scalable e-commerce solution with optimized performance."
        },
        {
            title: "Business Dashboard",
            description: "Real-time analytics dashboard for business insights."
        }
    ];

    const testimonials = [
        {
            name: "Rajesh Kumar",
            role: "Founder, TechNova",
            feedback:
                "Outpro.India delivered a highly professional website that helped us attract more clients."
        },
        {
            name: "Anita Sharma",
            role: "CEO, MarketEdge",
            feedback:
                "Their team understood our vision perfectly and executed it with precision."
        }
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendMessage = async (e) => {
    e.preventDefault();

    // ✅ Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

        const result = await response.json();

      if (response.ok) {
        setResponseMessage("Message sent successfully ✅");

        // Clear form after success
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setResponseMessage(result.message || "Failed to send message ❌");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Something went wrong ❌");
    }
  };

    return (
        <>
            <Helmet>
                <title>Outpro.India | Digital Solutions Company</title>
                <meta
                    name="description"
                    content="Outpro.India provides scalable, secure, and modern digital solutions for businesses."
                />
            </Helmet>
            {/* HERO SECTION */}
            <header className="hero">
                <div className="hero-content">
                    <h1>
                        Building Digital Solutions for <span>Modern Businesses</span>
                    </h1>
                    <p>
                        Outpro.India delivers scalable, secure, and high-performance
                        digital solutions that help businesses grow.
                    </p>
                    <Link to="/services" className="hero-btn">
                        Explore Our Services
                    </Link>
                </div>
            </header>

            <main>
                {/* SERVICES OVERVIEW */}
                <section className="services-overview animate">
                    <h2>Our Services</h2>
                    <p className="section-desc">
                        End-to-end digital solutions tailored for your business needs.
                    </p>

                    <div className="services-grid animate">
                        <div className="service-card">
                            <h3>Web Development</h3>
                            <p>Custom, scalable, and secure web applications.</p>
                        </div>

                        <div className="service-card">
                            <h3>Cloud Solutions</h3>
                            <p>Cloud migration and infrastructure optimization.</p>
                        </div>

                        <div className="service-card">
                            <h3>UI / UX Design</h3>
                            <p>Designs focused on usability and engagement.</p>
                        </div>

                        <div className="service-card">
                            <h3>Digital Consulting</h3>
                            <p>Expert guidance for digital transformation.</p>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US */}
                <section className="why-choose-us animate">
                    <h2>Why Choose Us</h2>

                    <div className="reasons-grid">
                        <div className="reason-card">Scalable & Future-Ready Solutions</div>
                        <div className="reason-card">Experienced Industry Professionals</div>
                        <div className="reason-card">On-Time Project Delivery</div>
                        <div className="reason-card">Secure & Reliable Systems</div>
                    </div>
                </section>

                {/* METRICS */}
                <section className="metrics animate">
                    <div className="metrics-grid">
                        <div className="metric">
                            <h3>50+</h3>
                            <p>Projects Delivered</p>
                        </div>
                        <div className="metric">
                            <h3>20+</h3>
                            <p>Happy Clients</p>
                        </div>
                        <div className="metric">
                            <h3>5+</h3>
                            <p>Years Experience</p>
                        </div>
                        <div className="metric">
                            <h3>99%</h3>
                            <p>Client Satisfaction</p>
                        </div>
                    </div>
                </section>

                {/* PORTFOLIO PREVIEW */}
                <section className="portfolio-preview animate">
                    <h2>Featured Projects</h2>
                    <p className="section-desc">
                        A glimpse of projects we have successfully delivered.
                    </p>

                    <div className="portfolio-grid">
                        {featuredProjects.map((project, index) => (
                            <div className="portfolio-card" key={index}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>

                    <Link to="/portfolio" className="view-all-btn">
                        View All Projects →
                    </Link>
                </section>

                {/* TESTIMONIALS PREVIEW */}
                <section className="testimonials-preview animate">
                    <h2>What Our Clients Say</h2>

                    <div className="testimonials-grid">
                        {testimonials.map((item, index) => (
                            <div className="testimonial-card" key={index}>
                                <p>“{item.feedback}”</p>
                                <h4>{item.name}</h4>
                                <span>{item.role}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/testimonials" className="view-all-btn">
                        View All Testimonials →
                    </Link>
                </section>

                {/* CALL TO ACTION */}
                <section className="cta animate">
                    <h2>Let’s Build Your Digital Product</h2>
                    <p>
                        Ready to transform your business? Partner with us to create
                        powerful digital solutions.
                    </p>
                    <a href="#contact" className="cta-btn">
                        Get Started
                    </a>
                </section>
                {/* CONTACT FORM */}
                <section className="contact animate" id="contact">
                    <h2>Contact Us</h2>

                    <form className="contact-form" onSubmit={sendMessage}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            required
                        />

                        <select
                            name="service"
                            placeholder="Select a Service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Service</option>
                            <option>Web Development</option>
                            <option>Cloud Solutions</option>
                            <option>UI / UX Design</option>
                            <option>Digital Consulting</option>
                            <option>Mobile App Development</option>
                            <option>Custom Software Solutions</option>
                            <option>Other</option>
                        </select>

                        <textarea
                            name="message"
                            placeholder="Tell us about your project..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit">Send Message</button>
                        <p>{responseMessage}</p>

                    </form>
                </section>
            </main>
        </>
    );
}

export default Home;
