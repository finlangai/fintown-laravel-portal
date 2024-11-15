type Role = {
  id: number;
  name: string;
  guard_name: string;
  updated_at: string;
  pivot: ?{
    model_id: number;
    model_type: string;
    role_id: number;
  };
  created_at: string;
};

type Permission = {
  id: number;
  name: string;
  guard_name: string;
  pivot: ?{
    permission_id: number;
    role_id: number;
  };
  updated_at: string;
  created_at: string;
};
