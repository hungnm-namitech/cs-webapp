import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import News from '@/app/components/news';
import * as NewsNotice from '@/app/api/entities/news';

type Props = {
  params: {
    news_slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const newsSlug = params.news_slug;
  let detailNews;
  try {
    if (newsSlug) detailNews = await NewsNotice.getDetailNews(newsSlug);
  } catch (error) {
    return {
      title: {
        default: ``,
        template: ``,
      },
    };
  }
  return {
    title: `${detailNews?.data[0].attributes.title}`,
  };
};

const PageNews = async ({ params }: Props) => {
  try {
    await NewsNotice.getDetailNews(params.news_slug);
  } catch (error) {
    notFound();
  }
  return <News />;
};

export default PageNews;
