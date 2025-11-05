import { 
  ChartColumnIncreasing, 
  LibraryBig,
  GraduationCap, 
  List,
  ShieldUser,
  Users
} from "lucide-react";

const baseUrl = '/admin/dashboard';

export const items = [
  {
    title: "Início",
    url: baseUrl,
    icon: ChartColumnIncreasing,
  },
  {
    marginTop: true,
    title: "Módulos",
    url: `${baseUrl}/modulos`,
    icon: GraduationCap,
  },
  {
    title: "Aulas",
    url: `${baseUrl}/aulas`,
    icon: List,
  },
  {
    marginTop: true,
    title: "FAQs",
    url: `${baseUrl}/faq`,
    icon: LibraryBig,
  },
  {
    marginTop: true,
    title: "Usuários",
    url: `${baseUrl}/usuarios`,
    icon: Users,
    requireSuperAdmin: true,
  },
  {
    title: "Admins",
    url: `${baseUrl}/admins`,
    icon: ShieldUser,
    requireSuperAdmin: true,
  },
]