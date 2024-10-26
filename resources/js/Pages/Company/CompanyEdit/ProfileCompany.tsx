import { useForm } from "@inertiajs/react";
import { Toaster } from "@/Components/UI/sonner"
import { toast } from "sonner"
import { useEffect } from "react";

const ProfileCompany = ({ profile, message }: { profile: any; message?: string }) => {
    const { data, setData, put, processing, errors } = useForm(profile);
    const handleSubmit = (e: React.FormEvent) => {  
        e.preventDefault();
        console.log("Submitting with symbol:", data.symbol)
        if (!data.symbol) {
            console.error("Symbol is required.");
            return; 
        }
        put(`/companies/update/${data.symbol}`, {
            onSuccess: () => {
                toast('Cập nhập thành công', {
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
      <div className="flex mt-10 justify-between">
                        <div className="w-[488px] h-[58px] flex-col justify-center items-start gap-2.5 inline-flex">
                            <div className="text-text-Content text-base font-bold font-['Inter']">Hồ sơ công ty</div>
                            <div className="w-[488px] text-text-Content text-sm font-normal font-['Inter']">Cập nhật thông tin cơ bản của công ty tại đây</div>
                        </div>
                        <div className="w-[202px] h-10 justify-center items-center inline-flex">
                        <div className="w-[202px] h-10 justify-center items-start gap-3 inline-flex">
                            <button type="button" className="w-[72px] self-stretch rounded-lg border border-[#8a8a8a] justify-center items-center inline-flex">
                                <div className="text-text-Content text-sm font-semibold font-['Inter']">Hủy</div>
                            </button>
                            <button type="submit" className="grow shrink basis-0 self-stretch bg-white rounded-lg shadow-inner border border-white justify-end items-center flex">
                                <div className="text-neutral-950 text-sm font-semibold font-['Inter'] pr-3">Lưu thay đổi</div>
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className="w-[1259.43px] h-[0px] border border-[#848484] mt-10"></div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Tên công ty</div>
                            <div className="w-[329px] text-text-Content text-xs font-semibold font-['Inter']">Tên đầy đủ của công ty.</div>
                        </div>
                        <input 
                        value={data.company_name || ""}
                        onChange={e=>setData('company_name' , e.target.value)} 
                        type="text" className="w-[515px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Tên Quốc Tế</div>
                            <div className="w-[329px] text-text-Content text-xs font-semibold font-['Inter']">Phiên bản tên quốc tế (Tiếng anh)</div>
                        </div>
                        <input
                        value={data.profile.international_name}
                        onChange={e => setData('profile', {
                            ...data.profile, 
                            international_name: e.target.value 
                          })}
                        type="text" className="w-[515px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Tên ngắn</div>
                            <div className="w-[329px] text-text-Content text-xs font-semibold font-['Inter']">Tên rút gọn của công ty</div>
                        </div>
                        <input
                        value={data.profile.short_name}
                        onChange={e=> setData('profile', {
                            ...data.profile,
                            short_name : e.target.value
                        })}
                         type="text" className="w-[200px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Mã cổ phiếu</div>
                            <div className="w-[329px] text-text-Content text-xs font-semibold font-['Inter']">Mã cổ phiếu của công ty được niêm yết</div>
                        </div>
                        <input 
                        value={data.symbol || ""}
                        onChange={e => setData('symbol' , e.target.value)}
                        readOnly
                        type="text" className="w-[200px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />
                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Sản niêm yết</div>
                            <div className="w-[329px] text-text-Content text-xs font-semibold font-['Inter']">Sàn niêm yết của cổ phiếu của công ty.</div>
                        </div>
                        <input
                        value={data.profile.exchange}
                        onChange={e=>setData('profile' , {
                            ...data.profile,
                            exchange : e.target.value
                        })}
                        type="text" className="w-[200px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Mã ngành ICB</div>
                            <div className="w-[329px] max-w-[250px] text-text-Content text-xs font-semibold font-['Inter']">Được áp dụng theo hệ thống phân ngành được phát triển bởi Dow Jones và FTSE.</div>
                        </div>
                        <input 
                        value={data.icb_code || ""}
                        onChange={e=>setData('icb_code', e.target.value)}
                        type="text" className="w-[300px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Số giấy phép kinh doanh & mã số thuế</div>
                            <div className="w-[329px] max-w-[250px] text-text-Content text-xs font-semibold font-['Inter']">Số giấy phép kinh doanh cũng chính là mã số thuế của doanh nghiệp</div>
                        </div>
                        <input 
                        value={data.profile.business_license_number || data.profile.tax_id_number ||""}
                        onChange={e=> setData('profile' , {
                            ...data.profile,
                            business_license_number : e.target.value
                        })}
                        type="text" className="w-[300px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Trụ sở chính</div>
                            <div className="w-[329px] max-w-[250px] text-text-Content text-xs font-semibold font-['Inter']">Địa chỉ nơi liên lạc doanh nghiệp, được xác định theo địa giới hành chính.</div>
                        </div>
                        <input 
                        value={data.profile.head_quarters || ""}
                        onChange={e=> setData('profile' , {
                            ...data.profile ,
                            head_quarters : e.target.value
                        })}
                        type="text" className="w-[515px] h-[40px] mt-6 rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Số điện thoại</div>
                        </div>
                        <input 
                        value={data.profile.phone || ""}
                        onChange={e=> setData('profile' , {
                            ...data.profile ,
                            phone : e.target.value
                        })}
                        type="text" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Fax</div>
                        </div>
                        <input 
                          value={data.profile.fax || ""}
                          onChange={e=> setData('profile' , {
                              ...data.profile ,
                              fax : e.target.value
                          })}
                        type="text" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Email</div>
                        </div>
                        <input 
                        value={data.profile.email || ""}
                        onChange={e=> setData('profile' , {
                            ...data.profile ,
                            email : e.target.value
                        })}
                        type="text" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Địa chỉ website</div>
                        </div>
                        <input 
                        value={data.profile.web_address || ""}
                        onChange={e=> setData('profile' , {
                            ...data.profile ,
                            web_address : e.target.value
                        })}
                        type="text" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Thời gian niêm yết</div>
                        </div>
                        <input 
                        value={data.profile.date_of_listing || ""}
                        onChange={e=> setData('profile' , {
                            ...data.profile ,
                            date_of_listing : e.target.value
                        })}
                        type="text" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Ngày phát hành cuối</div>
                            <div className="w-[329px] max-w-[250px] text-text-Content text-xs font-semibold font-['Inter']">Ngày gần nhất công ty phát hành cổ phiếu</div>
                        </div>
                        <input 
                        value={data.profile.date_of_issue || ""}
                        onChange={e=> setData('profile' , {
                            ...data.profile ,
                            date_of_issue : e.target.value
                        })}
                        type="text" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Vốn điều lệ (Đơn vị tỷ đồng)</div>
                        </div>
                        <input
                         value={data.profile.charter_capital}
                         onChange={e=> setData('profile' , {
                             ...data.profile ,
                             charter_capital : Number(e.target.value)
                         })}
                        type="number" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Khối lượng cổ phiếu đang niêm yết</div>
                        </div>
                        <input
                         value={data.profile.listing_volume}
                         onChange={e=> setData('profile' , {
                             ...data.profile ,
                             listing_volume : Number(e.target.value)
                         })}
                        type="number" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="flex items-center">
                        <div className="w-[329px] h-[71px] pb-5 flex-col justify-start items-start gap-[5px] inline-flex mt-10">
                            <div className="text-text-Content  text-base font-bold font-['Nunito Sans']">Số lượng nhân sự hiện có</div>
                        </div>
                        <input 
                         value={data.profile.employees}
                         onChange={e=> setData('profile' , {
                             ...data.profile ,
                             employees : Number(e.target.value)
                         })}
                        type="number" className="w-[300px] h-[40px] rounded-md border border-[#d9d9d9]/50 justify-start items-center inline-flex bg-transparent text-text-Content" />

                    </div>
                    <div className="w-[909px] h-[191px] relative">
                        <div className="h-[76px] pb-1.5 left-0 top-[1px] absolute flex-col justify-start items-start gap-[5px] inline-flex">
                            <div className="text-text-Content text-base font-bold font-['Nunito Sans']">Logo của công ty</div>
                            <div className="w-[330px] text-text-Content/70 text-xs font-semibold font-['Inter']">Logo Chính thức của {data.symbol}</div>
                        </div>
                        <div className="w-[100px] h-[100px] left-[393px] top-0 absolute">
                                 <div className="left-0 top-0 absolute justify-end items-center inline-flex w-[140px] h-[140px]">
                                    <img src={data.logo} className=" bg-[#d9d9d9] rounded-[10px]" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', display: 'block' }} />
                                </div>
                            <div className="w-[90px] h-[90px] left-[5px] top-[5px] absolute bg-white/0 rounded-[80px]" />
                        </div>
                    </div>
    </form>
      </>
   )
}
export default ProfileCompany;