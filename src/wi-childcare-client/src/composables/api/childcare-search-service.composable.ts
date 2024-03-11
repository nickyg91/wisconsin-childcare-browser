import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import { useHttpClient } from '../http-client.composable';

export const useChildcareSearchService = () => {
  const { httpClient } = useHttpClient();
  const getChildcareProvidersByCounty = async (county: string): Promise<IChildcareProvider[]> => {
    const response = await httpClient.get(`childcare-providers-by-county/${county}`);
    return response.json<IChildcareProvider[]>();
  };

  return {
    getChildcareProvidersByCounty
  };
};
