'use client';

import * as Faq from '@/app/api/entities/fre-ask-question';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import useSWRImmutable from 'swr/immutable';
import Markdown from 'react-markdown';
import Button from '../button';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Loading from '../loading';
import { YAMATO_DELIVERY } from '@/app/constants/slug.const';
import Link from 'next/link';
const FAQ = () => {
  const { slug, id } = useParams();
  const router = useRouter();
  const { data: detailFAQ, isLoading } = useSWRImmutable(
    ['faq-detail', id],
    () => {
      if (typeof id === 'string') return Faq.getDetailFAQ(id);
    },
  );

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col items-center ml-8 mr-[31px]">
      <div className="max-w-[870px] w-full tablet:mt-32 mt-16">
        <p className="font-bold text-[2em] text-center">
          {detailFAQ?.data.attributes.question}
        </p>
        <div className="flex gap-32 mt-20">
          <div className="max-w-[800px] flex flex-col m-auto gap-5 note">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1(props) {
                  const { node, ...rest } = props;
                  return (
                    <h1
                      className="text-[2em] font-bold border-b-[2px] border-[#D7AE04]"
                      {...rest}
                    />
                  );
                },
                h2(props) {
                  const { node, ...rest } = props;
                  return (
                    <h2
                      className="text-[1.5em] font-bold border-b-[2px] border-[#D7AE04]"
                      {...rest}
                    />
                  );
                },
                h3(props) {
                  const { node, ...rest } = props;
                  return (
                    <h3
                      className="text-[1.17em] font-bold border-b-[2px] border-[#D7AE04]"
                      {...rest}
                    />
                  );
                },
                h4(props) {
                  const { node, ...rest } = props;
                  return (
                    <h4
                      className="text-[1em] font-bold border-b-[2px] border-[#D7AE04]"
                      {...rest}
                    />
                  );
                },
                a(props) {
                  const { node, ...rest } = props;
                  return (
                    <a className="text-[#0969DA] hover:underline" {...rest} />
                  );
                },
                table(props) {
                  const { node, ...rest } = props;
                  return <table className="table-auto" {...rest} />;
                },
                th(props) {
                  const { node, ...rest } = props;
                  return <th className="border border-[#ccc] p-1" {...rest} />;
                },
                td(props) {
                  const { node, ...rest } = props;
                  return <td className="border border-[#ccc] p-1" {...rest} />;
                },
              }}
            >
              {detailFAQ?.data.attributes.answer}
            </Markdown>
          </div>
        </div>
      </div>
      <p className="font-semibold mt-24 text-center max-w-[240px] tablet:max-w-full text-sm tablet:text-base">
        上記を確認して解決しなかった場合はお問い合わせください
      </p>
      {slug === YAMATO_DELIVERY ? (
        <div className="flex flex-col gap-5 tablet:w-[432px] w-[300px] mt-10 mb-14">
          <Button
            onClick={() => router.push(`/${slug}`)}
            className="text-forth bg-white border border-forth w-full font-bold"
          >
            TOPへ
          </Button>
          <Link
            href={'https://share.hsforms.com/1AekrEq06Tmq5dCcdtPT6tw49z3f'}
            className="text-white rounded-2xl h-[60px] w-full font-semibold text-sm tablet:text-base bg-third flex justify-center items-center"
          >
            お問い合わせ｜アプリについて
          </Link>
          <Link
            href={'https://pages.kuronekoyamato.co.jp/shopify_contact.html'}
            target="_blank"
            className="rounded-2xl h-[60px] w-full bg-forth flex  tablet:flex-row flex-col items-center justify-center text-white"
          >
            <span>お問い合わせ</span>
            <span className="hidden tablet:inline">｜</span>
            <span>ヤマトとの契約・配送について</span>
          </Link>
        </div>
      ) : (
        <div className="flex tablet:flex-row w-full flex-col max-w-[300px] tablet:max-w-full tablet:justify-center tablet:gap-5 gap-[10px] mt-10 mb-14">
          <Button
            onClick={() => router.push(`/${slug}`)}
            className="text-secondary bg-white border border-secondary tablet:w-[300px] font-bold cs-btnTop"
          >
            TOPへ
          </Button>
          <Link
            href={'https://share.hsforms.com/1AekrEq06Tmq5dCcdtPT6tw49z3f'}
            className="bg-secondary text-white rounded-2xl h-[60px] w-full tablet:max-w-[300px] font-semibold text-sm tablet:text-base cs-btn flex justify-center items-center"
          >
            お問い合わせ
          </Link>
        </div>
      )}
    </div>
  );
};

export default FAQ;
