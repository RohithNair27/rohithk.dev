import PageScene from '../components/PageScene/PageScene';
import PageTitle from '../components/PageTitle/PageTitle';
import BackLink from '../components/BackLink/BackLink';
import Timeline from '../components/Timeline/Timeline';
import { experience } from '../data/experience';
import './Experience.css';

export default function Experience() {
  return (
    <PageScene className="experience-page" paddingBottom={100}>
      <div className="experience-page__content">
        <PageTitle>Experience</PageTitle>
        <Timeline entries={experience} />
        <BackLink />
      </div>
    </PageScene>
  );
}
