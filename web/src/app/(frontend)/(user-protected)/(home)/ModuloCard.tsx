'use client'
import Image from "next/image";

interface ModuloCardProps {
  titulo: string;
  descricao: string;
}

function ModuloCard({titulo, descricao}: ModuloCardProps) {
  return (
    <div className="flex flex-row w-full rounded-[40px] bg-[#90C8B6] p-6 gap-9">
      <div className="flex flex-col gap-3">  
          <Image src="/Cerebro.png" alt="image" width={200} height={140} className="rounded-[30px]"/>
          
          <button className="bg-azulProfundo rounded-[16px] w-60 h-8 py-2 px-6 text-[#FFFFFF] font-poppins font-bold text-base leading-4 tracking-[1.25px] uppercase" >Acessar módulo </button>
      </div>
      <div className="flex flex-col gap-4 my-6">
        <h3 className="font-poppins font-bold text-2xl leading-none tracking-normal">{titulo} </h3>
        <p className="font-poppins font-normal text-sm leading-none tracking-normal text-justify">{descricao} </p>

      </div>  
    </div>
  );
}

export default ModuloCard;