import PageScene from '../components/PageScene/PageScene';
import PageTitle from '../components/PageTitle/PageTitle';
import BackLink from '../components/BackLink/BackLink';
import { about } from '../data/about';
import './About.css';

export default function About() {
  return (
    <PageScene className="about-page" paddingBottom={80}>
      <div className="about-page__content">
        <PageTitle size="lg">About Me</PageTitle>

        <p>{about.summary}</p>
        <p>
          {about.cattLab.before}
          <a href={about.cattLab.href} target="_blank" rel="noopener noreferrer">
            {about.cattLab.linkLabel}
          </a>
          {about.cattLab.after}
        </p>

        <p className="about-page__learning-label">Currently learning:</p>
        <ol className="about-page__learning-list">
          {about.learning.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <BackLink />
      </div>
    </PageScene>
  );
}
