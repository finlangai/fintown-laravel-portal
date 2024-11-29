type TransactionStatus = "fulfilled" | "processing" | "declined" | "aborted";

type Transaction = {
  id: string;
  user_id: number;
  payment_method_id: number;
  info?: string;
  amount?: number;
  completion_time?: string; // using string for timestamp
  status: TransactionStatus;
  payload?: Record<string, any>; // using a more flexible type for JSON field
  created_at?: string; // using string for timestamp
  updated_at?: string; // using string for timestamp
};
