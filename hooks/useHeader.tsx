import Link from "next/link";
import Image from "next/image";
import logo from "../public/seele-logo.svg";

function useHeader() {
  const header = (
    <div className={"flex justify-between items-center border-b-2 px-8 fixed top-0 right-0 left-0 z-50 bg-white"}>
      <Link href={"/"}>
        <a className={'w-16 h-16 border border-red-400'}>
          <Image
            className={"cursor-pointer"}
            src={logo}
            alt="website logo"
            width={64}
            height={64}
          />
        </a>
      </Link>
      <div className={"flex"}>
        <Link href={"http://www.keyu.wang/seele-ui"}>
          <a className={'block mr-8'}>SEELE-UI</a>
        </Link>
        <Link href={"https://github.com/keyuTech"}>
          <a>GitHub</a>
        </Link>
      </div>
    </div>
  );
  return {
    header,
  };
}

export default useHeader;
