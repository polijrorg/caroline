import Link from "next/link";
import BaseCheckbox from "../input/BaseCheckbox/BaseCheckbox";

function LoginOptionals() {
  return ( 
    <div className="mt-4 flex flex-col gap-2 justify-between text-gray-500 text-sm">
      <div className="flex items-center gap-2">
        <BaseCheckbox id="remember" name="remember"  />
        <label htmlFor="remember" className="leading-4">Lembrar de mim</label>
      </div>

      <Link href='/login/reset-password' className="w-fit colorTransition border-transparent border-b hover:border-gray-400">Esqueceu sua senha?</Link>
    </div>
   );
}

export default LoginOptionals;