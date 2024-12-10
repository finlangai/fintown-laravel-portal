import React from 'react'

type CongThuc = {
  name: string;
  giatri: string;
}

export default function Test() {
  const data = [
    {
      congthuc: [
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" },
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" }
      ]
    },
    {
      congthuc: [
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" },
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" }
      ]
    },
    {
      congthuc: [
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" },
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" }
      ]
    },
    {
      congthuc: [
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" },
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" }
      ]
    },
    {
      congthuc: [
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" },
        { name: "đây là tên công thức", giatri: "đây là giá trị công thức" }
      ]
    }
  ]

  return (
    <div>
      <h1>Test Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <h3>Công thức {index + 1}</h3>
            <ul>
              {item.congthuc.map((ct, idx) => (
                <li key={idx}>
                  <strong>{ct.name}:</strong> {ct.giatri}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
