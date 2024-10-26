import React from 'react';
import { format } from 'date-fns';
type Props = {
  handleRedirect: (newsSlug: string) => void;
  news: News[];
};

const TableNotice = ({ handleRedirect, news }: Props) => {
  return (
    <div>
      <div className="h-10 rounded-t-[14px] bg-primary cs-bgNews w-full leading-7 font-bold flex justify-center items-center">
        お知らせ
      </div>
      <div className="border-2 border-primary px-3 py-[14px] rounded-b-xl cs-news">
        {news.map((singleNews) => (
          <div
            key={singleNews.id}
            className="flex gap-9 font-medium hover:bg-gray-50 px-3 cursor-pointer "
            onClick={() => handleRedirect(singleNews.attributes.slug)}
          >
            <span className="leading-7">
              {format(singleNews.attributes.publishedAt, 'yyyy/MM/dd')}
            </span>
            <span className="leading-7">{singleNews.attributes.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableNotice;
