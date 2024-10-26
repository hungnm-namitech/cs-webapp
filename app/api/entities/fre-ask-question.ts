'use server';

import { axiosInstance } from '@/app/service/axios-instance';

const BASE_ENTITY_URL = '/faqs';

export const getDetailFAQ = (id: string): Promise<{ data: FAQ }> =>
  axiosInstance.get(BASE_ENTITY_URL + `/${id}`).then((result) => result.data);

export const getFAQTop = (id: string): Promise<{ data: FAQTop[] }> =>
  axiosInstance.get(`application-faqs/${id}/top`).then((result) => result.data);

export const getFAQAboutApp = (
  appId: string,
): Promise<{ data: FAQAboutAppAndFirstTimeUser[] }> =>
  axiosInstance
    .get(`${BASE_ENTITY_URL}/`, {
      params: {
        'filters[suggestedTopic][$eq]': 'ABOUT_APP',
        'filters[application][id][$eq]': appId,
        'sort[]': 'suggestedTopicOrder:asc',
        'pagination[pageSize]': '4',
      },
    })
    .then((result) => result.data);

export const getFAQFirstTimeUser = (
  appId: string,
): Promise<{ data: FAQAboutAppAndFirstTimeUser[] }> =>
  axiosInstance
    .get(`${BASE_ENTITY_URL}/`, {
      params: {
        'filters[suggestedTopic][$eq]': 'FIRST_TIME_USER',
        'filters[application][id][$eq]': appId,
        'sort[]': 'suggestedTopicOrder:asc',
        'pagination[pageSize]': '4',
      },
    })
    .then((result) => result.data);
