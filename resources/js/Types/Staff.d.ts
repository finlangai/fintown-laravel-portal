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

 declare module '@radix-ui/react-accordion';
 declare module '@radix-ui/react-hover-card';