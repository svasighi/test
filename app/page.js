"use client";

import { useState } from "react";
import axios from "axios";
import NeshanMap from "react-neshan-map-leaflet";
import Image from "next/image";
import closeIcon from "@/public/close.svg";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const fetchData = async () => {
    try {
      setDataFetched(false);

      const agentResponse = await axios.get(
        `https://api.bigdatacloud.net/data/client-info/`
      );

      const ipResponse = await axios.get(
        `https://uixstore.ir/iplocation.php?ip=${agentResponse?.data?.ipString}`
      );
      setUserInfo({
        ...userInfo,
        ipInfo: ipResponse?.data,
        agentInfo: agentResponse?.data,
      });
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
  return (
    <div className="container mx-auto my-10">
      <Image
        src="./logo.svg"
        alt={"logo"}
        width={266}
        height={62}
        className="mt-24 mr-10"
      />

      <div className="flex justify-center items-center h-[calc(100vh-190px)]">
        <div
          className={`rounded-[34px] md:rounded-[56px] md:w-[620px] w-[320px] bg-white/15 backdrop-blur-md flex flex-col ${
            dataFetched ? "items-start" : "items-end"
          } gap-4 md:gap-11 p-4 md:p-9 border border-gradient `}
        >
          {dataFetched ? (
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">اطلاعات کاربر</h1>
                <div
                  className="text-3xl flex justify-center items-center font-bold mb-4 cursor-pointer ml-4 h-16 w-16 bg-primary rounded-full line"
                  onClick={() => {
                    setDataFetched(false);
                  }}
                >
                  <Image src={closeIcon} alt="" />
                </div>
              </div>
              {userInfo?.agentInfo && userInfo?.ipInfo ? (
                <div className="mt-10">
                  <div className="grid grid-cols-2 gap-3 text-xl">
                    <p>آدرس آیپی: {userInfo?.agentInfo?.ipString}</p>
                    <p>شهر: {userInfo?.ipInfo?.city?.names?.fa}</p>
                    <p>
                      استان / ایالت:{" "}
                      {userInfo?.ipInfo?.subdivisions[0].names.fa}
                    </p>
                    <p>کشور: {userInfo?.ipInfo?.country.names.fa}</p>
                    <p>
                      نوع اتصال:
                      {userInfo?.ipInfo?.traits?.connection_type}
                    </p>
                    <p>سرویس دهنده اینترنت: {userInfo?.ipInfo?.traits?.isp}</p>
                    <p>نوع دستگاه: {userInfo?.agentInfo?.device}</p>
                    <p>سیستم عامل: {userInfo?.agentInfo?.os}</p>
                    <p>مرورگر: {userInfo?.agentInfo?.userAgent}</p>
                  </div>

                  <div className="bg-primary mt-10 p-3 overflow-hidden rounded-2xl">
                    {
                      <NeshanMap
                        options={{
                          key: "web.8269ae1efaee442aac942c23eb9df7f7",
                          maptype: "dreamy",
                          poi: true,
                          traffic: false,
                          center: [
                            userInfo?.ipInfo?.location?.latitude ?? 35.699739,
                            userInfo?.ipInfo?.location?.longitude ?? 51.338097,
                          ],
                          zoom:
                            userInfo?.ipInfo?.country.iso_doce != "IR" ? 3 : 13,
                        }}
                        className="h-[200px] md:h-[450px] rounded-2xl"
                      />
                    }
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
                onClick={fetchData}
              >
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
