export const mockFundsData = {
    data: {
      quote: {
        name: 'mockFund'
      },
      profile: {
        objective: 'lorem ipsum dolor sit amet, consectetur adip'
      },
      ratings: {
        analystRating: 7,
        SSRI: 3,
      },
      portfolio: {
        asset: [
          {
            label: 'Asset 1',
            value: 20,
          },
          {
            label: 'Asset 2',
            value: 80,
          }
        ],
        top10Holdings: [
          {
            name: 'Holding 1',
            weighting: 40,
          },
          {
            name: 'Holding 2',
            weighting: 60,
          },
        ]
      },
      documents: [
        {
          type: 'Factscheet',
          url: 'https://example.com/document1',
        },
        {
          type: 'KIID',
          url: 'https://example.com/document2',
        },
        {
          type: 'Prospectus',
          url: 'https://example.com/document3',
        },
      ],
    }
  }