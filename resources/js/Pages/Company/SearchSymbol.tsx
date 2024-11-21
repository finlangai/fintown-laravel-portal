import React, { ChangeEvent, useState } from "react";

const InputComponent: React.FC<InputComponentProps> = ({
  companies,
  onSymbolsFiltered,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    findMatchingSymbols(value);
  };

  const findMatchingSymbols = (input: string) => {
    const lowerCaseInput = input.toLowerCase();

    const matches: any = companies.filter((company) => {
      const symbol = company.symbol.toLowerCase();
      return symbol.indexOf(lowerCaseInput) !== -1;
    });
    onSymbolsFiltered(matches);
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Mã cổ phiếu..."
        className="bg-transparent pr-4 pl-10 border border-none !ring-0 w-96 text-sm text-text-Content placeholder-gray-500"
      />
    </>
  );
};

export default InputComponent;
