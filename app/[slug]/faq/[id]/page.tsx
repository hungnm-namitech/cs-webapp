import React from 'react';
import * as Faq from '@/app/api/entities/fre-ask-question';
import { Metadata } from 'next';
import FAQ from '@/app/components/faq';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = params.id;

  let detailFAQ;
  try {
    detailFAQ = await Faq.getDetailFAQ(id);
  } catch (error) {
    return {
      title: {
        default: ``,
        template: ``,
      },
    };
  }
  return {
    title: `${detailFAQ.data.attributes.question}`,
  };
};

const PageFAQ = async ({ params }: Props) => {
  try {
    await Faq.getDetailFAQ(params.id);
  } catch (error) {
    notFound();
  }
  return <FAQ />;
};

export default PageFAQ;
