'use server';

import { axiosInstance } from '@/app/service/axios-instance';

export const getFSW = (id: string): Promise<{ data: FSW[] }> =>
  axiosInstance
    .get('/tags/top', {
      params: {
        application_id: id,
      },
    })
    .then((result) => result.data);
