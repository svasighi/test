'use client';

import { useState } from 'react';
import axios from 'axios';
import NeshanMap from '@neshan-maps-platform/react-openlayers';
import Image from 'next/image';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const fetchData = async () => {
    try {
      setDataFetched(false);
      const ipResponse = await axios.get(
        `http://ip-api.com/json/?fields=61439`
      );
      const agentResponse = await axios.get(
        `https://api.bigdatacloud.net/data/client-info/`
      );
      setUserInfo({
        ...userInfo,
        ipInfo: ipResponse?.data,
        agentInfo: agentResponse?.data,
      });
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  return (
    <div className="container mx-auto my-10">
      <Image
        src="./logo.svg"
        alt={'logo'}
        width={266}
        height={62}
        className="mt-[96px]"
      />

      <div className="flex justify-center items-center h-[calc(100vh-190px)]">
        <div
          className={`rounded-[34px] md:rounded-[56px] md:w-[791px] w-[350px] bg-white/15 backdrop-blur-md flex flex-col ${
            dataFetched ? 'items-start' : 'items-end'
          } gap-4 md:gap-11 p-4 md:p-9 border border-gradient `}>
          {dataFetched ? (
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">اطلاعات کاربر</h1>
                <h1
                  className="text-3xl flex justify-center items-center font-bold mb-4 cursor-pointer ml-4 h-16 w-16 bg-primary rounded-full line"
                  onClick={() => {
                    setDataFetched(false);
                  }}>
                  X
                </h1>
              </div>
              {userInfo?.agentInfo && userInfo?.ipInfo ? (
                <div className="mt-10">
                  <div className="grid grid-cols-2 gap-3">
                    <p>آدرس آیپی: {userInfo?.ipInfo?.query}</p>
                    <p>شهر: {userInfo?.ipInfo?.city}</p>
                    <p>استان / ایالت: {userInfo?.ipInfo?.regionName}</p>
                    <p>کشور: {userInfo?.ipInfo?.country}</p>
                    <p>
                      کدپستی:
                      {userInfo?.ipInfo?.zip == ''
                        ? 'ناموجود'
                        : userInfo?.ipInfo?.zip}
                    </p>
                    <p>سرویس دهنده اینترنت: {userInfo?.ipInfo?.isp}</p>
                    <p>نوع دستگاه: {userInfo?.agentInfo?.device}</p>
                    <p>سیستم عامل: {userInfo?.agentInfo?.os}</p>
                    <p>مرورگر: {userInfo?.agentInfo?.userAgent}</p>
                  </div>

                  <div className="bg-primary mt-10 p-3 overflow-hidden rounded-2xl">
                    <NeshanMap
                      mapKey="web.8269ae1efaee442aac942c23eb9df7f7"
                      center={{
                        latitude: userInfo?.ipInfo?.lat ?? 37.4316,
                        longitude: userInfo?.ipInfo?.lon ?? 78.6569,
                      }}
                      zoom={userInfo?.ipInfo?.country != 'Iran' ? 3 : 13}
                      className="h-[200px] md:h-[450px] rounded-2xl"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <>
              <div className="bg-primary w-full rounded-[20px] md:rounded-[36px]  grid grid-cols-1 gap-y-5 md:gap-y-9 p-4 md:p-10 ">
                <div className="text-secondary text-lg md:text-3xl">
                  👩🏻 توسط فاطمه ندافی
                </div>
                <hr className="border-secondary" />
                <div className="text-secondary text-lg md:text-5xl font-black">
                  🚀نمایش اطلاعات آیپی
                </div>
              </div>
              <div
                className="cursor-pointer px-5 py-3 text-lg  md:px-10 md:py-6 rounded-full md:text-2xl bg-primary text-secondary font-black"
                onClick={fetchData}>
                بررسی🔎
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
