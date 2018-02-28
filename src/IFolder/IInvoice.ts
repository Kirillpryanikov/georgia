export interface IInvoice {
  address: string;
  date: string;
  email: string;
  full_name: string;
  hawb: string;
  invoice: string;
  mobile: string;
  suite: string;
  total: number;
  transportation: {
    amount: any;
    total: any;
    vat: any;
  };
  weight_lbs: string;
  weight_kg: string;
}
