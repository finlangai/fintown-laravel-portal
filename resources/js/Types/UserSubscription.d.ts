type UserSubscriptionStatus = "imminent" | "active" | "expired" | "cancelled";

type UserSubscription = {
  id: number;
  user_id: number;
  program_id: string;
  status: UserSubscriptionStatus;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};
