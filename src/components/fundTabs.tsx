'use client'
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import { PieChart, Gauge, gaugeClasses } from '@mui/x-charts';
import { FundData } from '../types/types';
import CustomTabPanel from './customTabPanel';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import styles from '../../styles/funds.module.scss';

interface FundTabsProps {
    funds: FundData[];
    buttons: JSX.Element[];
}

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        minWidth: 200,
        flex: 3
    },
    {
        field: 'weighting',
        headerName: 'Weighting',
        flex: 1,
        minWidth: 100
    },
];


const FundTabs = ({ funds, buttons }: FundTabsProps) => {
    // const [fundValue, setFundValue] = useState(Number(localStorage.getItem('fund')) ?? 0);
    const [fundValue, setFundValue] = useState(0);

    const handleFundChange = (event: React.SyntheticEvent, newValue: number) => {
        setFundValue(newValue);
        // localStorage.setItem('fund', JSON.stringify(newValue));
    };

    return (
        <>
            <Paper elevation={3} sx={{ padding: '20px' }}>
                <Tabs value={fundValue} onChange={handleFundChange} aria-label="Tabs that show the fund options">
                    {funds.map((fund, index) => (
                        <Tab label={fund.data.quote.name} key={index} />
                    ))}
                </Tabs>

                {funds.map((fund, index) => (
                    <CustomTabPanel value={fundValue} index={index} key={index}>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Typography className={styles.fundsTab__text}>{fund.data.profile.objective}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography component="legend">Rating</Typography>
                                <Rating name="read-only" value={fund.data.ratings.analystRating} readOnly />

                                <Box sx={{ width: '100%', textAlign: 'right', paddingBottom: '20px' }}>
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="Vertical button group"
                                        variant="text"
                                        fullWidth={true}
                                        color='success'
                                    >
                                        {buttons}
                                    </ButtonGroup>
                                </Box>


                                {!!fund.data.ratings.SRRI && (
                                    <>
                                        <Gauge
                                            width={300}
                                            height={100}
                                            value={fund.data.ratings.SRRI}
                                            startAngle={-90} endAngle={90}
                                            valueMax={10}
                                            text={({ value, valueMax }) => `${value} / ${valueMax}`}
                                            sx={(theme) => ({
                                                [`& .${gaugeClasses.valueText}`]: {
                                                    fontSize: 30,
                                                    transform: 'translate(0px, -10px)',
                                                },
                                                [`& .${gaugeClasses.valueArc}`]: {
                                                    fill: 'pink',
                                                },
                                                [`& .${gaugeClasses.referenceArc}`]: {
                                                    fill: theme.palette.text.disabled,
                                                },
                                            })} />

                                        <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography component="legend">Less Risk</Typography>
                                            <Typography component="legend">More Risk</Typography>
                                        </Box>
                                    </>
                                )}

                            </Grid>
                            <Grid size={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}>
                                    <PieChart
                                        colors={['pink', 'yellow', 'orange', 'green', 'lightblue']}
                                        series={[
                                            {
                                                data: fund.data.portfolio.asset,
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{xs: 12, md: 6}}>
                                <Typography component="h2" className={styles.funds__header}>Top 10 Holdings</Typography>
                                <Box key={index}>
                                    <DataGrid
                                        getRowId={(row) => row.name}
                                        rows={fund.data.portfolio.top10Holdings}
                                        columns={columns}
                                        disableRowSelectionOnClick
                                        hideFooter={true}
                                        disableColumnFilter
                                        disableColumnSorting
                                    />
                                </Box>

                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                ))}
            </Paper>
        </>
    );
};

export default FundTabs;