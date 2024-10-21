import TextInput from "@/Components/TextInput"

export default function InputComponent() {
    return (
        <>
            <TextInput
                showLeading={true}
                type="search" name="searchSubscription" placeholder="Tên chương trình" mode="outlined" rounded="full" outLineColor="outline-variant">
            </TextInput>
        </>
    )
}