import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import { InfoField } from "@/Components/Specialized/info-field";
import { TypographyH4 } from "@/Components/UI/typography";
import { PromotionCodeGeneral } from "@/Pages/User/Promotion";
import { FC, useRef } from "react";

type InfoPromotionProps = {
  promotion: PromotionCodeGeneral;
};
const InfoPromotion: FC<InfoPromotionProps> = ({ promotion }) => {
  const editDialogRef = useRef<DialogWrapperHandler>(null);

  return (
    <DialogWrapper
      ref={editDialogRef}
      noPropogation
      trigger={
        <span
          className="cursor-pointer"
          onClick={(e) => {
            editDialogRef.current?.toggle();
            e.stopPropagation();
          }}
        >
          Chi tiết
        </span>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TypographyH4>Thông tin cộng sự</TypographyH4>
          <InfoField name="Tên: " value={promotion.partner.fullname} />
          <InfoField name="Email: " value={promotion.partner.email} />
          <InfoField name="SĐT: " value={promotion.partner.phone} />
        </div>
        <div className="flex flex-col gap-2">
          <TypographyH4>Thông tin gói</TypographyH4>
          <InfoField name="Tên: " value={promotion.program.name} />
          <InfoField name="Mã gói: " value={promotion.program.id} />
        </div>
        <div className="flex flex-col gap-2 max-w-full">
          <TypographyH4>Thông tin chi tiết mã giới thiệu</TypographyH4>
          <div className="flex flex-col">
            <span className="font-medium text-slate-600 text-sm">
              Mã giới thiệu:
            </span>
            <span className="max-w-96 text-slate-900 text-wrap break-words">
              {promotion.code}
            </span>
          </div>
          <InfoField name="Giới hạn sử dụng: " value={promotion.use_limit} />
          <InfoField
            name="Giảm giá: "
            value={(promotion.discount * 100).toFixed(1) + "%"}
          />
          <InfoField
            name="Chiết khấu cho cộng sự: "
            value={(promotion.commission_rate * 100).toFixed(1) + "%"}
          />
          <InfoField name="Ngày bắt đầu: " value={promotion.start_date} />
          <InfoField name="Ngày kết thúc: " value={promotion.expired_date} />
        </div>
      </div>
    </DialogWrapper>
  );
};

export default InfoPromotion;
