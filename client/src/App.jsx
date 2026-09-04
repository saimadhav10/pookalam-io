import { SocketProvider } from './context/SocketContext';
import { GameProvider, useGame } from './context/GameContext';
import { PHASES } from './utils/constants';
import LobbyPage from './pages/LobbyPage';
import WaitingRoom from './pages/WaitingRoom';
import GamePage from './pages/GamePage';
import JudgingPage from './pages/JudgingPage';
import RoundResults from './pages/RoundResults';
import FinalResults from './pages/FinalResults';

function GameRouter() {
  const { phase } = useGame();

  switch (phase) {
    case PHASES.LOBBY:
      return <LobbyPage />;
    case PHASES.WAITING:
      return <WaitingRoom />;
    case PHASES.CREATION:
      return <GamePage />;
    case PHASES.JUDGING:
      return <JudgingPage />;
    case PHASES.ROUND_RESULTS:
      return <RoundResults />;
    case PHASES.FINAL_RESULTS:
      return <FinalResults />;
    default:
      return <LobbyPage />;
  }
}

export default function App() {
  return (
    <SocketProvider>
      <GameProvider>
        <GameRouter />
      </GameProvider>
    </SocketProvider>
  );
}
