'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

import PasswordRequirement from "./PasswordRequirement";
import RequiredTag from "@/components/input/RequiredTag";
import { hasLowercase, hasMinLength, hasNumber, hasUppercase, validatePassword } from "@/utils";

import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

import dynamic from 'next/dynamic';

const CredentialsButton = dynamic(() => import('@/components/auth/CredentialsButton'));
const ValidatedInput = dynamic(() => import('@/components/input/ValidatedInput'));

function CadastroForm() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [diaNascimento, setDiaNascimento] = useState('');
  const [mesNascimento, setMesNascimento] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validatePassword(password)) {
        toast.error("A senha não atende aos requisitos mínimos");
        return;
      }
      const y = parseInt(anoNascimento.trim(), 10);
      const m = parseInt(mesNascimento.trim(), 10);
      const d = parseInt(diaNascimento.trim(), 10);

    // validações básicas
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(y) || y < 1900 || y > currentYear) {
      toast.error("Ano de nascimento inválido");
      setLoading(false);
      return;
    }
    if (!Number.isInteger(m) || m < 1 || m > 12) {
      toast.error("Mês de nascimento inválido");
      setLoading(false);
      return;
    }
    // último dia do mês: new Date(year, month, 0).getDate() -> mês 1-12
    const maxDay = new Date(y, m, 0).getDate();
    if (!Number.isInteger(d) || d < 1 || d > maxDay) {
      toast.error("Dia de nascimento inválido");
      setLoading(false);
      return;
    }

    // construir Date com números (monthIndex = m - 1)
    const dateObj = new Date(y, m - 1, d);

    // verificação extra: garantir que o Date criado corresponde exatamente aos números
    if (
      dateObj.getFullYear() !== y ||
      dateObj.getMonth() !== (m - 1) ||
      dateObj.getDate() !== d
    ) {
      toast.error("Data de nascimento inválida");
      setLoading(false);
      return;
    }

    // data válida — use ISO (ou outro formato que seu backend espera)
    const dataNasc = dateObj.toISOString();

      console.log(dataNasc)
      const result = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, sobrenome, dataNasc }),
      }).then(res => res.json());

      if (result.error) {
        if (result.error.message?.includes('already exists') || result.error.message?.includes('duplicate')) {
          toast.error("Este email já está cadastrado");
        } else {
          toast.error(result.error.message || "Erro inesperado");
        }
      } else {
        toast.success(`Bem-vindo(a), ${name}!`);
        
        setTimeout(() => {
          redirect('/login');
        }, 1000);
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return ( 
    <div className="flex flex-col items-center justify-center
    bg-white rounded-4xl shadow-lg lg:min-w-[540px] mt-6 pb-10">
      <h2 className="text-4xl px-5.5 pt-10 pb-6">Criar uma nova conta</h2>
      <div className="w-full h-0.5 bg-black"></div>

        <form className="pt-8 px-8" onSubmit={handleCredentialsSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between gap-10 align-self-center">
              <ValidatedInput
                title="Nome"
                placeholder="Jose"
                name="name"
                type="text"
                value={name}
                setValue={setName}
                labelClassName='auth-label'
                inputClassName='auth-input'
                iconContainerClassName="auth-icon"
                containerClassName="w-full"
                noLabel
                required
              ><RequiredTag/></ValidatedInput>
              <ValidatedInput
                title="Sobrenome"
                placeholder="da Silva"
                name="sobrenome"
                type="text"
                value={sobrenome}
                setValue={setSobrenome}
                labelClassName='auth-label'
                inputClassName='auth-input'
                iconContainerClassName="auth-icon"
                containerClassName="w-full"
                noLabel
                required
              ><RequiredTag/></ValidatedInput>
            </div>

            <div>
              <label className="auth-label text-sm !mt-2 flex items-center gap-1">
                Data de Nascimento
                <RequiredTag/>
              </label>
              <div className="flex gap-4">
                <input placeholder="DD" maxLength={2} className="auth-input" value={diaNascimento} onChange={(e) => setDiaNascimento(e.target.value)} />
                <input placeholder="MM" maxLength={2} className="auth-input" value={mesNascimento} onChange={(e) => setMesNascimento(e.target.value)} />
                <input placeholder="YYYY" maxLength={4} className="auth-input" value={anoNascimento} onChange={(e) => setAnoNascimento(e.target.value)} />
              </div>
            </div>

            <ValidatedInput
              title="E-mail"
              placeholder="exemplo@teste.com"
              name="email"
              type="email"
              value={email}
              setValue={setEmail}
              labelClassName='auth-label'
              inputClassName='auth-input'
              iconContainerClassName="auth-icon"
              required
            ><RequiredTag/></ValidatedInput>
            <ValidatedInput
              title="Senha"
              placeholder="Insira sua senha"
              name="password"
              type="password"
              value={password}
              setValue={setPassword}
              overrideValidate={validatePassword}
              labelClassName="auth-label"
              inputClassName="auth-input"
              iconContainerClassName="auth-icon"
              required
            ><RequiredTag/></ValidatedInput>
            <p className="text-xs">
              Senha deve ter pelo menos:
              <PasswordRequirement 
                text="1 letra maiúscula"
                validateFunction={() => hasUppercase(password)}
              />
              <PasswordRequirement 
                text="1 letra minúscula"
                validateFunction={() => hasLowercase(password)}
              />
              <PasswordRequirement 
                text="1 número"
                validateFunction={() => hasNumber(password)}
              />
              <PasswordRequirement 
                text="8 caracteres"
                validateFunction={() => hasMinLength(password)}
              />
            </p>
          </div>
          <CredentialsButton disabled={loading} className="mt-6">Cadastre-se</CredentialsButton>
        </form>
        
        <Link href='/login' className="block w-fit mt-8 text-sm group text-blueHighlight underline">Já tem uma conta?</Link>
    </div>
   );
}

export default CadastroForm;