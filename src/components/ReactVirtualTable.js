import React from 'react';
import { useVirtual } from "react-virtual";
import { 
    Grid,
    Flex,
    Box,
    Button,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

const Cell = (props) => {
    return (

        <Flex
            justifyContent="flex-start"
            alignItems="center"
            flexGrow={1}
            borderBottom="1px"
            borderColor="inherit"
        >
            {props.children}
        </Flex>
    )
}

const HeaderCell = (props) => {
    return (
        <Flex
            justifyContent="flex-start"
            alignItems="center"
            flexGrow={1}
            borderBottom="2px"
            borderColor="inherit"
            backgroundColor={useColorModeValue("white", "gray.800")}
        >
            <Text
                fontFamily="heading"
                fontWeight="bold"
                lineHeight="4"
                fontSize="xs"
                textTransform="uppercase"
            >
                {props.children}
            </Text>
        </Flex>
    )
}

const Row = ({ player, height, transform, selectPlayer }) => {
    return (
        <Grid
            templateColumns="minmax(120px, 1fr) 200px repeat(7, minmax(120px, 1fr))"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height={height}
            transform={transform}
        >
            <Cell>
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                >
                    <Button 
                        size='sm' 
                        _focus="unset"
                        onClick={() => selectPlayer(player)}
                    >
                            Draft
                    </Button>
                </Flex>
            </Cell>
            <Cell>{player.Name}</Cell>
            <Cell>{player.Pos}</Cell>
            <Cell>{player['Tm/Bye']}</Cell>
            <Cell>{player.Average}</Cell>
            <Cell>{player.PS}</Cell>
            <Cell>{player.Tier}</Cell>
            <Cell>{player.ECRAvg}</Cell>
            <Cell>{player.Rank}</Cell>
        </Grid>
    )
}

const ReactVirtualTable = ({players, selectPlayer}) => {

    const parentRef = React.useRef();

    const rowVirtualizer = useVirtual({
        size: players.length,
        parentRef,
        estimateSize: React.useCallback(() => 50, []),
        overscan: 10
    })

    return (
        <Box
            ref={parentRef}
            overflowY="scroll"
            height="100%"
            width="100%"
        >
            <Grid
                templateColumns="minmax(120px, 1fr) 200px repeat(7, minmax(120px, 1fr))"
                position="sticky"
                zIndex={1}
                top={0}
                backgroundColor={useColorModeValue("white", "gray.800")}
                minHeight="50px"
            >
                    <HeaderCell></HeaderCell>
                    <HeaderCell>Name</HeaderCell>
                    <HeaderCell>Position</HeaderCell>
                    <HeaderCell>Team</HeaderCell>
                    <HeaderCell>Value</HeaderCell>
                    <HeaderCell>Positional Scarcity</HeaderCell>
                    <HeaderCell>Position Tier</HeaderCell>
                    <HeaderCell>ECR</HeaderCell>
                    <HeaderCell>Position Rank</HeaderCell>
            </Grid>
            <Box
                height={`${rowVirtualizer.totalSize}px`}
                width="100%"
                position="relative"
            >
            {rowVirtualizer.virtualItems.map(virtualRow => {
                return (
                    <Row
                        key={virtualRow.index}
                        height={`${virtualRow.size}px`}
                        transform={`translateY(${virtualRow.start}px)`}
                        player={players[virtualRow.index]}
                        selectPlayer={selectPlayer}
                    />
                )
            })}
            </Box>
        </Box>
    )
}

export default ReactVirtualTable;