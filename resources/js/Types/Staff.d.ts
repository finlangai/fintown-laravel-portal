interface Staff {
   id: number;
   username: string;
   fullname: string;
   email: string;
   password: string;
   rolesHas: string;
 }
 
 interface UserProps {
   staffList: Staff[];
 }