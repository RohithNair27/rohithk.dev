import './PageTitle.css';

/** The big red outlined page title ("Projects", "About Me", …) shared by
 *  every subpage. */
export default function PageTitle({ children, size = 'md', as: Tag = 'h1' }) {
  return <Tag className={`page-title page-title--${size}`}>{children}</Tag>;
}
