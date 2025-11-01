'use client'
import Image from "next/image";

function UserInfo() {
  return (
    <div className="shadow-[0px_8px_8px_0px_#00000040] bg-[#D9D9D9] absolute w-[315px] h-[345px] top-[10vh] left-[50vw] rounded-[32px]"> 
            <div className="relative left-68 top-3"> <Image src="/Pencil.png" alt="Book open" width={16} height={16} /> </div>  
            <h3 className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-36 h-4.5 top-[27px] left-[30px]">Informações do Usuário </h3>
            <h4 className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[46px] h-4.5 top-[70px] left-[26px]">Usuário</h4>
            <p className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[57px] h-4.5 top-[88px] left-[26px] opacity-50">@usuários</p>
            <h4 className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[43px] h-4.5 top-[118px] left-[25px]">Celular</h4>
            <p className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[131px] h-4.5 top-[136px] left-[25px] opacity-50">+55 (011) 99999-9999</p>
            <h4 className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[45px] h-4.5 top-[166px] left-[27px]  ">Gênero</h4>
            <p className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[61px] h-4.5 top-[184px] left-[27px] opacity-50">Masculino</p>
            <h4 className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[33px] h-4.5 top-[214px] left-[27px]">Email</h4>
            <p className="font-poppins font-normal text-xs text-[#000000] leading-none absolute w-[136px] h-4.5 top-[232px] left-[27px] opacity-50">@email</p>
          </div>

  );
}

export default UserInfo;