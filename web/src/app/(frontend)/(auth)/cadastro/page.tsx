import CadastroForm from "./CadastroForm";

function Cadastro() {
  return ( 
    <main 
      className="min-h-screen py-18 flex flex-col items-center justify-start"
      style={{ background: "linear-gradient(63.18deg, #FFFFFF 40%, rgba(148, 194, 244, 0.8) 100%)"}}>
      <h1 className="main-header">RIMA</h1>
      <CadastroForm />
    </main>
   );
}

export default Cadastro;