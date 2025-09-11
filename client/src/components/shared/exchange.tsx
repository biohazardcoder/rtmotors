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
        <h1 className="text-lg md:text-3xl font-bold">1 USD Exchange Rates</h1>
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
        <h1 className="text-lg md:text-3xl font-bold">Exchange Rates</h1>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold">Enter amount in USD:</h1>
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
  className="flex flex-col gap-4 mt-12 text-xl font-semibold md:flex-row md:items-center md:justify-between"
>
  <li className="flex items-center gap-2">
    <img src="/lang/ru.png" alt="RUB" className="w-10 h-10 object-cover object-center rounded-full" />
    RUB: {data?.rates.RUB 
      ? (data.rates.RUB * amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
      : "N/A"}
  </li>
  <li className="flex items-center gap-2">
    <img src="/lang/kr.png" alt="KRW" className="w-10 h-10 object-cover object-center rounded-full" />
    KRW: {data?.rates.KRW 
      ? (data.rates.KRW * amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
      : "N/A"}
  </li>
  <li className="flex items-center gap-2">
    <img src="/lang/eu.png" alt="EUR" className="w-9 h-9 object-cover object-center rounded-full" />
    EUR: {data?.rates.EUR 
      ? (data.rates.EUR * amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
      : "N/A"}
  </li>
  <li className="flex items-center gap-2">
    <img src="/lang/uz.png" alt="UZS" className="w-10 h-10 object-cover object-center rounded-full" />
    UZS: {data?.rates.UZS 
      ? (data.rates.UZS * amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
      : "N/A"}
  </li>
</ul>

    </div>
  );
};
