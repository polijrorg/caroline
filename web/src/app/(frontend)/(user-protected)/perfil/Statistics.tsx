'use client'
import UserInfo from "./UserInfo";
import CourseCard from "./CourseCard";
import Users from "./Users";

function Statistics() {
  return (
    <div className="absolute w-[80vw] h-[74vh] top-[25vh] left-[10vw]"> 
      <h2 className="font-poppins font-normal text-2xl leading-none absolute w-[135px] h-9 top-6 left-4.5">Estatísticas</h2>
      <h2 className="font-poppins font-normal text-2xl leading-none absolute w-21 h-9 top-[355px] left-4.5">Cursos</h2>

      <div className="absolute top-[96px] left-[300px]"> <Users nome="Carol"/> </div>
      <div className="absolute top-[200px] left-[300px]"> <Users nome="antônio"/> </div>
      <div className="absolute top-[96px] left-[12px]"> <Users nome="Bernardo"/> </div>
      <div className="absolute top-[200px] left-[12px]"> <Users nome="Fernanda"/> </div>

      <div className="absolute top-[427px] left-4.5"> <CourseCard  nome="Curso 1" foto=""  percent={67} /></div>
      <div className="absolute top-[541px] left-4.5"> <CourseCard  nome="Curso 2" foto=""  percent={45} /></div>
      <div className="absolute top-[655px] left-4.5"> <CourseCard  nome="Curso 3" foto=""  percent={33} /></div>
      
      
      <div className="absolute w-[2.15px] h-[90%] top-[11px] left-[55%] bg-gray-400"></div>
      <UserInfo />    

    
    </div>  
  );

}

export default Statistics;