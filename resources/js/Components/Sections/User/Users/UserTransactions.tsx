import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import { InfoField } from "@/Components/Specialized/info-field";
import { cn, formatNumberWithCommas } from "@/Lib/utils";
import { UserGeneral } from "@/Pages/User/User";
import { FC, useRef } from "react";

type ViewUserTransactionProps = {
  user: UserGeneral;
};

function getTransactionStatusBackgound(status: UserTransactionStatus) {
  switch (status) {
    case "fulfilled":
      return "bg-green-600";
    case "declined":
      return "bg-red-600";
    case "processing":
      return "bg-teal-500";
    case "aborted":
      return "bg-orange-800";
  }
}

const ViewUserTransactions: FC<ViewUserTransactionProps> = ({ user }) => {
  const ViewUserTransactionDialogRef = useRef<DialogWrapperHandler>(null);
  let { transactions } = user;
  transactions = transactions.sort(
    (t1, t2) =>
      new Date(t2.created_at!).getTime() - new Date(t1.created_at!).getTime(),
  );

  return (
    <DialogWrapper
      ref={ViewUserTransactionDialogRef}
      title={
        <div>
          Lịch sử thanh toán của khách hàng{" "}
          <span className="font-bold text-2xl text-slate-700 underline underline-offset-2">
            {user.fullname}
          </span>
        </div>
      }
      noPropogation
      trigger={
        <span
          className="cursor-pointer"
          onClick={(e) => {
            ViewUserTransactionDialogRef.current?.toggle();
            e.stopPropagation();
          }}
        >
          Lịch sử thanh toán
        </span>
      }
    >
      <section className="flex flex-col gap-2 max-h-[27rem] overflow-y-scroll">
        {!transactions.length ? (
          <p className="pt-6 font-medium text-slate-600">
            Người dùng hiện chưa khởi tạo giao dịch nào
          </p>
        ) : (
          transactions.map((transact, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 px-2 py-3 border rounded-md text-sm"
            >
              <div className="flex justify-between">
                <InfoField
                  name="Số tiền: "
                  value={formatNumberWithCommas(transact.amount!) + " VNĐ"}
                />
                <InfoField
                  name="Phương thức GD: "
                  value={transact.payment_method?.name}
                />
              </div>
              <p className="text-slate-700">
                <span className="font-medium text-slate-500 text-sm">
                  Trạng thái:{" "}
                </span>{" "}
                <span
                  className={cn(
                    "p-1 rounded-md font-medium text-white text-xs",
                    getTransactionStatusBackgound(transact.status),
                  )}
                >
                  {transact.status}
                </span>
              </p>
              <p className="text-slate-700">
                <span className="font-medium text-slate-500 text-sm">
                  Nội dung:{" "}
                </span>{" "}
                {transact.info}
              </p>
              <div className="mt-1 text-end text-slate-600 text-xs">
                Thực hiện vào {new Date(transact.created_at!).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </section>
    </DialogWrapper>
  );
};

export default ViewUserTransactions;
