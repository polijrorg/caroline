import CadastroForm from "./CadastroForm";
import Image from "next/image";

function Cadastro() {
  return ( 
    <main 
      className="min-h-screen py-18 flex flex-col items-center justify-start"
      style={{ background: "linear-gradient(63.18deg, #FFFFFF 40%, rgba(148, 194, 244, 0.8) 100%)"}}>
      <div className=" bg-azulProfundo p-2.5" > <Image src="/Logo-Escuro.png" alt="Rima" width={64} height={64}/> </div>
      <CadastroForm />
    </main>
   );
}

export default Cadastro;