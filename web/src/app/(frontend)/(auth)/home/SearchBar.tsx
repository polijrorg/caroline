'use client'
import Image from "next/image";


function SearchBar() {
  return (
    <div className="w-[774px] h-[50px] flex items-center justify-between bg-[#E5E5E5] pt-1 pr-3 pb-1 pl-3 rounded-2xl">
      <p className="w-[80%] h-6 opacity-100 font-poppins font-normal text-base leading-6 tracking-[0.5px]">Pesquise módulos, aulas, ... </p>
      <Image src="/SearchGlass.png" alt="Pesquisar" width={24} height={24} />
    </div>
  );
}

export default SearchBar;