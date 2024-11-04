interface Permission {
   id: number;
   name: string;
   guard_name: string;
}

type PermissionList = Permission[];

//dm cái lz from này viết type gì khó vl 
interface FormData {
  rolePermissions: Record<number, boolean>; 
}