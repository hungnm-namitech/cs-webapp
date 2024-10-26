'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import useSWRImmutable from 'swr/immutable';
import Markdown from 'react-markdown';
import Button from '../button';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import * as NewsNotice from '@/app/api/entities/news';
import Loading from '../loading';
import { YAMATO_DELIVERY } from '@/app/constants/slug.const';
const News = () => {
  const { slug, news_slug } = useParams();
  const router = useRouter();

  const { data: detailNews, isLoading } = useSWRImmutable(
    ['get-news', news_slug],
    () => {
      if (typeof news_slug === 'string')
        return NewsNotice.getDetailNews(news_slug);
    },
  );

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col items-center ml-8 mr-[31px]">
      <div className="max-w-[870px] w-full tablet:mt-32 mt-16">
        <p className="font-bold text-[2em] text-center">
          {detailNews?.data[0].attributes.title}
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
              {detailNews?.data[0].attributes.content}
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
          <Button
            onClick={() =>
              (window.location.href =
                'https://share.hsforms.com/1AekrEq06Tmq5dCcdtPT6tw49z3f')
            }
            className="w-full font-semibold text-sm tablet:text-base bg-third"
          >
            お問い合わせ｜アプリについて
          </Button>
          <Button className="w-full font-semibold text-sm tablet:text-base bg-forth flex flex-col items-center justify-center tablet:block">
            <span>お問い合わせ</span>
            <span className="hidden tablet:inline">｜</span>
            <span>ヤマトとの契約・配送について</span>
          </Button>
        </div>
      ) : (
        <div className="flex tablet:flex-row w-full flex-col max-w-[300px] tablet:max-w-full tablet:justify-center tablet:gap-5 gap-[10px] mt-10 mb-14">
          <Button
            onClick={() => router.push(`/${slug}`)}
            className="text-secondary bg-white border border-secondary tablet:w-[300px] font-bold cs-btnTop"
          >
            TOPへ
          </Button>
          <Button
            onClick={() =>
              (window.location.href =
                'https://share.hsforms.com/1AekrEq06Tmq5dCcdtPT6tw49z3f')
            }
            className="w-full tablet:max-w-[300px] font-semibold text-sm tablet:text-base cs-btn"
          >
            お問い合わせ
          </Button>
        </div>
      )}
    </div>
  );
};

export default News;
