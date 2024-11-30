import DialogWrapper, {
  DialogWrapperHandler,
} from "@/Components/Specialized/dialog-wrapper";
import { InfoField } from "@/Components/Specialized/info-field";
import { cn } from "@/Lib/utils";
import { UserGeneral } from "@/Pages/User/User";
import { router } from "@inertiajs/react";
import { FC, useRef } from "react";
import ConfirmCancel from "./UserSubscriptions/confirm-cancel";

type ViewUserSubscriptionsProps = {
  user: UserGeneral;
};

function getSubscriptionStatusBackgound(status: UserSubscriptionStatus) {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    case "imminent":
      return "bg-teal-500";
    case "expired":
      return "bg-orange-800";
  }
}

const ViewUserSubscriptions: FC<ViewUserSubscriptionsProps> = ({ user }) => {
  const ViewUserSubscriptionsDialogRef = useRef<DialogWrapperHandler>(null);
  let { subscriptions } = user;
  subscriptions = subscriptions.sort(
    (t1, t2) =>
      new Date(t2.created_at!).getTime() - new Date(t1.created_at!).getTime(),
  );
  console.log(subscriptions);

  return (
    <DialogWrapper
      ref={ViewUserSubscriptionsDialogRef}
      title={
        <div>
          Các gói trả phí của khách hàng{" "}
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
            ViewUserSubscriptionsDialogRef.current?.toggle();
            e.stopPropagation();
          }}
        >
          Gói đăng ký
        </span>
      }
    >
      <section className="flex flex-col gap-2 max-h-[27rem] overflow-y-scroll">
        {!subscriptions.length ? (
          <p className="pt-6 font-medium text-slate-600">
            Người dùng hiện chưa đăng ký gói trả phí nào
          </p>
        ) : (
          subscriptions.map(
            ({ id, start_date, end_date, status, program }, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 px-2 py-3 border rounded-md"
              >
                <div className="flex justify-between">
                  <p className="line-clamp-1 max-w-60 font-medium text-base text-slate-700 overflow-x-hidden">
                    {program.name}
                  </p>
                  {/* === INTERACTION BUTTONS */}
                  <div className="flex gap-2">
                    {status == "active" && (
                      <ConfirmCancel
                        actionHandle={() => {
                          router.patch(
                            route("users.cancel-subscription", id),
                            {},
                            { preserveScroll: true, preserveState: true },
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <InfoField name="Mã gói: " value={program.id} />
                  <p>
                    <span className="font-medium text-slate-500 text-sm">
                      Trạng thái:{" "}
                    </span>{" "}
                    <span
                      className={cn(
                        "p-1 rounded-md font-medium text-white text-xs",
                        getSubscriptionStatusBackgound(status),
                      )}
                    >
                      {status}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <InfoField
                    name="Bắt đầu: "
                    value={new Date(start_date).toLocaleDateString()}
                  />
                  <InfoField
                    name="Kết thúc: "
                    value={new Date(end_date).toLocaleDateString()}
                  />
                </div>
              </div>
            ),
          )
        )}
      </section>
    </DialogWrapper>
  );
};

export default ViewUserSubscriptions;
