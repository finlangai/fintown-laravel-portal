type PromotionCode = {
  id: number;
  partner_id: number;
  program_id: string;
  code: string;
  use_limit?: number;
  discount: number;
  commission_rate: number;
  start_date?: string; // Use ISO 8601 format for date-time strings
  expired_date?: string; // Use ISO 8601 format for date-time strings
  created_at?: string; // Use ISO 8601 format for date-time strings
  updated_at?: string; // Use ISO 8601 format for date-time strings
};
