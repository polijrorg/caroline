'use client'
import Image from "next/image";

function SearchBar() {
  return (
    <div className="flex flex-col w-full rounded-[40px] bg-[#DACAC1] p-8 gap-9">
      <h3 className="font-poppins font-bold text-2xl leading-none tracking-normal">Agende sua videochamada aqui:</h3>
      <p className="font-poppins font-semibold text-base leading-4 tracking-[1.25px] text-justify">Escolha uma das opções abaixo para agendar sua videochamada:</p>
      <div className="flex flex-row gap-9 items-center justify-center">
        <div className="flex flex-col gap-3">                
          <button className="bg-azulProfundo rounded-[16px] w-70 h-8 py-2 px-6 text-[#FFFFFF] font-poppins font-bold text-base leading-4 tracking-[1.25px] uppercase">31/05: 14H00 - 14H30 </button>

          <button className="bg-azulProfundo rounded-[16px] w-70 h-8 py-2 px-6 text-[#FFFFFF] font-poppins font-bold text-base leading-4 tracking-[1.25px] uppercase">03/06: 18H00 - 18H30 </button>

          <button className="bg-azulProfundo rounded-[16px] w-70 h-8 py-2 px-6 text-[#FFFFFF] font-poppins font-bold text-base leading-4 tracking-[1.25px] uppercase">10/06: 11H00 - 11H30 </button>
        </div>
        <Image src="/Call.png" alt="image" width={200} height={200}/>
      </div>
     
    </div>
  );
}

export default SearchBar;