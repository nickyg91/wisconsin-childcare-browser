import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import { useHttpClient } from '../http-client.composable';

export const useChildcareSearchService = () => {
  const { httpClient } = useHttpClient();
  const getChildcareProvidersByCounty = async (county: string): Promise<IChildcareProvider[]> => {
    const response = await httpClient.get(`childcare-providers/county/${county}`);
    return response.json<IChildcareProvider[]>();
  };

  const getChildcareProvidersByName = async (name: string): Promise<IChildcareProvider[]> => {
    const response = await httpClient.get(`childcare-providers/name/${name}`);
    return response.json<IChildcareProvider[]>();
  };

  return {
    getChildcareProvidersByCounty,
    getChildcareProvidersByName
  };
};
