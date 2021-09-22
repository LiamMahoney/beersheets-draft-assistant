import { useState, React } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import LandingPage from './components/LandingPage';
import DraftAssistant from './components/DraftAssistant';
import { parseCSV, parsePositionSettings, parseNumTeams } from './util/parseCSV';

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
    }
    //TODO: make sure it's a CSV file
    reader.readAsText(e.target.files[0]);

    //TODO: move these and parseCSV to promises, only want the spinner icon on teh upload button to go away once everything is loaded properly
    setPositionSettings(parsePositionSettings(e.target.files[0].name));

    setNumTeams(parseNumTeams(e.target.files[0].name));
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
