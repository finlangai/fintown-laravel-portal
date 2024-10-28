import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/UI/card";
import { TypographyH1 } from "@/Components/UI/typography";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DollarSign, TrendingUp, UserPlus, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data - replace with your actual data
const financialData = [
  { month: "Jan", revenue: 50000, profit: 20000 },
  { month: "Feb", revenue: 60000, profit: 25000 },
  { month: "Mar", revenue: 75000, profit: 30000 },
  { month: "Apr", revenue: 65000, profit: 26000 },
  { month: "May", revenue: 80000, profit: 32000 },
  { month: "Jun", revenue: 95000, profit: 38000 },
];

const subscriptionTypeData = [
  { name: "Monthly", value: 60 },
  { name: "Yearly", value: 40 },
];

const COLORS = ["#334155", "#94A3B8"];

export default function Dashboard() {
  const totalRevenue = 425000;
  const totalProfit = 171000;
  const paidSubscriptions = 1500;
  const newUsers = 350;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Authenticated header={true} className="flex flex-col gap-6 px-12 pt-10">
      <Head title="Dashboard" />
      <TypographyH1>Tổng quan</TypographyH1>
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-slate-700 text-sm">
              Tổng doanh thu
            </CardTitle>
            <DollarSign className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl text-slate-700">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-slate-600 text-xs">
              <span className="text-green-400">+18.5%</span> từ tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Tổng lợi nhuận
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl text-slate-700">
              ${totalProfit.toLocaleString()}
            </div>
            <p className="text-slate-600 text-xs">
              <span className="text-green-400">+15.2%</span> từ tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Số lượt đăng ký gói
            </CardTitle>
            <Users className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl text-slate-700">
              {paidSubscriptions}
            </div>
            <p className="text-slate-600 text-xs">
              <span className="text-green-400">+5.3%</span> từ tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Người dùng mới 30 ngày qua
            </CardTitle>
            <UserPlus className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl text-slate-700">{newUsers}</div>
            <p className="text-slate-600 text-xs">
              <span className="text-green-400">+12.7%</span> từ tháng trước
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="gap-6 grid lg:grid-cols-3">
        {/* COLUMNS CHART */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-700">
              Doanh thu và Lợi nhuận
            </CardTitle>
            <CardDescription className="text-slate-600">
              Số liệu 6 tháng vừa qua
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  legendType="rect"
                  dataKey="revenue"
                  className="fill-slate-700"
                  fill="#334155"
                />
                <Bar
                  legendType="rect"
                  dataKey="profit"
                  className="fill-slate-400"
                  fill="#94A3B8"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* === PIE CHART */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-700">
              Loại gói được đăng ký
            </CardTitle>
            <CardDescription className="text-slate-600">
              Tỉ lệ đăng ký của các gói trả phí
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  animationEasing="ease-out"
                  animationDuration={300}
                  data={subscriptionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  dataKey="value"
                  legendType="rect"
                >
                  {subscriptionTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Authenticated>
  );
}
