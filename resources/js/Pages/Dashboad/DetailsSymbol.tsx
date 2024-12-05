import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/UI/alert-dialog";
import { FileSearch2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/UI/tabs";

export default function DetailsSymbol({ selectedStock }: any) {
  if (!selectedStock) {
    return null; // Không hiển thị nếu không có dữ liệu cổ phiếu được chọn
  }

  // Hàm định dạng số thành tiền tệ
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
    <AlertDialog>
      <AlertDialogTrigger>
        <FileSearch2 strokeWidth={1.5} />
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[650px] max-w-full h-[450px]">
        <AlertDialogHeader className="w-[1000px]">
          <AlertDialogTitle>{selectedStock.symbol} - Chi Tiết</AlertDialogTitle>
          <Tabs defaultValue="account" className="w-[600px]">
            <TabsList>
              <TabsTrigger value="account">Thông Tin Cổ Phiếu</TabsTrigger>
              <TabsTrigger value="financials">Tài Chính</TabsTrigger>
              <TabsTrigger value="quarterly">Dữ Liệu Hàng Quý</TabsTrigger>
              <TabsTrigger value="stats">Thống Kê</TabsTrigger>
              <TabsTrigger value="delta">Biến Động</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <AlertDialogDescription>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Thuộc Tính</th>
                      <th className="px-4 py-2 text-left">Giá Trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2"><strong>Ngành</strong></td>
                      <td className="px-4 py-2">{selectedStock.industry}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Sàn Giao Dịch</strong></td>
                      <td className="px-4 py-2">{selectedStock.exchange}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Mã Cổ Phiếu</strong></td>
                      <td className="px-4 py-2">{selectedStock.symbol}</td>
                    </tr>
                  </tbody>
                </table>
              </AlertDialogDescription>
            </TabsContent>

            {/* Tab Tài Chính */}
            <TabsContent value="financials">
              <AlertDialogDescription>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Thuộc Tính</th>
                      <th className="px-4 py-2 text-left">Giá Trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2"><strong>Lợi Nhuận Ròng</strong></td>
                      <td className="px-4 py-2">{formatCurrency(selectedStock.year[0].net_profit)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Doanh Thu</strong></td>
                      <td className="px-4 py-2">{formatCurrency(selectedStock.year[0].revenue)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Vốn Cổ Phần</strong></td>
                      <td className="px-4 py-2">{formatCurrency(selectedStock.year[0].equity)}</td>
                    </tr>
                  </tbody>
                </table>
              </AlertDialogDescription>
            </TabsContent>

            {/* Tab Dữ Liệu Hàng Quý */}
            <TabsContent value="quarterly">
              <AlertDialogDescription>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Quý</th>
                      <th className="px-4 py-2 text-left">Lợi Nhuận Ròng</th>
                      <th className="px-4 py-2 text-left">Doanh Thu</th>
                      <th className="px-4 py-2 text-left">Vốn Cổ Phần</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStock.quarter.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-2">Q{item.quarter} {item.year}</td>
                        <td className="px-4 py-2">{formatCurrency(item.net_profit)}</td>
                        <td className="px-4 py-2">{formatCurrency(item.revenue)}</td>
                        <td className="px-4 py-2">{formatCurrency(item.equity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AlertDialogDescription>
            </TabsContent>

            {/* Tab Thống Kê */}
            <TabsContent value="stats">
              <AlertDialogDescription>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Thuộc Tính</th>
                      <th className="px-4 py-2 text-left">Giá Trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2"><strong>Giá Đóng Cửa Cuối</strong></td>
                      <td className="px-4 py-2">{formatCurrency(selectedStock.stats.last_closed_price)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Vốn Hóa Thị Trường</strong></td>
                      <td className="px-4 py-2">{formatCurrency(selectedStock.stats.marketcap)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>PE LTM</strong></td>
                      <td className="px-4 py-2">{selectedStock.stats.pe_ltm}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>ROE LTM</strong></td>
                      <td className="px-4 py-2">{selectedStock.stats.roe_ltm}%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>EPS LTM</strong></td>
                      <td className="px-4 py-2">{selectedStock.stats.eps_ltm}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>BVPS LTM</strong></td>
                      <td className="px-4 py-2">{selectedStock.stats.bvps_ltm}</td>
                    </tr>
                  </tbody>
                </table>
              </AlertDialogDescription>
            </TabsContent>

            {/* Tab Biến Động */}
            <TabsContent value="delta">
  <AlertDialogDescription>
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Biến Động</th>
          <th className="px-4 py-2 text-left">Tỷ Lệ (%)</th>
        </tr>
      </thead>
      <tbody>
        {["daily", "weekly", "monthly", "yearly"].map((period) => {
          const change = selectedStock.delta[period].change;
          const percent = selectedStock.delta[period].percent.toFixed(2); // Làm tròn số đến 2 chữ số thập phân
          const isNegative = percent < 0;
          return (
            <tr key={period}>
              <td className="px-4 py-2">
                <strong>Biến Động Hàng {period.charAt(0).toUpperCase() + period.slice(1)}</strong>
              </td>
              <td className={`px-4 py-2 ${isNegative ? "text-red-500" : "text-green-500"}`}>
                {change} ({percent}%) {/* Số thập phân đã được làm tròn */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </AlertDialogDescription>
</TabsContent>

          </Tabs>
        </AlertDialogHeader>
        <AlertDialogFooter className="relative">
        <AlertDialogCancel className="absolute bottom-3 left-[500px] bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600 transition-colors duration-200">
         xong
         </AlertDialogCancel>
</AlertDialogFooter>


      </AlertDialogContent>
    </AlertDialog>
  );
}
