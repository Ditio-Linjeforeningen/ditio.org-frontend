import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Hjem</Link></li>
        <li><Link to="/events">Arrangementer</Link></li>
        <li><Link to="/about">Om oss</Link></li>
      </ul>
      <hr />
    </nav>
  );
}