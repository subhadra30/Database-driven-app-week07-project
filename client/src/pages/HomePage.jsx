import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="header">
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/about">
        <p>About</p>
      </Link>
      <Link to="/contact">
        <p>Contact</p>
      </Link>
    </div>
  );
}
