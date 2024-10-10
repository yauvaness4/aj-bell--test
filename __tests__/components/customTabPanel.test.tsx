import { render, screen } from '@testing-library/react';
import CustomTabPanel from 'src/components/customTabPanel';

describe('CustomTabPanel', () => {
    it('renders children when value matches index', () => {
        render(
            <CustomTabPanel value={1} index={1}>
                <p>Custom Tab Panel Content</p>
            </CustomTabPanel>
        );

        expect(screen.getByText('Custom Tab Panel Content')).toBeInTheDocument();
    })

    it('should not render children when the value does not match index', () => {
        render(
            <CustomTabPanel value={0} index={1}>
                <p>Custom Tab Panel Content</p>
            </CustomTabPanel>
        );

        expect(screen.queryByText('Custom Tab Panel Content')).toBeNull();
    });

    it('should render expected attributes', () => {
        render(
            <CustomTabPanel value={1} index={1}>
                <p>Custom Tab Panel Content</p>
            </CustomTabPanel>
        );

        expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'simple-tabpanel-1');
        expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'simple-tab-1');
    })
});