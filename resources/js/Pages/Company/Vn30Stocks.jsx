import { useState, useEffect, useRef } from "react";
export default function Vn30Stocks({ data }) {
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length > 0) {
        setTimeout(()=>{
            setLoading(false);
        },1000)
      } else {
        setLoading(true);
      }
    } else {
      setLoading(true);
    }
  }, [data]);
  useEffect(() => {
    let rotation = 0;
    let intervalId;

    if (loading) {
      intervalId = setInterval(() => {
        rotation = (rotation + 1) % 360;
        if (svgRef.current) {
          svgRef.current.style.transform = `rotate(${rotation}deg)`;
        }
      }, 1); 
    }
    return () => clearInterval(intervalId); 
  }, [loading]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center" style={{ marginTop: "50px", height: "300px" }}>
        <span className="text-center text-xl font-medium text-text-Content">
          <svg
            ref={svgRef}
            className="lucide lucide-loader-circle"
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>
      </div>
    );
  }
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="border rounded-lg w-full flex items-center justify-center" style={{ marginTop: "50px", height: "300px" }}>
        <span className="text-center text-xl font-medium text-text-Content">
          Không thể tải Danh sách công ty <br />
          Lỗi Serve Vui lòng liên hệ: <a href="https://fintown.software/suport" className="text-text-link">Chăm sóc ADMIN</a>
        </span>
      </div>
    );
  }
  return (

   <div className="mt-5 gap-4" style={{ display : "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>      
        {data.map((item , index) =>(
          <div className="bg-background-active border-none rounded-md" key={index}>
            <div className="p-5">
                <div className="flex justify-between">
                     <div className="flex items-center justify-center">
                        <div className=""  style={{ position: 'relative', width: '3rem',  height: '3rem',  backgroundColor: '#fff', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e6e6e6' }}>
                          <img  src={item.logo}  alt={item.company_name}  style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', display: 'block' }} 
                            />
                        </div>
                        <div className="ml-3 flex items-center flex-col">
                          <a href={`/companies/${item.symbol}/edit`}>
                            <h2 className="text-text-Content text-xl font-bold">{item.symbol || "symbol"}</h2>
                            </a>
                          <span className="text-text-Content font-light">HOSE</span>
                        </div>
                     </div>
                      <div>
                        <button className=" bg-white w-[20px] h-[20px] rounded-lg" title="sửa nhanh">
                          <svg className="lucide lucide-pencil-line" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"  > <path d="M12 20h9" /> <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /> <path d="m15 5 3 3" /> </svg>
                        </button>
                        <button className=" bg-white w-[20px] h-[20px] rounded-lg ml-3 ">
                          <svg className="lucide lucide-arrow-up-right" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"  > <path d="M7 7h10v10" /> <path d="M7 17 17 7" /> </svg>
                        </button>
                      </div>
                </div>
                <hr  className="mt-3 text-text-Content-sub"/>
                <div className="flex flex-col mt-3 space-y-2">
                    <span className="text-xs font-semibold text-text-Content">
                      Tên Công ty:
                      <span className="ml-1 font-normal  break-words text-text-Content" >
                        {item.company_name || "Company Name"}
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-text-Content">
                      Ngành Công nghiệp:
                      <span className="ml-1 font-normal text-text-Content break-words">
                        {item.industry || "Nghiệp vụ"}
                      </span>
                    </span>
                  </div>

            </div>
        </div>
        ))}
   </div>
   
 
 
  );
}
