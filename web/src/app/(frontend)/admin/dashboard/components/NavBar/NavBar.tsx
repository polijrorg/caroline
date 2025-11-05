'use client'
import Image from "next/image";
import Link from "next/link";


function NavBar() {
  return (
    <div className="fixed w-20 h-screen bg-azulProfundo flex flex-col top-px pt-6 pr-1 pb-6 pl-1 gap-9 items-center justify-start"> 
      <Link href="/" className="block p-2 mt-32"> <Image src="/icons/NavBarIcons/House.png" alt="Book open" width={32} height={32} /> </Link>
      <Link href="/" className="block p-2"> <Image src="/icons/NavBarIcons/Book_Open.png" alt="Book open" width={32} height={32} /> </Link>
      <Link href="/faq" className="block p-2"> <Image src="/icons/NavBarIcons/Chat_Conversation.png" alt="Chat" width={32} height={32} /> </Link>
      <Link href="/perfil" className="block p-2"> <Image src="/icons/NavBarIcons/User.png" alt="Usuário" width={32} height={32} /> </Link>
      <Link href="/favoritos" className="block p-2"> <Image src="/icons/NavBarIcons/estrela.png" alt="estrela" width={32} height={32} /> </Link>
      <div className ="w-18 h-[30%]"> </div>
      <div className="p-2 fixed bottom-[3%]"> <Image src="/icons/NavBarIcons/Log_Out.png" alt="estrela" width={32} height={32} /> </div>
    </div>
  
  );

}

export default NavBar; 
