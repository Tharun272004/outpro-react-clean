import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section style={{ padding: "120px 20px", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go Home</Link>
    </section>
  );
}

export default NotFound;
