import type { IDhsProviderData } from '@/models/dhs-provider-data.interface';
import { useHttpClient } from '../http-client.composable';

export const useDshSearchService = () => {
  const { httpClient } = useHttpClient();
  const getChildcareProvidersByCounty = async (county: string): Promise<IDhsProviderData[]> => {
    const response = await httpClient.get(`childcare/providers/county/${county}`);
    return response.json<IDhsProviderData[]>();
  };

  const getChildcareProvidersByName = async (name: string): Promise<IDhsProviderData[]> => {
    const response = await httpClient.get(`childcare/providers/name/${name}`);
    return response.json<IDhsProviderData[]>();
  };

  const getChildcareVaccinationProvidersByCounty = async (
    county: string
  ): Promise<IDhsProviderData[]> => {
    const response = await httpClient.get(`childcare/vaccines/county/${county}`);
    return response.json<IDhsProviderData[]>();
  };

  return {
    getChildcareProvidersByCounty,
    getChildcareProvidersByName,
    getChildcareVaccinationProvidersByCounty
  };
};
