import React from 'react';
import * as App from '../api/entities/app';
import { Metadata } from 'next';
import TopLayout from '../components/top-layout';
import { notFound, redirect } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { Noto_Sans_JP } from 'next/font/google';
import { YAMATO_DELIVERY } from '../constants/slug.const';
import clsx from 'clsx';

type Props = { params: { slug: string } };

const noto_sans_jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  const app = await App.getAppDetail(slug).catch(() => {
    redirect('/error');
  });
  if (!app.data[0])
    return {
      title: {
        default: ``,
        template: ``,
      },
      robots: {
        index: slug === YAMATO_DELIVERY ? false : true,
      },
    };
  else
    return {
      title: {
        default: `${app.data[0].attributes.name}ヘルプページ`,
        template: `%s | ${app.data[0].attributes.name}ヘルプページ`,
      },
      robots: {
        index: slug === YAMATO_DELIVERY ? false : true,
      },
    };
};

const PageLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}> &
  Props) => {
  const app = await App.getAppDetail(params.slug)
    .then((result) => {
      if (!result.data[0]) return notFound();
      else return result;
    })
    .catch(() => redirect('/error'));
  return (
    <div className={clsx('inter.className', params.slug)}>
      <header>
        <Header title={app.data[0].attributes.name || ''} />
      </header>
      <TopLayout>
        <section
          className={`min-h-[calc(100vh-64px-80px)] tablet:min-h-[calc(100vh-80px-80px)] ${noto_sans_jp.className}`}
        >
          {children}
        </section>
      </TopLayout>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PageLayout;
