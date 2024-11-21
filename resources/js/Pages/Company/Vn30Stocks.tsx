import { Link } from "@inertiajs/react";
import { PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function Vn30Stocks({ data }: any) {
  // type công ty nó số liệu lúc nhiều lúc ít lúc có lúc không nên hùng để là any
  const [loading, setLoading] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length > 0) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(true);
    }
  }, [data]);
  useEffect(() => {
    let rotation = 0;
    let intervalId: any;

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
      <div
        className="flex justify-center items-center w-full"
        style={{ marginTop: "50px", height: "300px" }}
      >
        <span className="font-medium text-center text-text-Content text-xl">
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
      <div
        className="flex justify-center items-center border rounded-lg w-full"
        style={{ marginTop: "50px", height: "300px" }}
      >
        <span className="font-medium text-center text-text-Content text-xl">
          Không thể tải Danh sách công ty <br />
          Lỗi Serve Vui lòng liên hệ:{" "}
          <a href="https://fintown.software/suport" className="text-text-link">
            Chăm sóc ADMIN
          </a>
        </span>
      </div>
    );
  }
  return (
    <div
      className="gap-5 mt-6"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      }}
    >
      {data.map((item, index) => (
        <div
          className="bg-slate-50 bg-opacity-10 shadow-md rounded-md"
          key={index}
        >
          <div className="p-5">
            <div className="flex justify-between">
              <div className="flex justify-center items-center">
                <div
                  className=""
                  style={{
                    position: "relative",
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid #e6e6e6",
                  }}
                >
                  <img
                    src={item.logo}
                    alt={item.company_name}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      maxWidth: "100%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="flex flex-col ml-3 text-start">
                  <a
                    href={`/companies/${item.symbol}/edit`}
                    className="text-left"
                  >
                    <h2 className="font-bold text-text-Content text-xl">
                      {item.symbol || "symbol"}
                    </h2>
                  </a>
                  <span className="font-light text-left text-text-Content text-xs">
                    HOSE
                  </span>
                </div>
              </div>
              <div className="flex">
                <Link
                  href={route("companies.edit", item.symbol)}
                  className="bg-white rounded-lg w-[20px] h-[20px]"
                  title="sửa nhanh"
                >
                  <PenLine className="size-5 stroke-slate-600" />
                </Link>
                {/* <button className="bg-white ml-3 rounded-lg w-[20px] h-[20px]">
                  <ArrowUpRight className="stroke-slate-600" />
                </button> */}
              </div>
            </div>
            <hr className="mt-3 text-text-Content-sub" />
            <div className="flex flex-col space-y-2 mt-3">
              <span className="line-clamp-1 font-semibold text-sm text-text-Content">
                {item.company_name || "Company Name"}
              </span>
              <span className="line-clamp-1 font-semibold text-text-Content text-xs">
                <span className="font-normal text-text-Content break-words">
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
