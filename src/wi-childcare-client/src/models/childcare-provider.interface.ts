export interface IChildcareProvider {
  id: number;
  facility_name: string;
  address: string;
  address_two: string;
  city: string;
  state: string;
  county: string;
  lat: number;
  long: number;
  provider_phone: string;
  application_type: string;
  capacity: number;
}
