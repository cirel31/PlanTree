import { Atropos } from 'atropos/react'
import skyImage from '../../../public/atropos/sun-3588618_1280.jpg'
import mountainImage from '../../../public/atropos/mountains.svg'
import forestFront from '../../../public/atropos/forest-front.svg'
import forestMid from '../../../public/atropos/forest-mid.svg'
import forestBack from '../../../public/atropos/forest-back.svg'

interface ForestProps {
  forestName: string
}

const Tutorial3 = ({ forestName }: ForestProps) => {
  return (
    <Atropos className="atropos-tutorial">
      <div className="atropos-component">
        <div className="atropos-inner">
          <img className="atropos-spacer" src={skyImage} alt="sky" />
          <img data-atropos-offset="-4.5" src={skyImage} alt="sky" />
          <img data-atropos-offset="-6" src={mountainImage} alt="mountains" />
          <img data-atropos-offset="-4" src={forestBack} alt="forest" />
          <img data-atropos-offset="-2" src={forestMid} alt="forest" />
          <img data-atropos-offset="0" src={forestFront} alt="forest" />
          <div data-atropos-offset="3" className="forest-text-area">
            <div className="forest-text-tutorial">{forestName}</div>
          </div>
        </div>
        <div className="atropos-shadow" />
      </div>
    </Atropos>
  )
}

export default Tutorial3
