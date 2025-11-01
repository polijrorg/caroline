import NavBar from "../../admin/dashboard/components/NavBar/NavBar"; 
import Statistics from "./Statistics";

import Image from "next/image";

function PerfilPage() {
  return (
    <main className="h-[110vh] w-full flex bg-[#F2F2F2]" >
      <NavBar />
      <div className="absolute w-[390px] h-[148px] top-15 left-120 p-2.5 flex itens-center">
        <div className="rounded-full mr-6"> <Image src="/greyUser.png" alt="Imagem de Usuário" width={128} height={128} /> </div>
        <div className="flex flex-col flex-grow justify-evenly h-full">
          <h3 className="font-poppins font-normal text-2xl leading-none ">Fulano de Tal</h3>
          <h4 className="font-poppins font-normal text-sm leading-none ">fulano.detal@polijunior.com.br </h4>
          <h4 className="font-poppins font-normal text-sm leading-none ">Entrou em Abril de 2024</h4>
        </div>
      </div>

      <Statistics />

    </main>
  )
}

export default PerfilPage;