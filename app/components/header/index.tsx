'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const { push } = useRouter();
  const { slug } = useParams();
  return (
    <div className="bg-primary cs-layout font-bold flex items-center pl-0 justify-center tablet:pl-10 h-[64px] tablet:h-[80px] tablet:justify-start text-base tablet:text-xl">
      <div
        className="flex gap-5 cursor-pointer"
        onClick={() => push(`/${slug}`)}
      >
        <span>{title}</span>
        <span>ヘルプページ</span>
      </div>
    </div>
  );
};

export default Header;
