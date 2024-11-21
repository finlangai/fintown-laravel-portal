import { Toaster } from "@/Components/UI/sonner";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

const ProfileCompany = ({
  profile,
  message,
}: {
  profile: any;
  message?: string;
}) => {
  const { data, setData, put, processing, errors } = useForm(profile);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting with symbol:", data.symbol);
    if (!data.symbol) {
      console.error("Symbol is required.");
      return;
    }
    put(`/companies/update/${data.symbol}`, {
      onSuccess: () => {
        toast("Cập nhập thành công", {
          description: "Kéo xuống để tắt thông báo",
        });
      },
      onError: () => {
        console.error("Đã xảy ra lỗi khi gửi dữ liệu.");
      },
    });
  };
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mt-10">
          <div className="inline-flex flex-col justify-center items-start gap-2.5 w-[488px] h-[58px]">
            <div className="font-['Inter'] font-bold text-base text-text-Content">
              Hồ sơ công ty
            </div>
            <div className="w-[488px] font-['Inter'] font-normal text-sm text-text-Content">
              Cập nhật thông tin cơ bản của công ty tại đây
            </div>
          </div>
          <div className="inline-flex justify-center items-center w-[202px] h-10">
            <div className="inline-flex justify-center items-start gap-3 w-[202px] h-10">
              <button
                type="button"
                className="inline-flex justify-center items-center border rounded-lg w-[72px] self-stretch"
              >
                <div className="font-['Inter'] font-semibold text-sm text-text-Content">
                  Hủy
                </div>
              </button>
              <button
                type="submit"
                className="flex justify-end items-center border rounded-lg basis-0 grow self-stretch shrink"
              >
                <div className="pr-3 font-['Inter'] font-semibold text-neutral-950 text-sm">
                  Lưu thay đổi
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="border-[#848484] mt-10 border w-[1259.43px] h-[0px]"></div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Tên công ty
            </div>
            <div className="w-[329px] font-['Inter'] font-semibold text-text-Content text-xs">
              Tên đầy đủ của công ty.
            </div>
          </div>
          <input
            value={data.company_name || ""}
            onChange={(e) => setData("company_name", e.target.value)}
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[515px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Tên Quốc Tế
            </div>
            <div className="w-[329px] font-['Inter'] font-semibold text-text-Content text-xs">
              Phiên bản tên quốc tế (Tiếng anh)
            </div>
          </div>
          <input
            value={data.profile.international_name}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                international_name: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[515px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Tên ngắn
            </div>
            <div className="w-[329px] font-['Inter'] font-semibold text-text-Content text-xs">
              Tên rút gọn của công ty
            </div>
          </div>
          <input
            value={data.profile.short_name}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                short_name: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[200px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Mã cổ phiếu
            </div>
            <div className="w-[329px] font-['Inter'] font-semibold text-text-Content text-xs">
              Mã cổ phiếu của công ty được niêm yết
            </div>
          </div>
          <input
            value={data.symbol || ""}
            onChange={(e) => setData("symbol", e.target.value)}
            readOnly
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[200px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Sản niêm yết
            </div>
            <div className="w-[329px] font-['Inter'] font-semibold text-text-Content text-xs">
              Sàn niêm yết của cổ phiếu của công ty.
            </div>
          </div>
          <input
            value={data.profile.exchange}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                exchange: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[200px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Mã ngành ICB
            </div>
            <div className="w-[329px] max-w-[250px] font-['Inter'] font-semibold text-text-Content text-xs">
              Được áp dụng theo hệ thống phân ngành được phát triển bởi Dow
              Jones và FTSE.
            </div>
          </div>
          <input
            value={data.icb_code || ""}
            onChange={(e) => setData("icb_code", e.target.value)}
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Số giấy phép kinh doanh & mã số thuế
            </div>
            <div className="w-[329px] max-w-[250px] font-['Inter'] font-semibold text-text-Content text-xs">
              Số giấy phép kinh doanh cũng chính là mã số thuế của doanh nghiệp
            </div>
          </div>
          <input
            value={
              data.profile.business_license_number ||
              data.profile.tax_id_number ||
              ""
            }
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                business_license_number: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Trụ sở chính
            </div>
            <div className="w-[329px] max-w-[250px] font-['Inter'] font-semibold text-text-Content text-xs">
              Địa chỉ nơi liên lạc doanh nghiệp, được xác định theo địa giới
              hành chính.
            </div>
          </div>
          <input
            value={data.profile.head_quarters || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                head_quarters: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent mt-6 border rounded-md w-[515px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Số điện thoại
            </div>
          </div>
          <input
            value={data.profile.phone || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                phone: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Fax
            </div>
          </div>
          <input
            value={data.profile.fax || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                fax: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Email
            </div>
          </div>
          <input
            value={data.profile.email || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                email: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Địa chỉ website
            </div>
          </div>
          <input
            value={data.profile.web_address || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                web_address: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Thời gian niêm yết
            </div>
          </div>
          <input
            value={data.profile.date_of_listing || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                date_of_listing: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Ngày phát hành cuối
            </div>
            <div className="w-[329px] max-w-[250px] font-['Inter'] font-semibold text-text-Content text-xs">
              Ngày gần nhất công ty phát hành cổ phiếu
            </div>
          </div>
          <input
            value={data.profile.date_of_issue || ""}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                date_of_issue: e.target.value,
              })
            }
            type="text"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Vốn điều lệ (Đơn vị tỷ đồng)
            </div>
          </div>
          <input
            value={data.profile.charter_capital}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                charter_capital: Number(e.target.value),
              })
            }
            type="number"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Khối lượng cổ phiếu đang niêm yết
            </div>
          </div>
          <input
            value={data.profile.listing_volume}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                listing_volume: Number(e.target.value),
              })
            }
            type="number"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col justify-start items-start gap-[5px] mt-10 pb-5 w-[329px] h-[71px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Số lượng nhân sự hiện có
            </div>
          </div>
          <input
            value={data.profile.employees}
            onChange={(e) =>
              setData("profile", {
                ...data.profile,
                employees: Number(e.target.value),
              })
            }
            type="number"
            className="inline-flex justify-start items-center border-[#d9d9d9]/50 bg-transparent border rounded-md w-[300px] h-[40px] text-text-Content"
          />
        </div>
        <div className="relative w-[909px] h-[191px]">
          <div className="inline-flex top-[1px] left-0 absolute flex-col justify-start items-start gap-[5px] pb-1.5 h-[76px]">
            <div className="font-['Nunito font-bold text-base text-text-Content Sans']">
              Logo của công ty
            </div>
            <div className="w-[330px] font-['Inter'] font-semibold text-text-Content/70 text-xs">
              Logo Chính thức của {data.symbol}
            </div>
          </div>
          <div className="top-0 left-[393px] absolute w-[100px] h-[100px]">
            <div className="inline-flex top-0 left-0 absolute justify-end items-center w-[140px] h-[140px]">
              <img
                src={data.logo}
                className="bg-[#d9d9d9] rounded-[10px]"
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
            <div className="top-[5px] left-[5px] absolute bg-white/0 rounded-[80px] w-[90px] h-[90px]" />
          </div>
        </div>
      </form>
    </>
  );
};
export default ProfileCompany;
