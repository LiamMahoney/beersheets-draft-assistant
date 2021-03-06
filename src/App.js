import { React } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import LandingPage from './components/LandingPage';
import DraftAssistant from './components/DraftAssistant';
import { parseCSV, parsePositionSettings, parseNumTeams } from './util/parseCSV';
import useStickyState from './util/useStickyState';

function App() {
  const [playerData, setPlayerData] = useStickyState(undefined, "playerData");
  const [numTeams, setNumTeams] = useStickyState(undefined, "numTeams");
  const [positionSettings, setPositionSettings] = useStickyState(undefined, "positionSettings");
  const [draftData, setDraftData] = useStickyState(undefined, "draftData");

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
            setPositionSettings={setPositionSettings}
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
