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
            <Paper elevation={3} className={styles.fundsTab}>
                <Tabs value={fundValue}
                    onChange={handleFundChange}
                    scrollButtons
                    allowScrollButtonsMobile
                    variant="scrollable"
                    aria-label="Tabs that show the fund options"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    {funds.map((fund, index) => (
                        <Tab label={fund.data.quote.name} key={index} />
                    ))}
                </Tabs>

                {funds.map((fund, index) => (
                    <CustomTabPanel value={fundValue} index={index} key={index}>
                        <Grid container className={styles.fundsTab}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Box className={styles.fundsTab__text}>
                                    <Typography>{fund.data.profile.objective}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box className={`${styles.fundsTab__ratings}-container`}>

                                    <Typography component="legend">Rating</Typography>
                                    <Rating name="read-only" value={fund.data.ratings.analystRating} readOnly className={styles.fundsTab__ratings} />
                                </Box>
                                <Box className={styles.fundsTab__buttonGroup}>
                                    <Typography variant="h6">Documents</Typography>
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
                                        <Typography variant="h6">Fund Rating</Typography>

                                        <Gauge
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

                                        <Box className={styles.fundsTab__gauge__labels}>
                                            <Typography component="legend">Less Risk</Typography>
                                            <Typography component="legend">More Risk</Typography>
                                        </Box>
                                    </>
                                )}

                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>

                                <Typography variant="h6">Fund Asset Allocation</Typography>
                                <Box className={styles.fundsTab__pieChart}>
                                    <PieChart
                                        colors={['pink', 'yellow', 'orange', 'green', 'lightblue']}
                                        series={[
                                            {
                                                data: fund.data.portfolio.asset,
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                        data-testid={'pie-chart'}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" className={styles.funds__header}>Top 10 Holdings</Typography>
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