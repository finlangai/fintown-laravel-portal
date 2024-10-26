import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/Components/UI/breadcrumb";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useCallback, useState } from "react";
export default function AddSubscriptionProgram({ user_types, program }: { user_types?: any, program?: any }) {

    const isEditMode = Boolean(program);

    const [formData, setFormData] = useState(() => {
        if (isEditMode) {
            return {
                incharge_id: program.incharge_id,
                name: program.name,
                description: program.description,
                price: program.price,
                discount: program.discount,
                duration: program.duration,
                duration_type: program.duration_type,
                is_renewable: program.is_renewable,
            }
        } else {
            return {
                incharge_id: '',
                name: '',
                description: '',
                price: 0,
                discount: 0,
                duration: 0,
                duration_type: 'day',
                is_renewable: false,
            }
        }
    });


    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        // Nếu phần tử là checkbox, sử dụng checked; nếu không, dùng value
        if (type === 'number') {
            // Convert to number and ensure it's positive
            const numValue = Math.abs(parseFloat(value));
            setFormData((prev) => ({
                ...prev,
                [name]: isNaN(numValue) ? 0 : numValue,
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: target.type === 'checkbox' ? (target as HTMLInputElement).checked : value,
            }));
        }
    }, [formData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditMode) {
            router.put(route('SubscriptionProgram.update', { id: program.id }), formData);
        }
        else {
            router.post(route('SubscriptionProgram.store'), formData);
        }
    }

    return (
        <>
            <AuthenticatedLayout header={true} >
                <Head title="SubscriptionProgram" />
                <div className="pt-10 pb-20">
                    <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex flex-col min-h-[86vh] gap-[24px] text-text-Content">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Welcome</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/dashboad">Dashboad</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/SubscriptionProgram">Subscription</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/SubscriptionProgram/add">{isEditMode ? 'Sửa chương trình' : 'Thêm chương trình'}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>

                            <div className="flex flex-col gap-[24px]">
                                <h1 className="text-3xl font-bold">{isEditMode ? "Sửa chương trình" : "Thêm chương trình"}</h1>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
                                    <div className="flex flex-row w-full gap-[24px] h-[70dvh]">
                                        {/* Nội dung bên trái */}
                                        <div
                                            className="bg-surface-container-lowest drop-shadow-lg px-[30px] py-[24px] flex flex-col w-4/6 gap-[32px] h-full overflow-y-scroll">
                                            <div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="name" className="w-2/5 relative"><span className="text-red-500 absolute bottom-1 left-[-8px]">*</span>Tên chương trình</label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        type="text"
                                                        required
                                                    ></Input>
                                                </div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="price" className="w-2/5 relative"><span className="text-red-500 absolute bottom-1 left-[-8px]">*</span>Giá tiền</label>
                                                    <div className="relative w-full">
                                                        <Input
                                                            id="price"
                                                            name="price"
                                                            value={formData.price}
                                                            onChange={handleChange}
                                                            type="number"
                                                            required
                                                            min="0"
                                                        ></Input>
                                                        <div className="absolute flex inset-y-0 right-0 pl-2 pr-4 items-center pointer-events-none bg-surface-container-lowest rounded-r-lg text-right">đ</div>
                                                    </div>
                                                </div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="discount" className="w-2/5">Giảm giá</label>
                                                    <div className="relative w-full">
                                                        <Input
                                                            id="discount"
                                                            name="discount"
                                                            value={formData.discount}
                                                            onChange={handleChange}
                                                            type="number"
                                                            required
                                                            min={0}
                                                            max={100}
                                                        ></Input>
                                                        <div className="absolute flex inset-y-0 right-0 pl-2 pr-4 items-center pointer-events-none bg-surface-container-lowest rounded-r-lg text-right">%</div>
                                                    </div>
                                                </div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="duration_type" className="w-2/5">Kiểu duy trì</label>
                                                    <select id="duration_type" name="duration_type" value={formData.duration_type} onChange={handleChange}
                                                        className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300">
                                                        <option value="day">Ngày</option>
                                                        <option value="month">Tháng</option>
                                                        <option value="year">Năm</option>
                                                    </select>
                                                </div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="duration" className="w-2/5 relative"><span className="text-red-500 absolute bottom-1 left-[-8px]">*</span>Thời gian</label>
                                                    <Input
                                                        id="duration"
                                                        name="duration"
                                                        value={formData.duration}
                                                        onChange={handleChange}
                                                        type="number"
                                                        required
                                                    ></Input>
                                                </div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="incharge_id" className="w-2/5 relative"><span className="text-red-500 absolute bottom-1 left-[-8px]">*</span>Kiểu người dùng</label>
                                                    <select id="incharge_id" name="incharge_id" value={formData.incharge_id} onChange={handleChange}
                                                        className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300">
                                                        <option value="">Chọn kiểu người dùng</option>
                                                        {
                                                            user_types.map((item: any) => {
                                                                return (
                                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="flex py-[12px] items-center">
                                                    <label htmlFor="is_newable" className="w-2/5">Có thể gia hạn</label>
                                                    <div className="w-full">
                                                        <input
                                                            id="is_newable"
                                                            type="checkbox"
                                                            name="is_renewable"
                                                            checked={formData.is_renewable}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex py-[12px]">
                                                    <label htmlFor="description" className="w-2/5 mt-[8px]">Mô tả</label>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        placeholder="Mô tả"
                                                        required
                                                        className="w-full border-solid border-gray-200 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Nội dung bên phải */}
                                        {/* <div className="bg-surface-container-lowest drop-shadow-lg px-[24px] py-[24px] flex-col gap-[24px] w-2/6">
                                        </div> */}
                                    </div>
                                    <Button type="submit" className="bg-accent-color hover:bg-accent-color-sub w-fit">{isEditMode ? 'Lưu' : 'Thêm chương trình'}</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}