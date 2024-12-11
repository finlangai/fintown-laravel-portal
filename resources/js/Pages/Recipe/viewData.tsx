import { Card } from '@/Components/UI/card';
import { Switch } from '@/Components/UI/switch';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ViewData({ congthuc }: any) {
  const [isPercentage, setIsPercentage] = useState(congthuc.metadata.is_percentage);
  const [isShouldDivineByBillion, setIsShouldDivineByBillion] = useState(congthuc.metadata.is_should_divine_by_billion);
  const [isViewable, setIsViewable] = useState(congthuc.metadata.is_viewable);
  const [isActive, setIsActive] = useState(congthuc.metadata.is_active);

  const updateMetadata = async (key: string, value: boolean) => {
    const data = {
      order: congthuc.metadata.order,
      [key]: value,
    };

    try {
      await router.post('/update/metadata', { data: data });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSwitch = async (key: string, setter: React.Dispatch<React.SetStateAction<boolean>>, currentValue: boolean) => {
    const newValue = !currentValue; 
    setter(newValue); 
    await updateMetadata(key, newValue); 
  };

  return (
    <Card>
      <div className="p-5" style={{ marginTop: '0px' }}>
        <div className="space-y-4">
          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
            <div>
              <span className="text-gray-800 font-bold">Hiển thị %</span>
              <p className="text-xs text-gray-600">Tích chọn này sẽ hiển thị nội dung theo % hoặc không</p>
            </div>
            <Switch
              checked={isPercentage}
              onClick={() => toggleSwitch('is_percentage', setIsPercentage, isPercentage)}
              className="bg-slate-500"
            />
          </div>

          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
            <div>
              <span className="text-gray-800 font-bold">Chia theo tỷ lệ tỷ tỷ</span>
              <p className="text-xs text-gray-600">Tích chọn sẽ cho phép công thức chia theo tỷ lệ tỷ tỷ</p>
            </div>
            <Switch
              checked={isShouldDivineByBillion}
              onClick={() => toggleSwitch('is_should_divine_by_billion', setIsShouldDivineByBillion, isShouldDivineByBillion)}
              className="bg-slate-500"
            />
          </div>

          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
            <div>
              <span className="text-gray-800 font-bold">Có thể xem</span>
              <p className="text-xs text-gray-600">Tích chọn sẽ xác định người dùng có được phép xem công thức này</p>
            </div>
            <Switch
              checked={isViewable}
              onClick={() => toggleSwitch('is_viewable', setIsViewable, isViewable)}
              className="bg-slate-500"
            />
          </div>

          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
            <div>
              <span className="text-gray-800 font-bold">Trạng thái kích hoạt</span>
              <p className="text-xs text-gray-600">Tích chọn sẽ xác định người dùng có được phép xem công thức này</p>
            </div>
            <Switch
              checked={isActive}
              onClick={() => toggleSwitch('is_active', setIsActive, isActive)}
              className="bg-slate-500"
            />
          </div>

          <div className="border-[gray] border rounded-lg py-3 px-3 flex justify-between items-center">
            <div>
              <span className="text-gray-800 font-bold">Đơn vị</span>
              <p className="text-xs text-gray-600">Tích chọn sẽ xác định người dùng có được phép xem công thức này</p>
            </div>
            <p className="text-gray-600">{congthuc.metadata.unit ? congthuc.metadata.unit : 'Chưa có'}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
