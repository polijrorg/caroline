'use client'
import Image from "next/image";

function ReturnCard() {
  return (
    <div className="flex flex-col items-center w-full rounded-[40px] bg-[#F9FCFF] p-8 gap-9">
      <h3 className="font-poppins font-bold w-full text-xl leading-none tracking-[0.1px]">Retome de onde você parou: </h3>
      <Image src="/return.png" alt="image" width={200} height={140} className="rounded-[20px] border-[1px] border-[azulProfundo]"/>
      <p className="font-poppins text-sm leading-none tracking-[0.1px]">Dia 1 - Aula 1: Lorem ipsun dolor</p>      
      <button className="bg-azulProfundo rounded-[16px] w-80 h-8 py-2 px-6 text-[#FFFFFF] font-poppins font-bold text-base leading-4 tracking-[1.25px] uppercase" >ir para página da aula </button>
    </div>
  );
}

export default ReturnCard;