import styles from './chip.module.css'

type Props = {
  children: React.ReactNode;
  active?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Chip({ children, active = false, onClick }: Props) {
  return (
    <button 
      className={styles.chip + ' ' + (active && styles.chip_active)} 
      onClick={onClick} 
      type="button"
    >
      {children}
    </button>
  )
}