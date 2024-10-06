interface CompanyInfo {
  _id?: string;
  symbol: string;
  icb_code: string;
  company_name: string;
  industry: string;
  logo : string;
  profile: {
    short_name: string;
    international_name: string;
    head_quarters: string;
    phone: string;
    fax: string;
    email: string;
    web_address: string;
    employees: number;
    business_license_number: string;
    date_of_issue: string; 
    tax_id_number: string;
    charter_capital: number;
    date_of_listing: string;
    exchange: string;
    initial_listing_price: number;
    listing_volume: number;
    market_cap: number;
    is_using_cf_direct: boolean;
  };
}
type InputComponentProps = {
  companies: CompanyInfo[];
  onSymbolsFiltered: (symbols: string[]) => void; 
};
interface ProfileCompanyProps {
  profile: any; 
  message?: string; 
}