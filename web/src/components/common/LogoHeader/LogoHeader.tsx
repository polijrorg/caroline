import Image from "next/image";

function LogoHeader() {
  return (
    <div className="ml-6">
      <Image
        src="/Rima_FundoClaro.png"
        alt="Rima"
        width={64}
        height={64}
      />
    </div>
  );
}

export default LogoHeader;
