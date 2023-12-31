import React, { useState } from 'react';
import { CustomInput, PageHOC, CustomButton } from '../components';

const Home = () => {
  const [playerName, setPlayerName] = useState('')

  return (
    <div className="flex flex-col">
      <CustomInput 
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton 
        title="Register"
        handleClick={() => {}}
        restStyles="mt-6"
      />
    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br /> a web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br /> the ultimate web3 Battle Card Game</>
);