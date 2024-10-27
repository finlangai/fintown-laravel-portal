import { useEffect, useState } from "react";

const hexToRgb = (hex: string) => {
    // Kiểm tra định dạng hex hợp lệ
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return '#' + r + r + g + g + b + b;
    });

    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return rgb ? {
        r: parseInt(rgb[1], 16),
        g: parseInt(rgb[2], 16),
        b: parseInt(rgb[3], 16),
    }
        : null;
}

// Hàm để chuyển đổi từ chuỗi rgb thành mảng số
const rgbToArray = (rgb: string) => {
    return rgb
        .replace(/[^0-9,]/g, '')
        .split(',')
        .map(Number);
};

// Hàm để chuyển đổi từ rgb hoặc hex sang rgba
const colorToRgba = (color: string, opacity: number) => {
    if (color.startsWith('rgb')) {
        // Nếu là định dạng rgb, tách các giá trị
        const rgbValues = rgbToArray(color);
        if (rgbValues.length === 3) {
            return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
        }
    } else if (color.startsWith('#')) {
        // Nếu là định dạng hex, chuyển đổi sang rgb
        const rgbValues = hexToRgb(color);
        if (rgbValues) {
            return `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${opacity})`;
        }
    }
    return '';
};

export function useRGBA( color:string, opacity:number) {
    const [rgbaColor, setRgbaColor] = useState('');

    useEffect(() => {
        // Cập nhật màu rgba mới khi color hoặc opacity thay đổi
        const newRgbaColor = colorToRgba(color, opacity);
        setRgbaColor(newRgbaColor);
    }, [color, opacity]);

    return rgbaColor;
}