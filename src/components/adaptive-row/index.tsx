import { useEffect, useRef, useState } from "react"
import useResizeObserver from "../../hooks/use-resize-observer";
import Dropdown from "../dropdown";
import styles from './adaptive-row.module.css'

type Props = {
  children: React.ReactNode[];
  gap?: number
}

export default function AdaptiveRow({ children, gap = 0 }: Props) {
  const outer = useRef<HTMLDivElement>(null)
  const showMoreButton = useRef<HTMLButtonElement>(null)
  const elements = useRef<HTMLDivElement[]>([])
  const width = useResizeObserver(outer)
  const [menuCount, setMenuCount] = useState(0)

  const visibleCount = children.length - menuCount

  const getListElements = (node: React.ReactNode, index: number) => (
    <div 
      key={index} className={styles.element} 
      ref={element => { element && (elements.current[index] = element) }}
    >
      {node}
    </div>
  )

  useEffect(() => {
    if (!outer.current) return;
    const outerWidth = outer.current.offsetWidth
    const totalWidth = elements.current.slice(0, visibleCount).reduce((prev, current) => prev + current.offsetWidth, 0) + (showMoreButton.current?.offsetWidth || 0) + gap * visibleCount

    if (menuCount < children.length - 1 && totalWidth > outerWidth) {
      setMenuCount(prev => prev + 1)
      return
    }

    if (
      visibleCount > 0 &&
      outerWidth > totalWidth + 
        elements.current[visibleCount]?.offsetWidth + 
        (showMoreButton.current?.offsetWidth || 0) + gap * children.length
    ) {
      setMenuCount(prev => prev - 1 >= 0 ? prev - 1 : 0)
      return
    }
  }, [width])

  return (
    <div ref={outer} style={{ gap }} className={styles.row}>
      {children.slice(0, visibleCount).map(getListElements)}
      {!!menuCount && <Dropdown buttonRef={showMoreButton}>{children.slice(visibleCount).map(getListElements)}</Dropdown>}
    </div>
  )
}