import { useLayoutEffect, useState } from "react"


export default function useResizeObserver(ref: React.RefObject<HTMLElement>) {
  const [width, setWidth] = useState(
    ref.current
      ? ref.current.clientWidth
      : window
      ? window.innerWidth
      : 0,
  );

  function handleWidth() {
    if (ref.current) {
      setWidth(ref.current.clientWidth)
    }
  }

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(handleWidth)
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current)
      }
    }
  }, [ref])

  return width
}