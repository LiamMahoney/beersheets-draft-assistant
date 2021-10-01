import React from 'react';
import {
    Flex,
    Text,
    Heading,
    OrderedList,
    ListItem,
    Link,
  } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import UploadButton from './UploadButton';
import {ReactComponent as BeerIcon} from './beerIcon.svg'

const LandingPage = (props) => {

    return (
        <Flex 
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            height="100vh"
            width="100vw"
        >  
            <BeerIcon 
                height="125px"
            />
            <Heading 
                size="2xl"
                margin={10}
            >
                Beersheets Draft Assistant
            </Heading>
            <UploadButton handleChange={props.loadFile} />
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
                            Enter picks as they happen in your draft
                        </Text>
                    </ListItem>
                </OrderedList>
            </Flex>
            <ColorModeSwitcher 
                position="absolute"
                top={0}
                left={0}
            />
        </Flex>
    );
}

export default LandingPage