import { useState } from 'react';
import { MatZibList } from './constants/matzib-list';
import { Wheel } from 'react-custom-roulette';

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * MatZibList.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={MatZibList}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
}

export default App;

/*
"#3f297e",
"#175fa9",
"#169ed8",
"#239b63",
"#64b031",
"#efe61f",
"#f7a416",
"#e6471d",
"#dc0936",
"#e5177b",
"#be1180",
"#871f7f"
*/
