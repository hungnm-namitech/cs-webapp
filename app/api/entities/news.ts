'use server';

import { axiosInstance } from '@/app/service/axios-instance';

const BASE_ENTITY_URL = '/news';

export const getNews = (id: string): Promise<{ data: News[] }> =>
  axiosInstance
    .get(BASE_ENTITY_URL, {
      params: {
        'filters[application][id][$eq]': id,
        sort: 'publishedAt:desc',
        'pagination[limit]': 3,
      },
    })
    .then((result) => result.data);

export const getDetailNews = (news: string): Promise<{ data: News[] }> =>
  axiosInstance
    .get(`${BASE_ENTITY_URL}`, {
      params: {
        'filters[slug][$eq]': news,
      },
    })
    .then((result) => result.data);
