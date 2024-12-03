import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";

import { FileSearch2, ScanSearch, Search } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './scroll.css'
import DetailsSymbol from "./DetailsSymbol";
type StockItem = {
  stt: number;
  code: string;
  industry: string;
};

export default function VN30RevenueProfitChart({ Stash }: any) {
  const [selectedStock, setSelectedStock] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  // Lấy danh sách cổ phiếu
  const stockList: StockItem[] = Stash.slice(0, 30).map((stock: any, index: number) => ({
    stt: index + 1,
    industry: stock.industry,
    code: stock.symbol,
  }));

  useEffect(() => {
    const stockDetailDefault = Stash.find((stock: any) => stock.symbol === "ACB");
    if (stockDetailDefault) {
      setSelectedStock(stockDetailDefault);
    }
  }, [Stash]);

  const filteredStockList = stockList.filter(stock =>
    stock.code.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleSelectStock = (code: string) => {
    const stockDetail = Stash.find((stock: any) => stock.symbol === code);
    if (stockDetail) {
      setSelectedStock(stockDetail);
    } else {
      console.log("Stock not found");
    }
  };

  const ViewRevenuproFit = () => {
    if (!selectedStock) return null;

    const quarterData = selectedStock.quarter || [];

    const revenueData = quarterData.map((item: any) => ({
      quarter: `Q${item.quarter} ${item.year}`,
      revenue: item.revenue,
    }));

    const profitData = quarterData.map((item: any) => ({
      quarter: `Q${item.quarter} ${item.year}`,
      profit: item.net_profit,
    }));

    const formatCurrency = (value: number): string => {
      const isNegative = value < 0;

      const absoluteValue = Math.abs(value);

      let formattedValue = "";

      if (absoluteValue >= 1_000_000_000) {
        formattedValue = Math.floor(absoluteValue / 1_000_000_000).toLocaleString() + " tỷ(VND)";
      } else if (absoluteValue >= 1_000_000) {
        formattedValue = Math.floor(absoluteValue / 1_000_000).toLocaleString() + " triệu đồng";
      } else if (absoluteValue >= 1_000) {
        formattedValue = Math.floor(absoluteValue / 1_000).toLocaleString() + " nghìn đồng";
      } else {
        formattedValue = absoluteValue.toLocaleString() + " đồng";
      }

      return isNegative ? `-${formattedValue}` : formattedValue;
    };

    return (
      <div className="border border-gray-300 w-full lg:w-1/2 rounded-xl p-5 shadow-lg bg-white">
        <h5 className="text-gray-600 text-sm text-center pb-5">
          Doanh thu và lợi nhuận của công ty {selectedStock?.symbol || "Tên công ty"}
        </h5>

        <div className="flex flex-col gap-4">
          {/* Biểu đồ doanh thu */}
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData} className="text-xs no-wrap flex">
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} width={120} />
              <Tooltip />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                payload={[{ value: "Doanh thu", type: "line", color: "#8884d8" }]}
              />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={profitData} className="text-xs no-wrap flex">
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} width={120} />
              <Tooltip />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                payload={[{ value: "Lợi nhuận", type: "line", color: "#82ca9d" }]}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Bảng doanh thu và lợi nhuận */}
          <TableCaption>Hiển thị bảng doanh thu và lợi nhuận</TableCaption>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Lợi nhuận (VND)</th>
                <th className="py-2 px-4 border-b">Doanh thu (VND)</th>
                <th className="py-2 px-4 border-b text-right">Quý</th>
              </tr>
            </thead>
            <tbody>
              {quarterData.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b"> {formatCurrency(item.net_profit)} </td>
                  <td className="py-2 px-4 border-b">{formatCurrency(item.revenue)}</td>
                  <td className="py-2 px-4 border-b text-right">Q{item.quarter} {item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="container flex gap-6 mb-10">
      <div className="border-[#e5e7eb] border-[1px] w-1/2 rounded-xl p-3">
      <div className="mb-4 relative">
      <input
        type="text"
        className="p-3 pl-10 pr-4 border border-gray-300 rounded-md  text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tìm kiếm mã cổ phiếu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        strokeWidth={1.5}
      />
    </div>
        <div className="h-[713px] overflow-y-auto">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead>Ngành</TableHead>
                <TableHead>Mã</TableHead>
                <TableHead className="text-right">Chức năng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStockList.map((item: StockItem, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.stt}</TableCell>
                  <TableCell>{item.industry}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-5">
                    <button className="custom-button text-red-500"   onClick={() => handleSelectStock(item.code)}>
                      <DetailsSymbol selectedStock={selectedStock} />
                     
                    </button>
                      <button
                        onClick={() => handleSelectStock(item.code)}
                        className="custom-button text-green-500"
                      >
                        <ScanSearch strokeWidth={1.5} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    </div>
      {selectedStock && ViewRevenuproFit()}
    </div>
  );
}
