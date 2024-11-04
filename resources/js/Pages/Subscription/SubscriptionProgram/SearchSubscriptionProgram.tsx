import TextInput from "@/Components/TextInput";
import React from "react";

interface InputComponentProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputComponent: React.FC<InputComponentProps> = ({ onChange }) => {
    return (
        <TextInput
            showLeading={true}
            type="search"
            name="searchSubscription"
            placeholder="Tên chương trình"
            mode="outlined"
            rounded="full"
            outLineColor="outline-variant"
            onChange={onChange}
        />
    );
};

export default InputComponent;