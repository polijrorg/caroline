'use client'
import { expo } from "@better-auth/expo";
import Image from "next/image";

interface UsersProps {
  nome: string;     
}

function Users({nome}: UsersProps) {
  return (
    <div className="w-67 h-20 top-24 left-75 bg-[#B3D7FF] rounded-[15px] flex justify-start">
      <div className="mt-2 ml-4 mr-4"> <Image src="/icons/NavBarIcons/User.png" alt="user" width={32} height={32} /> </div>
      <div className="flex flex-col flex-grow h-full mt-4 gap-2"> 
        <h3 className="font-poppins font-normal text-xs leading-none text-[#FFFFFF]">{nome}</h3>
        <h4 className="font-poppins font-normal text-xs leading-none oppacity-75 text-[#FFFFFF]">lorem ipsum </h4>
      </div>
    </div>

  );

}

export default Users;    