import React from 'react';

const Footer = () => {
  return (
    <div className="h-[80px] bg-primary cs-layout w-full flex flex-col justify-center items-center">
      <p className="text-xl leading-9 text-[#333333]">株式会社and.d</p>
      <p className="hidden tablet:block font-medium text-[10px] text-[#475762]">
        Copyright ©2021 and.d inc All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
