import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface CredentialsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function CredentialsButton({ children, className, ...props }: CredentialsButtonProps) {
  return ( 
    <button 
      type="submit" 
      className={cn("login-button relative text-white bg-primary-400", className)}
      {...props}
    >
      {children}
    </button>
   );
}

export default CredentialsButton;