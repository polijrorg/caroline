'use client'
import Image from "next/image";

function ProgressCard() {
  return (
    <div className="flex flex-col items-center w-full rounded-[40px] bg-[#F9FCFF] p-8 gap-9">
      <h3 className="font-poppins font-bold w-full text-xl leading-none tracking-[0.1px]">Sua sequência: </h3>
      <div className="flex flex-row "> 
        <Image src="/ProgressFire.png" alt="image" width={74} height={80} className="rounded-[20px] border-[1px] border-[azulProfundo]"/>
        <div className="ml-4 flex flex-col gap-2 items-center justify-center">
          <p className="text-[#FE5F55] font-poppins font-bold text-xl leading-none tracking-[0.1px]">5 dias consecutivos </p>
          <div className="rounded-full bg-[#C7C7C7] w-53 h-5"> 
            <div className="bg-[#FE5F55] w-[60%] h-full rounded-full" > 

            </div>

          </div>

        </div>
      </div>
      <p className="font-poppins text-sm leading-none tracking-[0.1px]">Continue por mais 1 dia para atingir o nível III</p>      
    </div>
  );
}

export default ProgressCard;