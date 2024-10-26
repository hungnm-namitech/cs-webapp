'use client';
import { Input } from '@/app/components/input';
import { useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Highlight, Hits, useSearchBox } from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import useSWRImmutable from 'swr/immutable';
import TableNotice from '../components/table-notice';
import Loading from '../components/loading';
import { getAppDetail, getFSW, getFAQTop, getNews } from '../api/entities';
import { YAMATO_DELIVERY } from '../constants/slug.const';
import {
  getFAQAboutApp,
  getFAQFirstTimeUser,
} from '../api/entities/fre-ask-question';
import clsx from 'clsx';

type HitProps = {
  hit: AlgoliaHit<{
    question: string;
    application_id: number;
    id: number;
    answer: string;
  }>;
};

export default function TopPage() {
  const { push } = useRouter();
  const { query, refine } = useSearchBox();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const { data: app, isLoading: isLoadingApp } = useSWRImmutable(
    'application',
    () => {
      if (typeof slug === 'string') {
        return getAppDetail(slug);
      }
    },
  );
  const { data: faqTop, isLoading: isLoadingFaq } = useSWRImmutable(
    'top-faq',
    () => getFAQTop(`${app?.data[0].id}`),
  );

  const { data: news, isLoading: isLoadingNews } = useSWRImmutable('news', () =>
    getNews(`${app?.data[0].id}`),
  );

  const { data: fswData, isLoading: isLoadingFsw } = useSWRImmutable(
    'fsw-tag',
    () => getFSW(`${app?.data[0].id}`),
  );

  const { data: faqAboutApp, isLoading: isLoadingFAQAboutApp } =
    useSWRImmutable('faq-about-app', () =>
      getFAQAboutApp(`${app?.data[0].id}`),
    );

  const { data: faqFirstTimeUser, isLoading: isLoadingFAQFirstTimeUser } =
    useSWRImmutable('faq-first-time-user', () =>
      getFAQFirstTimeUser(`${app?.data[0].id}`),
    );

  const fsw =
    useMemo(() => fswData?.data?.map((fsw) => fsw.name), [fswData]) || [];

  useEffect(() => {
    const encodeSearch = searchParams.get('q');
    refine(decodeURIComponent(encodeSearch || ''));
  }, [app, refine, searchParams]);
  const handleSearch = useDebouncedCallback((term: string) => {
    refine(term);
  }, 400);

  const handleRedirect = (newsSlug: string) => {
    push(`/${slug}/news/${newsSlug}`);
  };
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoadingApp || isLoadingNews || isLoadingFaq || isLoadingFsw)
    return <Loading />;

  return (
    <>
      <div className="flex justify-center">
        <main className="max-w-[880px] w-full mx-7 mt-12 tablet:mt-24">
          {!!news?.data.length && (
            <div className="mb-[42px]">
              <TableNotice
                handleRedirect={handleRedirect}
                news={news?.data || []}
              />
            </div>
          )}
          <div
            className={clsx(
              'grid justify-center gap-[28px] font-medium',
              faqAboutApp && faqFirstTimeUser && ' grid-cols-2',
            )}
          >
            {!!faqAboutApp?.data.length && (
              <div className="max-w-[425px]">
                <p className="border-b border-[#D7AE04] pb-1 font-bold text-center">
                  このアプリについて
                </p>
                <div className="flex flex-col gap-6 mt-6 font-inter font-normal ">
                  {faqAboutApp?.data.map((faq) => (
                    <p key={faq.id} className="line-clamp">
                      {faq.attributes.answer}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {!!faqFirstTimeUser?.data.length && (
              <div className="max-w-[425px]">
                <p className="border-b border-[#009C65] pb-1 text-center">
                  初めての方はこちら
                </p>
                <div className="mt-6 flex flex-col gap-6 font-inter font-normal">
                  {faqFirstTimeUser?.data.map((faq) => (
                    <p key={faq.id} className="line-clamp">
                      {faq.attributes.answer}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col items-center  mt-10">
            <p className="text-center tablet:text-2xl text-base font-black leading-[29px] max-w-[210px] tablet:max-w-full">
              {app?.data[0].attributes.name}についてお困りはないですか？
            </p>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              value={query}
              placeholder="キーワードを入力"
              className="mt-11"
            />
          </div>

          <div className="mt-12 flex flex-col gap-10">
            {!!query && (
              <div className="flex flex-col gap-8 tablet:gap-3 tablet:pl-8">
                <Hits
                  hitComponent={({ hit }: HitProps) => {
                    return (
                      <Link href={`/${slug}/faq/${hit.id}`} key={hit.objectID}>
                        ・
                        <Highlight
                          hit={hit}
                          attribute={'question'}
                          classNames={{
                            highlighted: 'text-[#3DA1FE] bg-white',
                          }}
                        />
                      </Link>
                    );
                  }}
                  classNames={{
                    item: 'mt-3',
                  }}
                />
              </div>
            )}
            <div>
              <p className="font-bold">よくあるお問い合わせ</p>
              <div className="flex flex-col gap-8 tablet:gap-3 mt-9 pl-3 tablet:pl-8">
                {faqTop?.data.map((faq) => (
                  <Link
                    href={`/${slug}/faq/${faq.id}`}
                    key={faq.id}
                    className="w-fit"
                  >
                    {faq.question}
                  </Link>
                ))}
              </div>
            </div>
            {!!fsw.length && (
              <div>
                <p className="font-bold">よく見るキーワード</p>
                <div className="mt-9 pl-3 tablet:pl-8 ">
                  {fsw.map((word, index) => (
                    <span
                      key={index}
                      className="cursor-pointer inline-block pb-2 pr-5"
                      onClick={() => {
                        handleScrollUp();
                        refine(word);
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-10 tablet:mb-14 flex flex-col items-center mt-10 font-semibold text-sm tablet:text-base">
              <p className="text-center max-w-[250px] tablet:max-w-full">
                上記を確認して解決しなかった場合はお問い合わせください
              </p>

              {slug === YAMATO_DELIVERY ? (
                <div className="flex flex-col mt-7 items-center gap-[10px] w-full max-w-[250px] tablet:max-w-[432px]">
                  <Link
                    href={
                      'https://share.hsforms.com/1AekrEq06Tmq5dCcdtPT6tw49z3f'
                    }
                    className="rounded-2xl h-[60px] w-full bg-third flex  tablet:flex-row flex-col items-center justify-center text-white "
                  >
                    お問い合わせ｜アプリについて
                  </Link>
                  <Link
                    href={
                      'https://pages.kuronekoyamato.co.jp/shopify_contact.html'
                    }
                    target="_blank"
                    className="rounded-2xl h-[60px] w-full bg-forth flex  tablet:flex-row flex-col items-center justify-center text-white"
                  >
                    <span>お問い合わせ</span>
                    <span className="hidden tablet:inline">｜</span>
                    <span>ヤマトとの契約・配送について</span>
                  </Link>
                </div>
              ) : (
                <Link
                  href={
                    'https://share.hsforms.com/1AekrEq06Tmq5dCcdtPT6tw49z3f'
                  }
                  className="max-w-[250px] tablet:max-w-[432px] rounded-2xl h-[60px] w-full bg-secondary flex cs-btn tablet:flex-row flex-col items-center justify-center text-white mt-7"
                >
                  お問い合わせ
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
