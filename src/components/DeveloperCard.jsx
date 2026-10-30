
import { Fragment, useState } from 'react';
import { SkillBadge } from './SkillBadge';
import styles from './DeveloperCard.module.css';

export function DeveloperCard({
  fullName,
  role,
  avatarUrl,
  metrics = {
    commits: 512,
    vdomNodes: 0,
    a11yScore: 100,
  },
  skills = [
    {
      id: 'sk-1',
      name: 'React 19 Fiber',
      tier: 'Core',
    },
  ],
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const showImage = avatarUrl && !imgFailed;

  const initials = fullName
    .trim()
    .split(/\s+/)
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <article
      className={styles.card}
      aria-labelledby="dev-heading"
    >
      <header className={styles.header}>
        {showImage ? (
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={fullName}
            width="64"
            height="64"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className={styles.initials}
            aria-label={`Avatar initials: ${initials}`}
          >
            {initials}
          </span>
        )}

        <hgroup className={styles.identity}>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <ul
        className={styles.skills}
        aria-label="Engineered Skills"
      >
        {skills.map((skill) => (
          <li key={skill.id}>
            <SkillBadge
              name={skill.name}
              tier={skill.tier}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
