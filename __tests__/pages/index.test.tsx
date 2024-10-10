/**
 * @jest-environment jsdom
 */
// import { act } from 'react';
import { render, screen, act } from "@testing-library/react";
import Page, { fetchFundData } from "@/pages/index";
import { mockFundsData } from "../../__mockData/__mockData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
) as jest.Mock;

describe("Page", () => {
  const cautious = mockFundsData;
  const balanced = mockFundsData;
  const adventurous = mockFundsData;
  const responsible = mockFundsData;

  it("renders correctly with expected funds", async () => {
    await act(async () => {
      // @ts-expect-error - mock data
      render(<Page balanced={balanced} adventurous={adventurous} responsible={responsible} cautious={cautious} />);

    });

    expect(screen.getByRole('tab', { name: 'Growth Funds Variations' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Responsible Growth Fund' })).toBeInTheDocument();
  });

  it('renders expected buttons', () => {
    // @ts-expect-error - mock data
    render(<Page balanced={balanced} adventurous={adventurous} responsible={responsible} cautious={cautious} />);

    const buttons = screen.getAllByRole('link');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Factscheet');
    expect(buttons[1]).toHaveTextContent('KIID');
    expect(buttons[2]).toHaveTextContent('Prospectus');
  });

  describe('GetServerSideProps', () => {
    it('should fetch data from server side', async () => {
      const mockUrl = 'https://example.com/mock-fund.json';

      const data = await fetchFundData(mockUrl);

      expect(global.fetch).toHaveBeenCalledWith(mockUrl);
      expect(data).toEqual({ data: 'mocked data' });
    });

    it('should throw an error if fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
      );

      const mockUrl = 'https://example.com/mock-fund.json';

      await expect(fetchFundData(mockUrl)).rejects.toThrow('Network error');
    });
  })
});
