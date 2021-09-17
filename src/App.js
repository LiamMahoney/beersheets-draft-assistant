import { useState, React } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import LandingPage from './components/LandingPage';
import DraftAssistant from './components/DraftAssistant';
import parseCSV from './util/parseCSV';
import parsePositionSettings from './util/parseCSV';
import parseNumTeams from './util/parseCSV';

function App() {
  const [playerData, setPlayerData] = useState(undefined);
  const [numTeams, setNumTeams] = useState(undefined);
  const [positionSettings, setPositionSettings] = useState(undefined);

  const loadFile = (e) => {

    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const sortedPlayers = parseCSV(e.target.result).sort((a, b) => {
        return b.Average - a.Average
      });

      setPlayerData(sortedPlayers);

      setPositionSettings(parsePositionSettings(e.target.fileName));

      setNumTeams(parseNumTeams(e.target.fileName));
    }
    //TODO: make sure it's a CSV file
    reader.readAsText(e.target.files[0]);
  }

  return(
    <ChakraProvider theme={theme}>
      {playerData 
        ? <DraftAssistant 
            playerData={playerData} 
            numberOfTeams={numTeams}
            positionSettings={positionSettings}
          />
        : <LandingPage 
            loadFile={loadFile}
            numTeams={numTeams}
          />
      }
    </ChakraProvider>
  );  
}

export default App;
