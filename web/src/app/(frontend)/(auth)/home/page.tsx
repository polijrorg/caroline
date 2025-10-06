import Image from "next/image";
import NavBar from "../../admin/dashboard/components/NavBar/NavBar"; 
import SearchBar from "./SearchBar";
import ModuloCard from "./ModuloCard";
import VideoCall from "./VideoCall";
import ReturnCard from "./ReturnCard";
import ProgressCard from "./ProgressCard";
import { Video } from "lucide-react";

function HomePage() {
  return (
    <main className="min-h-screen w-full flex bg-[#F2F2F2]" > 
      <NavBar />
      <div className="pl-18 w-full">
        <div className="flex-grow flex items-center h-[82px] pt-3 pr-6 pb-3 gap-2.5 opacity-100"> 
          <div className="ml-6"> 
            <Image src="/Rima_FundoClaro.png" alt="Rima" width={64} height={64} />
          </div>
          <div className="flex-grow flex justify-center items-center w-full   h-full">
            <SearchBar /> 
          </div>
        </div>

        <div className="flex gap-4 justify-around mt-16">

          <div className="flex flex-col w-[50%] gap-6" >
            <h3 className="font-montserrat font-medium text-2xl leading-none tracking-normal">Meus cursos: </h3>
            <ModuloCard titulo="Módulo 1: Introdução à Programação" descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle." /> 
            <ModuloCard titulo="Módulo 1: Introdução à Programação" descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle." /> 
            <ModuloCard titulo="Módulo 1: Introdução à Programação" descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle." /> 
            <ModuloCard titulo="Módulo 1: Introdução à Programação" descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle." /> 

          </div>
          <div className="mt-12 flex flex-col w-[30%] gap-6">
            <ProgressCard />
            <ReturnCard />
            <VideoCall />

          </div>
        </div>

      </div>
      
    </main>
  );
}

export default HomePage;