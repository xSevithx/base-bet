import React, { useState } from 'react';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Container, Button } from "reactstrap";
import { useWeb3 } from '../contexts/Web3Context.js'; // Adjust the import path as necessary

export const OrganizeBet = () => {
  const { web3, contract, currentAccount, connectWalletHandler } = useWeb3(); // Now using the useWeb3 hook

  const [tournamentName, setTournamentName] = useState('');
  const [optionName, setOptionName] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [optionIndex, setOptionIndex] = useState('');
  const [winningOptionIndex, setWinningOptionIndex] = useState('');

  const createTournament = async () => {
      if (!contract) return;
      await contract.methods.createTournament(tournamentName).send({ from: currentAccount });
  };

  const addBettableOption = async () => {
      if (!contract) return;
      await contract.methods.addBettableOption(tournamentId, optionName).send({ from: currentAccount });
  };

  const placeBet = async () => {
      if (!contract || !web3) return;
      const weiAmount = web3.utils.toWei(betAmount, 'ether');
      await contract.methods.placeBet(tournamentId, optionIndex).send({ from: currentAccount, value: weiAmount });
  };

  const finalizeTournament = async () => {
      if (!contract) return;
      await contract.methods.finalizeTournament(tournamentId, winningOptionIndex).send({ from: currentAccount });
  };

  const claimReward = async () => {
      if (!contract) return;
      await contract.methods.claimReward(tournamentId).send({ from: currentAccount });
  };
  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
      <Container> 
      <div>
          {!currentAccount ? (
              <Button color="success" onClick={connectWalletHandler}>Connect Wallet</Button>
          ) : (
              <Button color="info" disabled>{shortenAddress(currentAccount)}</Button>
            )}
          <div>
              <input value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} placeholder="Tournament Name" />
              <Button color="info" onClick={createTournament}>Create Tournament</Button>
          </div>
          <div>
              <input value={tournamentId} onChange={(e) => setTournamentId(e.target.value)} placeholder="Tournament ID" />
              <input value={optionName} onChange={(e) => setOptionName(e.target.value)} placeholder="Option Name" />
              <Button color="info" onClick={addBettableOption}>Add Option</Button>
          </div>
          <div>
              <input value={betAmount} onChange={(e) => setBetAmount(e.target.value)} placeholder="Bet Amount" />
              <input value={optionIndex} onChange={(e) => setOptionIndex(e.target.value)} placeholder="Option Index" />
              <Button color="info" onClick={placeBet}>Place Bet</Button>
          </div>
          <div>
              <input value={tournamentId} onChange={(e) => setTournamentId(e.target.value)} placeholder="Tournament ID" />
              <input value={winningOptionIndex} onChange={(e) => setWinningOptionIndex(e.target.value)} placeholder="Winning Option Index" />
              <Button color="info" onClick={finalizeTournament}>Finalize Tournament</Button>
          </div>
          <Button color="info" onClick={claimReward}>Claim Reward</Button>
      </div>
      </Container>
  );
};

export default function Bets() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
        <>
          <IndexNavbar />
          <div className="wrapper">
            <h1 className="main" style={{marginLeft:"20%"}}>Organize Bet</h1>
            <div className="page-header header-filter">
              <div className="squares square1" />
              <div className="squares square2" />
              <div className="squares square3" />
              <div className="squares square4" />
              <div className="squares square5" />
              <div className="squares square6" />
              <div className="squares square7" />
              <Container>
                <div className="content-  brand">
                  <div className="main">
                    <p>
                      <OrganizeBet />
                    </p>
                  </div>
                </div>
              </Container>
            </div>
            <Footer />
          </div>
        </>
  );
}
