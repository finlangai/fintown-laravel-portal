import TextInput from "@/Components/Specialized/form/TextInput";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { Textarea } from "@/Components/UI/textarea";

const BackjobFormInner = ({
  data,
  setData,
  errors,
  intervalList,
}: {
  data: any;
  setData: (name: string, value: any) => void;
  errors: { [key: string]: any };
  intervalList: string[];
}) => {
  return (
    <>
      {/* NAME */}
      <TextInput
        name="name"
        label="Tên"
        currentValue={data.name}
        setData={setData}
        error={errors.name}
      />

      {/* NESTING IS ACTIVE & INTERVAL TYPE */}
      <div className="flex justify-between gap-6">
        {/* IS_ACTIVE */}
        <div className="flex flex-col flex-1 gap-2">
          <Label className="text-slate-700" htmlFor="backjob-is_active">
            Trạng thái
          </Label>
          <Select
            value={String(Number(data.is_active))}
            onValueChange={(value: any) => {
              setData("is_active", Boolean(Number(value)));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">
                  <span className="font-medium text-green-400">
                    Đang hoạt động
                  </span>
                </SelectItem>
                <SelectItem value="0">
                  <span className="font-medium text-red-400">
                    Ngừng hoạt động
                  </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.is_active && (
            <p className="text-red-400 text-xs">*{errors.is_active}</p>
          )}
        </div>

        {/* INTERVAL TYPE */}
        <div className="flex flex-col flex-1 gap-2">
          <Label className="text-slate-700" htmlFor="backjob-interval_type">
            Interval Type
          </Label>
          <Select
            value={data.interval_type}
            onValueChange={(value: any) => {
              setData("interval_type", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {intervalList.map((type: string, index) => (
                  <SelectItem key={index} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.interval_type && (
            <p className="text-red-400 text-xs">*{errors.interval_type}</p>
          )}
        </div>
      </div>

      {/* NESTING TIME & INTERVAL */}
      <div className="flex justify-between gap-6">
        {/* TIME */}
        <div className="flex flex-col flex-1 gap-1">
          <Label className="text-slate-700" htmlFor="backjob-time">
            Time
          </Label>
          <Input
            id="backjob-time"
            className="py-2 h-fit"
            type="time"
            step={1}
            value={data.time}
            onChange={({ target: { value } }) => {
              setData("time", value);
            }}
          />
          {errors.time && <p className="text-red-400 text-xs">{errors.time}</p>}
        </div>

        {/* INTERVAL */}
        <div className="flex flex-col flex-1 gap-1">
          <Label className="text-slate-700" htmlFor="backjob-interval">
            Interval
          </Label>
          <Input
            id="backjob-interval"
            className="py-2 h-fit"
            type="number"
            value={data.interval}
            onChange={({ target: { value } }) => {
              setData("interval", Number(value));
            }}
          />
          {errors.interval && (
            <p className="text-red-400 text-xs">*{errors.interval}</p>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-1">
        <Label className="text-slate-700" htmlFor="backjob-description">
          Mô tả
        </Label>
        <Textarea
          value={data.description ?? ""}
          onChange={({ target: { value } }) => {
            setData("description", value);
          }}
          rows={3}
        />
        {errors.description && (
          <p className="text-red-400 text-xs">*{errors.description}</p>
        )}
      </div>

      {/* JOB_CLASS */}
      <div className="flex flex-col gap-1">
        <Label className="text-slate-700" htmlFor="backjob-job_class">
          Job's Class{" "}
          <span className="text-slate-500 text-xs">
            (FQCN của Job cần thực thi)
          </span>
        </Label>
        <Input
          id="backjob-job_class"
          className="py-3 h-fit"
          type="text"
          value={data.job_class}
          onChange={({ target: { value } }) => {
            setData("job_class", value);
          }}
        />
        {errors.job_class && (
          <p className="text-red-400 text-xs">*{errors.job_class}</p>
        )}
      </div>

      {/* PARAMETERS */}
      <div className="flex flex-col gap-1">
        <Label className="text-slate-700" htmlFor="backjob-parameters">
          Parameters
        </Label>
        <Textarea
          value={data.parameters ?? ""}
          onChange={({ target: { value } }) => {
            setData("parameters", value);
          }}
          rows={3}
        />
        {errors.parameters && (
          <p className="text-red-400 text-xs">*{errors.parameters}</p>
        )}
      </div>
    </>
  );
};

export default BackjobFormInner;
