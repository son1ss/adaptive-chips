import { useState } from 'react'
import AdaptiveRow from './components/adaptive-row'
import Chip from './components/chip'
import { initialChips } from './utils/chips'
import './App.css'

function App() {
  const [chips, setChips] = useState(initialChips)
  
  const toggleChip = (id: number) => {
    setChips(prevChips => {
      return prevChips.map(chip => {
        if (chip.id !== id) return chip
        return {...chip, active: !chip.active }
      })
    })
  }

  return (
    <>
      <AdaptiveRow gap={10}>
        {chips.map(chip => {
          return (
            <Chip onClick={() => toggleChip(chip.id)} key={chip.id} active={chip.active}>
              {chip.name}
            </Chip>
          )
        })}
      </AdaptiveRow>
    </>
  )
}

export default App
