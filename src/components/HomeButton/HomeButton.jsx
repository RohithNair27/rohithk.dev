import { Link } from 'react-router-dom';
import './HomeButton.css';

/** Fixed pill-shaped link back to the site's home scene, pinned to the
 *  top-right corner of the viewport. */
export default function HomeButton({ to = '/' }) {
  return (
    <Link to={to} className="home-button">
      Home
    </Link>
  );
}
