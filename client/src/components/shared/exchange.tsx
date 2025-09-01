import { fetcher } from "@/middlewares/Fetcher";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const Exchange = () => {
  const { data, isLoading } = useSWR("/exchange", fetcher, { refreshInterval: 10000 });
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 800});
  }, []);

  if (isLoading) {
    return (
      <div
        className="py-8 px-[5%] bg-[#e7e7e7] rounded-xl"
        data-aos="fade-up"
      >
        <h1 className="text-xl md:text-3xl font-bold">1 USD Exchange Rates</h1>
        <ul className="flex flex-col gap-4 mt-12 text-xl font-semibold md:flex-row md:items-center md:justify-between">
          {[...Array(5)].map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <Skeleton className="w-12 h-8 rounded-md" />
              <Skeleton className="h-6 w-24" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="py-8 px-[5%] bg-[#e7e7e7] rounded-xl"
      >
      <div 
      data-aos="fade-up"
      className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl md:text-3xl font-bold">Exchange Rates</h1>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Enter amount in USD:</h1>
          <Input
            type="number"
            className="w-32 bg-secondary border-primary"
            placeholder="USD amount"
            value={amount}
            min={1}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <ul 
      data-aos="fade-up"
      className="flex flex-col gap-4 mt-12 text-xl font-semibold md:flex-row md:items-center md:justify-between">
        <li className="flex items-center gap-2">
          <img src="https://flagcdn.com/ru.svg" alt="RUB" className="w-12 h-8" />
          RUB: {data?.rates.RUB ? (data.rates.RUB * amount).toFixed(2) : "N/A"}
        </li>
        <li className="flex items-center gap-2">
          <img src="https://flagcdn.com/kr.svg" alt="KRW" className="w-12 h-8" />
          KRW: {data?.rates.KRW ? (data.rates.KRW * amount).toFixed(2) : "N/A"}
        </li>
        <li className="flex items-center gap-2">
          <img src="https://flagcdn.com/eu.svg" alt="EUR" className="w-12 h-8" />
          EUR: {data?.rates.EUR ? (data.rates.EUR * amount).toFixed(2) : "N/A"}
        </li>
        <li className="flex items-center gap-2">
          <img src="https://flagcdn.com/uz.svg" alt="UZS" className="w-12 h-8" />
          UZS: {data?.rates.UZS ? (data.rates.UZS * amount).toFixed(2) : "N/A"}
        </li>
      </ul>
    </div>
  );
};
