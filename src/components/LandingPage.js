import React, {useState} from 'react';
import {
    Flex,
    Input,
    Text,
    Heading,
    Button,
    OrderedList,
    ListItem,
    Link,
    Select
  } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const LandingPage = (props) => {
    const [numberOfTeams, setNumberOfTeams] = useState(10);

    const handleNoTeamChange = (e) => {
        setNumberOfTeams(e.target.value);
        props.handleTeamNumChange(e);
    }

    const draftPositionOptions = () => {
        if (numberOfTeams) {
            let options = [];

            for (let i = 1; i <= numberOfTeams; i++) {
                options.push(<option key={i} value={i}>{i}</option>)
            }

            return options;
        }

        return undefined;
    }

    return (
        <Flex 
            alignItems="center"
            flexDirection="column"
            height="100vh"
            width="100vw"
        >  
            <Heading 
                size="2xl"
                margin={10}
            >
                Beersheets Draft Assistant
            </Heading>
            <Flex
                alignItems="center"
                justifyContent="center"
                width="400px"
                marginBottom={5}
            >
                <Text
                    width="160px"
                >
                    Number of Teams:
                </Text>
                <Select
                    onChange={handleNoTeamChange}
                    width="80px"
                    defaultValue='10'
                >
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                </Select>
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="center"
                width="400px"
            >
                <Text
                    width="160px"
                >
                    Draft Position:
                </Text>
                <Select
                    onChange={handleNoTeamChange}
                    width="80px"
                >
                    {draftPositionOptions()}
                </Select>
            </Flex>
            <Flex
                width="400px"
                justifyContent="center"
                alignItems="center"
                margin={5}
            >
                <Button
                    leftIcon={<ArrowUpIcon />}
                >
                    <label htmlFor="file-upload">
                    Upload .csv
                    </label>
                </Button>
                <Input id="file-upload" type="file" onChange={(e) => props.loadFile(e)} display="none" accept=".csv" />
            </Flex>
            <Flex margin={5} flexDirection="column" alignItems="center">
                <Heading size="lg">How to use:</Heading>
                <OrderedList marginTop={5}>
                    <ListItem>
                        <Text>
                            Fill out the number of teams in the draft and select the pick you have
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            Visit <Link href="https://footballabsurdity.com/beersheet-request-form/" isExternal>the beersheets request form</Link> and fill out the prompts with information about your league
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            Download the CSV file and upload it using the button above
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            Submit picks as they happen in your draft to the draft analyzer
                        </Text>
                    </ListItem>
                </OrderedList>
            </Flex>
        </Flex>
    );
}

export default LandingPage