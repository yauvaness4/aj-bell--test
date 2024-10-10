import { render, screen } from '@testing-library/react';
import FundTabs from 'src/components/fundTabs';
import { mockFundsData } from '__mockData/__mockData';
import type { FundData } from 'src/types/types';


const mockButtons = [
    <button key="doc1">FactSheet</button>,
    <button key="doc2">KIID</button>,
    <button key="doc3">Prospectus</button>

];

describe('fundTabs', () => {
    it('renders the correct number of tabs', () => {
        const funds = Array(4).fill(mockFundsData);
        render(
            <FundTabs funds={funds} buttons={mockButtons} />
        );

        expect(screen.getAllByRole('tab')).toHaveLength(4);
    });
    it('renders the correct tab label when funds array contains different fund names', () => {
        const funds = [mockFundsData];
        funds[0].data.quote.name = 'Fund 1';
        render(
            <FundTabs funds={funds} buttons={mockButtons} />
        );

        expect(screen.getByText('Fund 1')).toBeInTheDocument();
    });
    it('should not render tab if error occurs', () => {
        const funds: FundData[] = [];

        render(
            <FundTabs funds={funds} buttons={mockButtons} />
        );

        expect(screen.queryAllByRole('tab')).toHaveLength(0);
    });

    it('renders the correct number of documents buttons', () => {
        const funds = [mockFundsData];
        render(<FundTabs funds={funds} buttons={mockButtons} />);

        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('renders the correct document button labels', () => {
        const funds = [mockFundsData];
        render(<FundTabs funds={funds} buttons={mockButtons} />);

        expect(screen.getByText('FactSheet')).toBeInTheDocument();
        expect(screen.getByText('KIID')).toBeInTheDocument();
        expect(screen.getByText('Prospectus')).toBeInTheDocument();
    });

    it('renders the correct fund objective text', () => {
        const funds = [mockFundsData];
        render(<FundTabs funds={funds} buttons={mockButtons} />);

        expect(screen.getByText(mockFundsData.data.profile.objective)).toBeInTheDocument();
    });

    it('renders the correct fund rating value when the funds array contains valid data', () => {
        const funds = [mockFundsData];

        render(<FundTabs funds={funds} buttons={mockButtons} />);

        const ratingValue = screen.getByText('Rating');
        expect(ratingValue).toBeInTheDocument();
        expect(screen.getByRole('img', { name: '7 Stars' })).toBeInTheDocument();
    });

    it('should not render gauge component if the value is null', () => {
        const invalidFunds: FundData[] = [{
            data: {
                quote: { name: 'Invalid Fund' },
                profile: { objective: 'Test objective' },
                ratings: { SSRI: null },
                portfolio: { asset: [], top10Holdings: [] },
            },
        }];

        render(<FundTabs funds={invalidFunds} buttons={mockButtons} />);

        expect(screen.queryByRole('meter')).toBeNull();
        expect(screen.queryByText('Fund Rating')).toBeNull();
        expect(screen.queryByText('Less Risk')).toBeNull();
    });

    it('renders the correct fund asset allocation pie chart', () => {
        const funds = [mockFundsData];
        render(<FundTabs funds={funds} buttons={mockButtons} />);

        const pieChart = screen.getByText('Fund Asset Allocation');
        expect(pieChart).toBeInTheDocument();
        expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
        const pieChartData = screen.getByText(mockFundsData.data.portfolio.asset[0].label);
        expect(pieChartData).toBeInTheDocument();
    });


    it.todo('renders the fund top 10 holdings table');

})
