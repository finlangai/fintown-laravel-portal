import Dropdown from "@/Components/Dropdown";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/Components/UI/dropdown-menu"

 import { Avatar, AvatarFallback, AvatarImage } from "@/Components/UI/avatar"
const HeaderTopComponent = ({user} : any) =>{
   return (
      <>
       <nav className="bg-background-head">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between h-16">
              <div className="flex">
               
              </div>
              <div className="sm:flex sm:items-center hidden sm:ms-6">
                <div className="relative ms-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                  <Avatar>
                     <AvatarImage src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/397974475_874973580805442_8304577279723242519_n.jpg?stp=c0.0.1546.1546a_dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHZ28aZ0EsKA8ebVspJRlUtdf1LEcL3VnV1_UsRwvdWdYt9BtBiQp9wD7VBbCdLfWv2OIkh_NwdTWvIqmFgMgJI&_nc_ohc=5j2mJSNa61oQ7kNvgFLQjJQ&_nc_zt=24&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=ADO8q8yEKI3UsBjSZ5XTSHo&oh=00_AYA4ACVqI7qHskayzQXwzsnSkw-Ns0mPLAN2Bn2wHdOinA&oe=671A0EFC" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="border border-solid">
                     <DropdownMenuLabel>{user.fullname || "my account"}</DropdownMenuLabel>
                     <DropdownMenuSeparator  className="text-black"/>
                     <DropdownMenuItem>
                     <Dropdown.Link href={route("profile.edit")}>
                        <div className="flex justify-start items-center" style={{marginLeft : "-16px"}}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user" > <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx={12} cy={7} r={4} /> </svg>
                           <span className="ml-3">Hồ sơ cá nhân</span>
                        </div>
                     </Dropdown.Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem> 
                      <Dropdown.Link href={route("profile.edit")}>
                        <div className="flex justify-start items-center " style={{marginLeft : "-16px"}}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings" > <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /> <circle cx={12} cy={12} r={3} /> </svg>
                           <span className="ml-3">Cài đặt tài khoản</span>
                        </div>
                     </Dropdown.Link>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
   )
}
export default HeaderTopComponent;