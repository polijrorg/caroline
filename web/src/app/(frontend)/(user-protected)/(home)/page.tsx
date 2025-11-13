import ModuloCard from "./ModuloCard";
import VideoCall from "./VideoCall";
import ReturnCard from "./ReturnCard";
import ProgressCard from "./ProgressCard";

function HomePage() {
  return (
    <div className="flex gap-4 justify-around mt-16 px-6 pb-8">
      <div className="flex flex-col w-[50%] gap-6">
        <h3 className="font-montserrat font-medium text-2xl leading-none tracking-normal">
          Meus cursos:
        </h3>
        <ModuloCard
          titulo="Módulo 1: Introdução à Programação"
          descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle."
        />
        <ModuloCard
          titulo="Módulo 1: Introdução à Programação"
          descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle."
        />
        <ModuloCard
          titulo="Módulo 1: Introdução à Programação"
          descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle."
        />
        <ModuloCard
          titulo="Módulo 1: Introdução à Programação"
          descricao="Aprenda os conceitos básicos de programação, incluindo variáveis, tipos de dados e estruturas de controle."
        />
      </div>
      <div className="mt-12 flex flex-col w-[30%] gap-6">
        <ProgressCard />
        <ReturnCard />
        <VideoCall />
      </div>
    </div>
  );
}

export default HomePage;