import LoginForm from './LoginForm';

function LoginPage() {
  return ( 
    <main
      className="min-h-screen w-full py-18 px-20 flex flex-col items-center justify-start"
    >
      <div className='flex w-full rounded-4xl bg-[#9ebcddcc]'>
        <div className=' w-full h-full'></div>
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
          <LoginForm />
        </div>
      </div>

    </main>
   );
}

export default LoginPage;