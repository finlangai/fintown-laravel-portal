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
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const ShareHolder: React.FC<ShareHolderProps> = ({ holders }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const showMore = () => {
    setVisibleCount(holders.length);
  };

  const {
    data,
    setData,
    put,
    delete: deleteData,
    processing,
    errors,
  } = useForm({
    id: "",
    symbol: "",
    name: "",
    position: "",
    shares: "",
    ownership: "",
    is_organization: false,
    is_foreigner: false,
    is_founder: false,
  });

  const handleEdit = (item: any) => {
    setData({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      position: item.position || "",
      shares: item.shares.toString(),
      ownership: item.ownership,
      is_organization: item.is_organization,
      is_foreigner: item.is_foreigner,
      is_founder: item.is_founder,
    });
  };
  const luuShareHolders = (e: React.FormEvent) => {
    // e.preventDefault();
    put(`/holders/update/${data.id}`, {
      onSuccess: () => {
        console.log("Đã truyền dữ liệu đi");
        toast("Cập nhập thành công", {
          description: "Kéo xuống để tắt thông báo",
        });
      },
      onError: (error) => {
        console.error("Đã xảy ra lỗi khi gửi dữ liệu.", error);
      },
    });
  };
  const removeHolders = (id: string) => {
    deleteData(`/holders/delete/${id}`, {
      onSuccess: () => {
        toast("Xóa thành công Holders", {
          description: "Kéo xuống để tắt thông báo",
        });
      },
      onError: () => {
        console.error("Đã xảy ra lỗi khi xóa.");
      },
    });
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-between mt-10">
        <div className="inline-flex flex-col justify-center items-start gap-2.5 w-[488px] h-[58px]">
          <div className="font-['Inter'] font-bold text-base text-white">
            Danh sách cổ đông
          </div>
          <div className="w-[488px] font-['Inter'] font-normal text-sm text-white">
            Cập nhật thông tin cổ đông lớn của công ty tại đây
          </div>
        </div>
        <div className="inline-flex justify-center items-start gap-3 w-[202px] h-10">
          <button type="button"></button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex justify-center items-center border-[#8a8a8a] bg-custom-button-success border rounded-lg w-[200px] self-stretch"
              >
                <div className="font-['Inter'] font-semibold text-sm text-white">
                  Thêm cổ đông
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-background-active border-transparent text-text-Content">
              <AlertDialogHeader>
                <AlertDialogTitle>Điền bổ sung thông tin</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="my-3">
                    <label
                      htmlFor="name_holders"
                      className="font-medium text-base text-text-Content"
                    >
                      Tên cổ đông
                    </label>
                    <Input
                      id="name_holders"
                      className="mt-3"
                      placeholder="Nhập tên cổ đông"
                    />
                  </div>
                  <div className="my-3">
                    <label
                      htmlFor="shares"
                      className="font-medium text-base text-text-Content"
                    >
                      Số cổ phần
                    </label>
                    <Input
                      id="shares"
                      className="mt-3"
                      placeholder="Nhập số cổ phần"
                    />
                  </div>
                  <div className="flex flex-col my-3">
                    <label
                      htmlFor="ownership"
                      className="font-medium text-base text-text-Content"
                    >
                      Tỉ lệ sở hữu
                    </label>
                    <Input
                      id="ownership"
                      className="mt-3"
                      placeholder="Tỉ lệ sở hữu"
                    />
                  </div>
                  <div className="flex mt-3">
                    <div>
                      <label
                        htmlFor="is_foreigner"
                        className="font-medium text-base text-text-Content"
                      >
                        Loại cổ đông
                      </label>
                      <Select>
                        <SelectTrigger className="mt-3 text-text-Content">
                          <SelectValue placeholder="Chọn loại cổ đông" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="true">Tổ chức</SelectItem>
                            <SelectItem value="false">Cá nhân</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="ml-20">
                      <label
                        htmlFor="is_foreigner"
                        className="font-medium text-base text-text-Content"
                      >
                        Nguồn gốc
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setData({ ...data, is_foreigner: value === "true" })
                        }
                      >
                        <SelectTrigger className="mt-3 text-text-Content">
                          <SelectValue placeholder="Chọn nguồn gốc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="true">Nước ngoài</SelectItem>
                            <SelectItem value="false">Trong nước</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent">
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction>Thêm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="border-[#848484] mt-10 border w-[1259.43px] h-[0px]"></div>

      <div className="relative mt-8 w-[1280px] h-[50px]">
        <div className="top-0 left-0 absolute bg-[#274241] rounded-tl-xl rounded-tr-xl w-[1280px] h-[50px]" />
        <div className="top-[13px] left-[42px] absolute w-[1188px] h-[19px]">
          <div className="top-0 left-0 absolute opacity-90 w-[355px] font-['Inter'] font-normal text-white text-xs">
            TÊN CỔ ĐÔNG
          </div>
          <div className="top-0 left-[424px] absolute opacity-90 w-[127px] font-['Inter'] font-normal text-white text-xs">
            SỐ CỔ PHẦN
          </div>
          <div className="top-0 left-[583px] absolute opacity-90 font-['Inter'] font-normal text-white text-xs">
            LOẠI CỔ ĐÔNG
          </div>
          <div className="top-0 left-[757px] absolute opacity-90 font-['Inter'] font-normal text-white text-xs">
            TỶ LỆ SỞ HỮU(%)
          </div>
          <div className="top-0 left-[944px] absolute opacity-90 w-[89px] font-['Inter'] font-normal text-white text-xs">
            NGUỒN GỐC
          </div>
          <div className="top-0 left-[1098px] absolute opacity-90 font-['Inter'] font-normal text-white text-xs">
            HÀNH ĐỘNG
          </div>
        </div>
      </div>

      {holders.slice(0, visibleCount).map((item) => (
        <div
          className="relative bg-[#324E44] w-[1280px] h-[49px]"
          key={item.id}
        >
          <div className="top-[15px] left-[41px] absolute opacity-90 font-['Inter'] font-normal text-white text-xs">
            {item.name}
          </div>
          <div className="top-[15px] left-[465px] absolute opacity-90 w-[127px] font-['Inter'] font-normal text-white text-xs">
            {item.shares.toLocaleString()}
          </div>
          <div className="top-[15px] left-[624px] absolute opacity-90 w-[104px] font-['Inter'] font-normal text-white text-xs">
            {item.is_organization ? "Tổ chức" : "Cá nhân"}
          </div>
          <div className="top-[15px] left-[798px] absolute opacity-90 w-[122px] font-['Inter'] font-normal text-white text-xs">
            {(item.ownership * 100).toFixed(2)}%
          </div>
          <div className="top-[15px] left-[985px] absolute opacity-90 w-[89px] font-['Inter'] font-normal text-white text-xs">
            {item.is_foreigner ? "Nước ngoài" : "Trong nước"}
          </div>
          <div className="inline-flex top-0 left-[1125px] absolute justify-end items-start gap-[7px] pl-[37px] h-[30px]">
            <div className="flex justify-center items-center border-[#8a8a8a] bg-white mt-2 border rounded-lg w-[30px] h-[30px]">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button onClick={() => handleEdit(item)}>
                    <svg
                      className="lucide lucide-pencil-line"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                      <path d="m15 5 3 3" />
                    </svg>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-background-active border-none text-text-Content">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Chỉnh sửa thông tin cổ đông
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="my-3">
                        <label
                          htmlFor="name_holders"
                          className="font-medium text-base text-text-Content"
                        >
                          Tên cổ đông
                        </label>
                        <Input
                          id="name_holders"
                          className="mt-3"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="shares"
                          className="font-medium text-base text-text-Content"
                        >
                          Số cổ phần
                        </label>
                        <Input
                          id="shares"
                          className="mt-3"
                          value={data.shares}
                          onChange={(e) =>
                            setData({ ...data, shares: e.target.value || "0" })
                          }
                        />
                      </div>
                      <div className="flex flex-col my-3">
                        <label
                          htmlFor="ownership"
                          className="font-medium text-base text-text-Content"
                        >
                          Tỉ lệ sở hữu
                        </label>
                        <Input
                          id="ownership"
                          className="mt-3"
                          value={data.ownership}
                          onChange={(e) =>
                            setData({
                              ...data,
                              ownership: e.target.value || "0",
                            })
                          }
                        />
                      </div>
                      <div className="flex mt-3">
                        <div>
                          <label
                            htmlFor="is_foreigner"
                            className="font-medium text-base text-text-Content"
                          >
                            Loại cổ đông
                          </label>
                          <Select
                            onValueChange={(value) =>
                              setData({
                                ...data,
                                is_organization: value === "true",
                              })
                            }
                          >
                            <SelectTrigger className="mt-3 text-text-Content">
                              <SelectValue
                                placeholder={
                                  item.is_organization ? "Tổ chức" : "Cá nhân"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="true">Tổ chức</SelectItem>
                                <SelectItem value="false">Cá nhân</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="ml-20">
                          <label
                            htmlFor="is_foreigner"
                            className="font-medium text-base text-text-Content"
                          >
                            Nguồn gốc
                          </label>
                          <Select
                            onValueChange={(value) =>
                              setData({
                                ...data,
                                is_foreigner: value === "true",
                              })
                            }
                          >
                            <SelectTrigger className="mt-3 text-text-Content">
                              <SelectValue
                                placeholder={
                                  item.is_foreigner
                                    ? "Nước ngoài"
                                    : "Trong nước"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="true">Nước ngoài</SelectItem>
                                <SelectItem value="false">
                                  Trong nước
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex">
                    <AlertDialogCancel type="button" className="bg-transparent">
                      Đóng
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={luuShareHolders}>
                      {" "}
                      Lưu{" "}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex justify-center items-center border-[#8a8a8a] bg-white mt-2 border rounded-lg w-[30px] h-[30px]">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide-trash-2 lucide"
                    >
                      {" "}
                      <path d="M3 6h18" />{" "}
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />{" "}
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />{" "}
                      <line x1={10} x2={10} y1={11} y2={17} />{" "}
                      <line x1={14} x2={14} y1={11} y2={17} />{" "}
                    </svg>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-background-active border-transparent text-text-Content">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-center">
                      Xóa cổ đông này ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Ấn xác nhận thông tin và cổ đông này sẽ bị loại bỏ khỏi
                      danh sách cổ động lớn
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-center">
                    <AlertDialogCancel className="bg-transparent">
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => removeHolders(item.id)}>
                      xác nhận
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}

      {visibleCount < holders.length && (
        <button onClick={showMore} className="mt-4 text-white underline">
          Xem thêm
        </button>
      )}
    </>
  );
};

export default ShareHolder;
