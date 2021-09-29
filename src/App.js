import { useState, useEffect, React } from 'react';
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
  const [draftData, setDraftData] = useState(undefined);

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

    setPositionSettings(parsePositionSettings(e.target.files[0].name));
    let tempNumTeams = parseNumTeams(e.target.files[0].name)
    setNumTeams(tempNumTeams);

    let dd = [];

    for (let i = 1; i <= tempNumTeams; i++) {
      dd.push({
        name: `Team ${i}`,
        pick: i,
        players: []
      });
    }

    setDraftData(dd);
  }

  const handleTeamNameChange = (team) => {
    setDraftData(draftData.filter((t) => {
      if (t.pick === team.pick) {
        return team;
      }

      return team;
    }));
  }

  return(
    <ChakraProvider theme={theme}>
      {draftData && playerData
        ? <DraftAssistant 
            playerData={playerData} 
            numberOfTeams={numTeams}
            positionSettings={positionSettings}
            draftData={draftData}
            handleTeamNameChange={handleTeamNameChange}
            setDraftData={setDraftData}
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
