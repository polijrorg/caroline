import { 
  ChartColumnIncreasing, 
  LibraryBig,
  GraduationCap, 
  Laptop,
  List,
  BookCopy,
  Building2,
  Users,
  ShieldUser
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
    title: "Admins",
    url: `${baseUrl}/admins`,
    icon: ShieldUser,
  },
]