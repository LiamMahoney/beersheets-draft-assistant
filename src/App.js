import { useState, React } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import LandingPage from './components/LandingPage';
import DraftAssistant from './components/DraftAssistant';
import parseCSV from './util/parseCSV';

function App() {
  const [playerData, setPlayerData] = useState(undefined);

  const loadFile = (e) => {

    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const sortedPlayers = parseCSV(e.target.result).sort((a, b) => {
        return b.Average - a.Average
      });
      console.log('sortedPlyaers', sortedPlayers);
      setPlayerData(sortedPlayers);
    }
    //TODO: make sure it's a CSV file
    reader.readAsText(e.target.files[0]);
  }

  return(
    <ChakraProvider theme={theme}>
      {playerData 
        ? <DraftAssistant playerData={playerData} />
        : <LandingPage loadFile={loadFile}/>
      }
    </ChakraProvider>
  );  
}

export default App;
