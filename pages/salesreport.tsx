"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';
import { DatePicker } from "@nextui-org/date-picker";
import { parseAbsoluteToLocal } from "@internationalized/date";
import React from "react";
import { I18nProvider } from "@react-aria/i18n";



interface SalesData {
  MP: string;
  Naziv: string;
  BrojRacuna: number;
  Pazar: string;
  PazarNoFormat: number;
}

interface TotalSales {
  Pazar: string;
  PazarNoFormat: number;
}

interface ApiResponse {
  result1: SalesData[];
  result2: TotalSales[];
}

/**
 * SalesReport renders a page with a date picker and a DailySales component for that date.
 * It also renders a footer with a link to the author's website.
 */
export default function SalesReport() {
  const [date, setDate] = React.useState(parseAbsoluteToLocal(new Date().toISOString()));
  const formattedDate = date.toString().slice(0, 10);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" style={{ backgroundColor: 'white', color: 'black' }}>
      <main className="flex flex-col gap-2 row-start-2" >
        <I18nProvider locale="sr-SR">
          <DatePicker
            color='primary'
            granularity="day"
            label="Pick date"
            className="max-w-[120px] p-2 self-center" 
            variant="flat"
            description={"pick date on calendar icon"}
            labelPlacement="inside"
            size="lg"
            value={date}
            onChange={setDate}
          />
        </I18nProvider>
        <div className="flex flex-col gap-4">
          <h1 style={  { textAlign: 'center', fontWeight: 'bold', backgroundColor: '#cce3fd' }}>Daily Sales Report</h1>
          <DailySales date={formattedDate} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vladimirkonrad.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          made by vladimirkonrad.com →
        </a> 
      </footer>
    </div>
  );
}

  /**
   * Renders a table of daily sales report for the given date.
   *
   * The component fetches the data from the `/api/sales` endpoint and displays a table
   * with the following columns:
   * - Store: the name of the store
   * - Receipts: the number of receipts for the store on the given date
   * - Sales: the total sales for the store on the given date
   *
   * The table also includes a row with the total sales for all stores.
   *
   * If the data is not available, the component displays a message "No data available".
   * If there is an error fetching the data, the component displays a message with the error.
   *
   * @param {string} date - the date for which to display the sales report
   * @returns {React.ReactElement}
   */
function DailySales({ date }: { date: string }) {
  const [salesData, setSalesData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`/api/sales?date=${date}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, [date]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!salesData) return <div>No data available</div>;

  return (
    <div className="w-full max-w-4xl">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse ">
          <thead>
            <tr style={{ backgroundColor: '#99c7fb' }}>
              <th className="p-2 text-left">Store</th>
              <th className="p-2 text-end">Receipts</th>
              <th className="p-2 text-end">Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.result1.map((store) => (
              <tr key={store.MP} className="border-b custom-row-spacing">
                <td className="p-3">{store.Naziv}</td>
                <td className="p-4 justify-content-left">{store.BrojRacuna}</td>
                <td className="p-4 justify-content-right">{store.Pazar}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#99c7fb' }}>
              <td className="p-2">Total</td>
              <td className="p-2 text-right">
                {salesData.result1.reduce((acc, store) => acc + store.BrojRacuna, 0)}
              </td>
              <td className="p-2 text-right">{salesData.result2[0].Pazar}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
