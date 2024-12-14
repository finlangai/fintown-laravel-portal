import { AddButton, StoreButton } from "@/Components/Specialized/crud-button";
import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import TextInput from "@/Components/Specialized/form/TextInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { useForm } from "@inertiajs/react";
import { FC, FormEvent, useEffect, useRef } from "react";

type CreatePromotionProps = {
  partners: User[];
  programs: SubscriptionProgram[];
};

const CreatePromotion: FC<CreatePromotionProps> = ({ partners, programs }) => {
  const createDialogRef = useRef<DialogWrapperHandler>(null);

  const { post, data, setData, errors, wasSuccessful, isDirty } = useForm({
    partner_id: 0,
    program_id: "",
    code: "",
    use_limit: 1,
    discount: 0,
    commission_rate: 0,
    start_date: null,
    expired_date: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("users.promotion.store"));
  };

  useEffect(() => {
    if (wasSuccessful) createDialogRef.current?.close();
  }, [wasSuccessful]);

  return (
    <DialogWrapper
      ref={createDialogRef}
      title="Thêm mã giới thiệu"
      noPropogation
      trigger={<AddButton />}
      footer={
        <StoreButton
          disabled={!isDirty}
          className={!isDirty ? "bg-neutral-400" : ""}
          onClick={handleSubmit}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit(e) : null)}
        />
      }
    >
      <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        {/* === PARTNER ID */}
        <Select
          onValueChange={(value: string) => {
            setData("partner_id", Number(value));
          }}
        >
          <SelectTrigger className="mb-3 !ring-0 h-11 text-slate-700 placeholder-slate-700">
            <SelectValue placeholder="Cộng sự liên kết" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="text-slate-600">
              <SelectLabel className="text-slate-600">Chọn cộng sự</SelectLabel>
              {partners.map((partnerInfo, index) => (
                <SelectItem value={String(partnerInfo.id)} key={index}>
                  {`${partnerInfo.fullname} - ${partnerInfo.email}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-6">
          {/* === PROGRAM ID */}
          <Select
            onValueChange={(value: string) => {
              setData("program_id", value);
            }}
          >
            <SelectTrigger className="mb-3 !ring-0 w-52 h-11 text-slate-700 placeholder-slate-700">
              <SelectValue placeholder="Chọn gói trả phí áp dụng" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-slate-600">
                <SelectLabel className="text-slate-600">
                  Danh sách gói trả phí
                </SelectLabel>
                {programs.map((programInfo, index) => (
                  <SelectItem value={programInfo.id} key={index}>
                    {`${programInfo.id} - ${programInfo.name}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* === USE_LIMIT */}
          <TextInput
            label={"Giới hạn sử dụng"}
            currentValue={data.use_limit}
            error={errors.use_limit}
            name={"use_limit"}
            setData={setData}
            type="number"
          />
        </div>
        {/* === CODE */}
        <TextInput
          label={"Mã giới thiệu"}
          currentValue={data.code}
          error={errors.code}
          name={"code"}
          setData={setData}
        />

        <div className="flex gap-6">
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
        </div>
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

export default CreatePromotion;
