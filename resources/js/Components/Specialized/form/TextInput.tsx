import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import { ReactNode } from "react";

interface TextInputProps {
  label: ReactNode;
  name: string;
  currentValue: any;
  setData: (name: string, value: any) => void;
  error: string | undefined;
  placehodler?: string;
}

const TextInput = ({
  label,
  name,
  setData,
  currentValue,
  error,
  placehodler,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-slate-700" htmlFor={`textinput_${name}`}>
        {label}
      </Label>
      <Input
        id={`textinput_${name}`}
        className="py-2 h-fit"
        type="text"
        value={currentValue}
        placeholder={placehodler}
        onChange={({ target: { value } }) => {
          setData(name, value);
        }}
      />
      {error && <p className="text-red-400 text-xs">*{error}</p>}
    </div>
  );
};

export default TextInput;
