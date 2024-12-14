import { SaveButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import { formatDateToYmd } from "@/Lib/utils";
import { useForm } from "@inertiajs/react";
import { FC, FormEvent, useEffect, useRef } from "react";

type EditPromotionProps = {
  promotion: PromotionCode;
};
const EditPromotion: FC<EditPromotionProps> = ({ promotion }) => {
  const editDialogRef = useRef<DialogWrapperHandler>(null);

  const startDate = promotion.start_date
    ? formatDateToYmd(promotion.start_date)
    : null;
  const expiredDate = promotion.expired_date
    ? formatDateToYmd(promotion.expired_date)
    : null;

  const { patch, data, setData, errors, wasSuccessful, isDirty } = useForm({
    use_limit: promotion.use_limit,
    discount: promotion.discount,
    commission_rate: promotion.commission_rate,
    start_date: startDate,
    expired_date: expiredDate,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    patch(route("users.promotion.update", promotion.id));
  };

  useEffect(() => {
    if (wasSuccessful) editDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={editDialogRef}
      title="Chỉnh sửa mã giới thiệu"
      noPropogation
      trigger={
        <span
          className="cursor-pointer"
          onClick={(e) => {
            editDialogRef.current?.toggle();
            e.stopPropagation();
          }}
        >
          Chỉnh sửa
        </span>
      }
      footer={
        <SaveButton
          disabled={!isDirty}
          className={!isDirty ? "bg-neutral-400" : ""}
          onClick={handleSubmit}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit(e) : null)}
        />
      }
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        {/* === USE_LIMIT */}
        <TextInput
          label={"Giới hạn sử dụng"}
          currentValue={data.use_limit}
          error={errors.use_limit}
          name={"use_limit"}
          setData={setData}
          type="number"
        />
        {/* === DISCOUNT */}
        <TextInput
          label={"Tỷ lệ lệ giảm giá"}
          currentValue={data.discount}
          error={errors.discount}
          name={"discount"}
          setData={setData}
          type="number"
          step={0.0001}
        />
        {/* === COMMISSION RATE */}
        <TextInput
          label={"Chiết khấu cho cộng sự"}
          currentValue={data.commission_rate}
          error={errors.commission_rate}
          name={"commission_rate"}
          setData={setData}
          type="number"
          step={0.0001}
        />
        {/* === START DATE */}
        <TextInput
          label={"Ngày bắt đầu"}
          currentValue={data.start_date}
          error={errors.start_date}
          name={"start_date"}
          setData={setData}
          type="date"
        />
        {/* === EXPIRED DATE */}
        <TextInput
          label={"Ngày kết thúc"}
          currentValue={data.expired_date}
          error={errors.expired_date}
          name={"expired_date"}
          setData={setData}
          type="date"
        />
      </form>
    </DialogWrapper>
  );
};

export default EditPromotion;
