import { useState } from 'react'
import styles from './dropdown.module.css'

type Props = {
  children: React.ReactNode[]
  buttonRef: React.RefObject<HTMLButtonElement>
}

export default function Dropdown({ children, buttonRef }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.outer}>
      <button
        onClick={() => setVisible(prev => !prev)} 
        className={styles.button} 
        ref={buttonRef} 
        type="button"
      >
        ...
      </button>
      <div className={styles.dropdown + ' ' + (visible && styles.dropdown_visible)}>
        {children}
      </div>
    </div>
  )
}