import React from 'react';
import {
    Button
} from '@chakra-ui/react';
import BaseTable, { Column, AutoResizer } from 'react-base-table';
import 'react-base-table/styles.css';

const ChakraBaseTable = ({players, selectPlayer}) => {

    const DraftButton = ({ rowData }) => {

        return (
            <Button 
                size="sm"
                onClick={() => selectPlayer(rowData)}
                _focus="unset"
            >
                Draft
            </Button>
        );
    }

    const columns = [
        {
            key: 'Name',
            dataKey: 'Name',
            title: 'Name',
            width: 180,
            flexGrow: 2,
            frozen: Column.FrozenDirection.LEFT
        },
        {
            key: 'Position',
            dataKey: 'Pos',
            title: 'Position',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'Team',
            dataKey: 'Tm/Bye',
            title: 'Team',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'Value',
            dataKey: 'Average',
            title: 'Value',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'PS',
            dataKey: 'PS',
            title: 'Positional Scarcity',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'Tier',
            dataKey: 'Tier',
            title: 'Position Tier',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'ECR',
            dataKey: 'ECRAvg',
            title: 'ECR',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'Pos. Rank',
            dataKey: 'Rank',
            title: 'Position Rank',
            width: 80,
            flexGrow: 1
        },
        {
            key: 'Draft',
            width: 80,
            flexGrow: 1,
            cellRenderer: DraftButton,
            frozen: Column.FrozenDirection.RIGHT
        },
    ]

    return (
        <AutoResizer>
            {({ width, height }) => (
                <BaseTable data={players} columns={columns} width={width} height={height} overscanRowCount={5} ignoreFunctionInColumnCompare={false}>
                    <Column key='Name' dataKey='Name' width={180} flexGrow={2} frozen={Column.FrozenDirection.LEFT}/>
                    <Column key='Position' dataKey='Pos' width={80} flexGrow={1} />
                    <Column key='Team' dataKey='Tm/Bye' width={80} flexGrow={1}/>
                    <Column key='Value' dataKey='Average' width={80} flexGrow={1}/>
                    <Column key='PS' dataKey='PS' width={80} flexGrow={1}/>
                    <Column key='Tier' dataKey='Tier' width={80} flexGrow={1}/>
                    <Column key='ECR' dataKey='ECRAverage' width={80} flexGrow={1}/>
                    <Column key="Pos. Rank" dataKey='Rank' width={80} flexGrow={1}/>
                    <Column key='Draft' width={80} flexGrow={1}  cellRenderer={DraftButton} frozen={Column.FrozenDirection.RIGHT}/>
                </BaseTable>
            )}
        </AutoResizer>
    );
}

export default ChakraBaseTable;