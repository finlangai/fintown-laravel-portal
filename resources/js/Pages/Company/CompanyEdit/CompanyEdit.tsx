import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import ProfileCompany from "./ProfileCompany";
import ShareHolder from "./ShareHolder";

export default function CompanyEdit() {
  const activeNavLink = {
    color: "#25B770",
  };
  const menuItem = [
    "Bảng điều khiển",
    "Người dùng",
    "Hóa đơn",
    "Sản phẩm và dịch vụ",
  ];
  const menuFiintown = [
    "Hồ sơ công ty",
    "Báo cáo tài chính",
    "Chỉ số tài chính",
    "Kết quả dự phóng",
  ];

  const { company, holders }: any = usePage().props;
  const holdersData: Holder[] = holders;
  const ProfileData: CompanyInfo = company;

  const [profileAndshareholder, setProfileAndshareholder] =
    useState<Boolean>(true);

  const toggleProfile = () => {
    setProfileAndshareholder(true);
  };
  const toggleShareholder = () => {
    setProfileAndshareholder(false);
  };
  return (
    <AuthenticatedLayout header={true}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-background-theme shadow-sm sm:rounded-lg overflow-hidden">
            <div className="flex items-center text-gray-900">
              <div className="relative w-[150px] h-[150px]">
                <div className="inline-flex top-0 left-0 absolute justify-end items-center w-[140px] h-[140px]">
                  <img
                    src={ProfileData.logo}
                    className="rounded-[10px]"
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
                <div className="top-[10px] left-[10px] absolute bg-white/0 rounded-[80px] w-[130px] h-[130px]" />
              </div>
              <div className="ml-5">
                <div className="font-['Nunito font-bold text-white text-xl Sans']">
                  {ProfileData.company_name || "Tên ngân hàng"}
                </div>
                <div className="opacity-90 font-['Nunito font-semibold text-base text-white/70 Sans']">
                  {ProfileData.profile.web_address || "web.example.com"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-10 w-48 h-[50px]">
            <button
              className={`w-48 h-[40px] ${profileAndshareholder ? `bg-custom-button-success text-white` : "border-neutral-400 border text-neutral-500"} rounded-lg flex justify-center items-center`}
              onClick={toggleProfile}
            >
              <div className="w-[148px] font-['Inter'] font-medium text-center text-sm">
                Hồ sơ công ty
              </div>
            </button>
            <button
              className={`w-48 h-[40px]  ${profileAndshareholder ? `bg-white border text-slate-600 border-slate-400` : "bg-custom-button-success text-white"} rounded-lg flex justify-center items-center ml-5`}
              onClick={toggleShareholder}
            >
              <div className="w-[148px] font-['Inter'] font-medium text-center text-sm">
                Danh sách cổ đông
              </div>
            </button>
          </div>
          <div className="border-[#848484] mt-10 border w-[1259.43px] h-[0px]"></div>

          {profileAndshareholder ? (
            <ProfileCompany profile={ProfileData} />
          ) : (
            <div>
              <ShareHolder holders={holdersData} />
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
