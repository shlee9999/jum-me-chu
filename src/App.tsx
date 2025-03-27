import { useState } from 'react';
import { menuOptions } from './constants/matzib-list';
import { Wheel } from 'react-custom-roulette';

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * menuOptions.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'aliceblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
        점심 메뉴 룰렛 🎯
      </h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={menuOptions}
        backgroundColors={[
          '#3f297e',
          '#175fa9',
          '#169ed8',
          '#239b63',
          '#64b031',
          '#efe61f',
          '#f7a416',
          '#e6471d',
          '#dc0936',
          '#e5177b',
          '#be1180',
          '#871f7f',
        ]}
        textColors={['#ffffff']}
        outerBorderColor='#000'
        outerBorderWidth={10}
        innerBorderColor='#fff'
        innerBorderWidth={5}
        radiusLineColor='#ddd'
        radiusLineWidth={2}
        fontSize={18}
        textDistance={60}
        onStopSpinning={() => {
          setMustSpin(false);
          alert(`오늘 점심은 ${menuOptions[prizeNumber].option}!`);
        }}
      />
      <button
        onClick={handleSpinClick}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#64b031',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        SPIN
      </button>
    </div>
  );
}

export default App;
