import { Link } from 'react-router-dom';
import './BackLink.css';

/** The "← Back to the walk" link every subpage ends with. */
export default function BackLink({ to = '/' }) {
  return (
    <div className="back-link">
      <Link to={to}>&larr; Back to the walk</Link>
    </div>
  );
}
