interface Program {
    id: string;
    incharge_id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    duration: number;
    duration_type: 'day' | 'month' | 'year';
    is_renewable: boolean;
    created_at: string; // Kiểu dữ liệu cho timestamps (nếu có)
    updated_at: string;
}