'use client'
import Image from "next/image";

interface CourseCardProps {
  percent: number; 
  foto: string;   
  nome: string;     
}

function CourseCard({percent, foto, nome}: CourseCardProps) {
  return (
    <div className="absolute w-[415px] h-[78px] bg-[ #FFFFFF] shadow-md pt-2.5 pr-4 pb-2.5 pl-4 gap-1.5 rounded-2xl">
      <div className="w-75 h-15 flex itens-center justify-between "> 
        <div className="w-15 h-15 rounded-full bg-azulCeu"> <Image src={foto} alt="{nome}" width={60} height={60} /> </div>
        <div className="w-50 h-15 flex flex-col flex-grow justify-center gap-y-1 mx-3">
          <h3 className="font-poppins font-semibold text-xs leading-6 tracking-[0.5px] align-middle">{nome}</h3>
          <div className="bg-[#949494] flex w-full h-3 rounded-full"> 
            <div className="rounded-full bg-[#50D76E] h-full" style={{width:`${percent}%` }}></div>
          </div>
        </div>
        <h3 className="font-poppins font-semibold text-xs leading-6 tracking-[0.5px] align-middle mt-7.5" >{percent.toString()}%</h3>
      </div>    
    </div>
  );  
}

export default CourseCard;