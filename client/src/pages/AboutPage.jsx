import { Link } from "react-router-dom";
export default function AboutPage() {
  return (
    <div>
      <p>About us</p>
      <p>
        We are a century old icecream shop. Here, you can choose classic and
        some exotic flavours...
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
