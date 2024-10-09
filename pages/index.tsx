import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import type { FundData } from '../src/types/types';
import FundTabs from 'src/components/fundTabs';
import CustomTabPanel from 'src/components/customTabPanel';

import styles from '../styles/funds.module.scss';

interface PageProps {
    cautious: FundData;
    balanced: FundData;
    adventurous: FundData;
    responsible: FundData;
}

const Page = ({ cautious, balanced, adventurous, responsible }: PageProps) => {
    const funds = [cautious, balanced, adventurous];
    const buttons = [
        <Button color={'success'} href={cautious.data.documents[0].url} key={'first'}>{cautious.data.documents[0].type}</Button>,
        <Button color={'success'} href={cautious.data.documents[1].url} key={'second'}>{cautious.data.documents[1].type}</Button>,
        <Button color={'success'} href={cautious.data.documents[2].url} key={'third'}>{cautious.data.documents[2].type}</Button>
    ]

    const [strategyValue, setStrategyValue] = useState(0);

    const handleStrategyChange = (event: React.SyntheticEvent, newValue: number) => {
        setStrategyValue(newValue);
    }

    return (
        <>
            <Container maxWidth="lg">
                <Box className={styles.funds}>
                    <Grid container spacing={2}>

                        <Tabs 
                            value={strategyValue} 
                            onChange={handleStrategyChange} 
                            aria-label="Tabs that show the fund options"
                            centered
                            >
                            <Tab label="Growth Funds Variations" />
                            <Tab label="Responsible Growth Fund" key={1} />
                        </Tabs>
                    </Grid>
                    {strategyValue === 0 ? <FundTabs funds={funds} buttons={buttons} />
                        :
                        <CustomTabPanel value={strategyValue} index={1}>
                            <FundTabs funds={[responsible]} buttons={buttons} />
                        </CustomTabPanel>}
                </Box>
            </Container>
        </>
    )
}

const fetchFundData = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

export const getServerSideProps = async () => {
    const basePath = 'https://cdn.core3-dev.ajbbuild.uk/interview';
    const urls = [
        `${basePath}/BYW8RV9.json`,
        `${basePath}/BYW8RX1.json`,
        `${basePath}/BYW8VG2.json`,
        `${basePath}/BN0S2V9.json`,
    ];

    const fundDataPromises = urls.map(fetchFundData);
    const [cautious, balanced, adventurous, responsible] = await Promise.all(fundDataPromises);

    return {
        props: {
            cautious,
            balanced,
            adventurous,
            responsible,
        },
    };
};

export default Page;