'use server';
import { axiosInstance } from '@/app/service/axios-instance';

const BASE_ENTITY_URL = '/applications';

export const getAppDetail = (
  slug: string,
): Promise<{
  data: App[];
  meta: { pagination: Pagination };
}> =>
  axiosInstance
    .get(BASE_ENTITY_URL, {
      params: {
        'filters[slug][$eq]': slug,
      },
    })
    .then((result) => result.data);
