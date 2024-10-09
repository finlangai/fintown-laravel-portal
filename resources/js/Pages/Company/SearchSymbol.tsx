import React, { useState, ChangeEvent } from 'react';


const InputComponent: React.FC<InputComponentProps> = ({ companies, onSymbolsFiltered }) => {
  const [inputValue, setInputValue] = useState<string>(''); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value); 
    findMatchingSymbols(value); 
  };

  const findMatchingSymbols = (input: string) => {
   const lowerCaseInput = input.toLowerCase(); 
 
   const matches :any = companies.filter(company => {
     const symbol = company.symbol.toLowerCase(); 
     return symbol.indexOf(lowerCaseInput) !== -1; 
   });
   onSymbolsFiltered(matches);
 };
 

  return (
   <>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Mã cổ phiếu..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-3xl bg-transparent placeholder-gray-500 w-full text-sm text-white" />
   </>
  );
};

export default InputComponent;
