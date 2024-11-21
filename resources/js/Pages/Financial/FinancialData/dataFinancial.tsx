const DataFinancial = ({ dataStatements }: any) => {
  return (
    <>
      <div className="rounded-xl">
        <div className="p-5">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="w-1/6 font-medium text-left text-sm">Mã CP</th>
                <th className="w-1/6 font-medium text-left text-sm">
                  Loại báo cáo
                </th>
                <th className="w-1/6 font-medium text-left text-sm">
                  Cập nhật lần cuối
                </th>
                <th className="w-1/6 font-medium text-left text-sm">
                  Kỳ báo cáo
                </th>
                {/* <th className="w-1/6 font-medium text-left text-sm">Tình trạng cập nhật</th> */}
                {/* <th className="w-1/6 font-medium text-left text-sm">
                  Hành động
                </th> */}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(dataStatements) ? (
                dataStatements.map((statement: any, index) => (
                  <tr key={index}>
                    <td className="py-6 w-1/6 font-normal text-left text-xs">
                      {statement.symbol}
                    </td>
                    <td className="py-6 w-1/6 font-normal text-left text-xs">
                      {statement.is_cashflow_direct
                        ? "Cash Flow"
                        : "Non Cash Flow"}
                    </td>
                    <td className="py-6 w-1/6 font-normal text-left text-xs">
                      --
                    </td>
                    <td className="py-6 w-1/6 font-normal text-left text-xs">
                      Quý {statement.quarter} Năm {statement.year}
                    </td>
                    {/* <td className="py-6 w-1/6 font-normal text-left text-xs">
                                  <div className="relative w-[114px] h-[27px]">
                                    <div className="top-0 left-0 absolute bg-custom-button-warning rounded w-[114px] h-[27px]" />
                                    <div className="top-[6px] left-[15px] absolute font-['Inter'] font-normal text-center text-white text-xs">Đang cập nhật</div>
                                 </div>
                              </td> */}
                    {/* <td className="flex py-6 w-1/6 font-normal text-left text-xs">
                      <button className="bg-white rounded-md text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="p-1 font-normal lucide lucide-move"
                        >
                          {" "}
                          <polyline points="5 9 2 12 5 15" />{" "}
                          <polyline points="9 5 12 2 15 5" />{" "}
                          <polyline points="15 19 12 22 9 19" />{" "}
                          <polyline points="19 9 22 12 19 15" />{" "}
                          <line x1={2} x2={22} y1={12} y2={12} />{" "}
                          <line x1={12} x2={12} y1={2} y2={22} />{" "}
                        </svg>
                      </button>
                      <button className="bg-white ml-3 rounded-md text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="p-1 lucide lucide-square-pen"
                        >
                          {" "}
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
                          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />{" "}
                        </svg>
                      </button>
                      <button className="bg-white ml-3 rounded-md text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="p-1 lucide-trash-2 lucide"
                        >
                          {" "}
                          <path d="M3 6h18" />{" "}
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />{" "}
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />{" "}
                          <line x1={10} x2={10} y1={11} y2={17} />{" "}
                          <line x1={14} x2={14} y1={11} y2={17} />{" "}
                        </svg>
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DataFinancial;
