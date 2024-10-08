import * as React from "react";
import { Head, usePage } from "@inertiajs/react";
const DataFinancial = ({ dataStatements } : any) => {
   return (
      <>
        <div className="bg-background-active text-text-Content rounded-xl">
            <div className="p-5">
               <table className="table-fixed w-full">
                  <thead>
                     <tr>
                        <th className="w-1/6 text-sm font-medium text-left">Mã CP</th>
                        <th className="w-1/6 text-sm font-medium text-left">Loại báo cáo</th>
                        <th className="w-1/6 text-sm font-medium text-left">Cập nhật lần cuối</th>
                        <th className="w-1/6 text-sm font-medium text-left">Kỳ báo cáo</th>
                        <th className="w-1/6 text-sm font-medium text-left">Tình trạng cập nhật</th>
                        <th className="w-1/6 text-sm font-medium text-left">Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {Array.isArray(dataStatements) ? (
                        dataStatements.map((statement: any , index) => (
                           <tr key={index}>
                              <td className="w-1/6 text-xs font-normal text-left py-6">{statement.symbol}</td>
                              <td className="w-1/6 text-xs font-normal text-left py-6">{statement.is_cashflow_direct ? "Cash Flow" : "Non Cash Flow"}</td>
                              <td className="w-1/6 text-xs font-normal text-left py-6">--</td>
                              <td className="w-1/6 text-xs font-normal text-left py-6">Quý {statement.quarter} Năm {statement.year}</td>
                              <td className="w-1/6 text-xs font-normal text-left py-6">
                                  <div className="w-[114px] h-[27px] relative">
                                    <div className="w-[114px] h-[27px] left-0 top-0 absolute bg-[#6225ee] rounded" />
                                    <div className="left-[15px] top-[6px] absolute text-center text-white text-xs font-normal font-['Inter']">Đang cập nhật</div>
                                 </div>
                              </td>
                              <td className="w-1/6 text-xs font-normal text-left py-6 flex">
                                 <button className=" text-black bg-white rounded-md ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move p-1 font-normal" > <polyline points="5 9 2 12 5 15" /> <polyline points="9 5 12 2 15 5" /> <polyline points="15 19 12 22 9 19" /> <polyline points="19 9 22 12 19 15" /> <line x1={2} x2={22} y1={12} y2={12} /> <line x1={12} x2={12} y1={2} y2={22} /> </svg>
                                 </button>
                                 <button className=" text-black bg-white rounded-md ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen p-1" > <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /> <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /> </svg>
                                 </button>
                                 <button className=" text-black bg-white rounded-md ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 p-1" > <path d="M3 6h18" /> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /> <line x1={10} x2={10} y1={11} y2={17} /> <line x1={14} x2={14} y1={11} y2={17} /> </svg>
                                 </button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={6} className="text-center">Không có dữ liệu</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

      </>
   )
}

export default DataFinancial;