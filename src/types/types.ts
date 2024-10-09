interface Quote {
    __typename: string;
    name: string;
    marketCode: string;
    lastPrice: number;
    lastPriceDate: string;
    ongoingCharge: number;
    sectorName: string;
    currency: string;
  }
  
  interface Profile {
    objective: string;
  }
  
  interface Ratings {
    analystRating: number;
    SRRI: number;
    analystRatingLabel: string;
  }
  
  interface Document {
    id: string;
    type: string;
    url: string;
  }
  
  interface Asset {
    label: string;
    value: number;
  }
  
  interface Holding {
    name: string;
    weighting: number;
  }
  
  interface Portfolio {
    asset: Asset[];
    top10Holdings: Holding[];
  }
  
  interface Data {
    quote: Quote;
    profile: Profile;
    ratings: Ratings;
    documents: Document[];
    portfolio: Portfolio;
  }
  
  export interface FundData {
    data: Data;
  }
  