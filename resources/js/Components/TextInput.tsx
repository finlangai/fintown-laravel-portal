import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { MdSearch } from "react-icons/md";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        mode = "flat",
        outLineColor = "gray-300",
        outLineFocusColor = "indigo-500",
        rounded = "md",
        showLeading = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean,
        mode?: 'flat' | 'outlined',
        outLineColor?: string,
        outLineFocusColor?: string,
        rounded?: 'sm' | 'md' | 'lg' | 'full',
        showLeading?: boolean
    },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    const baseClasses = `rounded-${rounded} shadow-sm focus:ring-${outLineFocusColor} h-fit w-full `
    const modeClasses = mode === 'outlined'
        ? `border-2 border-${outLineColor} focus:border-${outLineFocusColor} bg-transparent`
        : `border-b border-${outLineColor} focus:border-${outLineFocusColor}`

    return (
        <div className="relative">
            <input
                {...props}
                type={type}
                className={
                    baseClasses +
                    modeClasses +
                    (showLeading ? " pl-10 pr-4 " : " px-4 ") +
                    className
                }
                ref={localRef}
            />
            {showLeading && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {type === 'search' && <MdSearch className="h-5 w-5 text-gray-400" />}
                </div>
            )}
        </div>
    );
});
