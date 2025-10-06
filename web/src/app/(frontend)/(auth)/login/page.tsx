import LoginForm from './LoginForm';

function LoginPage() {
  return ( 
    <main
      className="min-h-screen w-full px-20 flex flex-col items-center justify-center"
    >
      <div className='flex w-full h-[80%px] rounded-4xl bg-[#9ebcddcc]'>
        <div className="bg-gradient-to-r from-[#FFFFFF]/80 to-[#88B3E1]/80 w-full h-full"></div>
        <div className="bg-gradient-to-bl from-[#88B3E1]/50 to-[#FFFFFF]/100 w-full h-full flex flex-col rounded-tr-[32px] rounded-br-[32px] gap-8 items-center justify-center">
          <LoginForm />
        </div>
      </div>

    </main>
   );
}

export default LoginPage;