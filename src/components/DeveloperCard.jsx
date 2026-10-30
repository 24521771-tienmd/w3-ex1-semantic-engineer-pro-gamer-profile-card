
import { Fragment, useState } from 'react';
import { SkillBadge } from './SkillBadge';

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
    <article aria-labelledby="dev-heading">
      <header>
        {showImage ? (
          <img
            src={avatarUrl}
            alt={fullName}
            width="64"
            height="64"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span aria-label={`Avatar initials: ${initials}`}>
            {initials}
          </span>
        )}

        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl>
        {Object.entries(metrics).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <ul aria-label="Engineered Skills">
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
