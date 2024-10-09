import React, { useState, ChangeEvent } from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react" 
import { cn } from "@/Lib/utils"
import { Button } from "@/Components/UI/Button"
import { Calendar } from "@/Components/UI/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/Components/UI/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/Components/UI/select"
import { Dispatch, SetStateAction } from "react";

const SearchFinancial: React.FC<any> = ({ searchTerm, setSearchTerm , setquy ,setnam}) => {

   const handleSelectChangeQuy = (value : string) => {
      const selectedQuy = parseInt(value)
      setquy(selectedQuy); 
   };
   const handleSelectChangeNam = (value : string) =>{
      const selectedNam = parseInt(value)
      setnam(selectedNam); 
   }
   return(
      <>
      <div className="flex-1 relative flex items-center mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 text-white"> 
                <circle cx="11" cy="11" r="8" /> 
                <path d="m21 21-4.3-4.3" /> 
            </svg>
            <input type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Mã cổ phiếu..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-3xl bg-transparent placeholder-gray-500 w-full text-sm text-white" />
        </div>
        <div className="flex-1 flex items-center justify-center mx-2 rounded">
            <Select onValueChange={handleSelectChangeQuy}>
                <SelectTrigger className="w-[180px] text-text-Content">
                    <SelectValue placeholder="Quý" />
                </SelectTrigger>
                <SelectContent className="bg-background-active text-text-Content">
                    <SelectItem value="NaN">Không chọn</SelectItem>
                    <SelectItem value="0">BCTC Theo Năm</SelectItem>
                    <SelectItem value="1">Tìm kiếm theo quý 1</SelectItem>
                    <SelectItem value="2">Tìm kiếm theo quý 2</SelectItem>
                    <SelectItem value="3">Tìm kiếm theo quý 3</SelectItem>
                    <SelectItem value="4">Tìm kiếm theo quý 4</SelectItem>
                </SelectContent>
            </Select>
        </div>
          <div className="flex-1 flex items-center justify-center mx-2 rounded">
                                <Select onValueChange={handleSelectChangeNam}>
                                    <SelectTrigger className="w-[180px] text-text-Content">
                                       <SelectValue placeholder="Năm báo cáo" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background-active text-text-Content">
                                       <SelectItem value="NaN">Không chọn</SelectItem>
                                       <SelectItem value="2010">Năm 2010</SelectItem>
                                       <SelectItem value="2011">Năm 2011</SelectItem>
                                       <SelectItem value="2012">Năm 2012</SelectItem>
                                       <SelectItem value="2013">Năm 2013</SelectItem>
                                       <SelectItem value="2014">Năm 2014</SelectItem>
                                       <SelectItem value="2015">Năm 2015</SelectItem>
                                       <SelectItem value="2016">Năm 2016</SelectItem>
                                       <SelectItem value="2017">Năm 2017</SelectItem>
                                       <SelectItem value="2018">Năm 2018</SelectItem>
                                       <SelectItem value="2019">Năm 2019</SelectItem>
                                       <SelectItem value="2020">Năm 2020</SelectItem>
                                       <SelectItem value="2021">Năm 2021</SelectItem>
                                       <SelectItem value="2022">Năm 2022</SelectItem>
                                       <SelectItem value="2023">Năm 2023</SelectItem>
                                       <SelectItem value="2024">Năm 2024</SelectItem>
                                    </SelectContent>
                                 </Select>
         </div>
         <div className="flex-1 flex items-center justify-center mx-2">
                                <Select>
                                    <SelectTrigger className="w-[180px] text-text-Content">
                                       <SelectValue placeholder="Loại báo cáo" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background-active text-text-Content">
                                       <SelectItem value="light">Kết quả kinh doanh</SelectItem>
                                       <SelectItem value="dark">Cân đối kế toán</SelectItem>
                                       <SelectItem value="system">Lưu chuyển tiền tệ</SelectItem>
                                    </SelectContent>
                                 </Select>
         </div>
    
      </>
   )
}
export default SearchFinancial;