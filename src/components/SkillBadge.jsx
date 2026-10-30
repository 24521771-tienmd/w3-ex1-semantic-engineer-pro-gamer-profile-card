
import styles from './SkillBadge.module.css';

export function SkillBadge({ name, tier }) {
  return (
    <span className={styles.badge}>
      <strong className={styles.name}>{name}</strong>
      <span className={styles.tier}>{tier}</span>
    </span>
  );
}
