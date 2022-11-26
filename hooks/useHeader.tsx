import Link from "next/link";
import logo from "../public/seele-logo.svg";

function useHeader() {
  const header = (
    <div className={"flex justify-between items-center border-b-2 px-8 fixed top-0 right-0 left-0 z-50 bg-white"}>
      <Link href={"/"}>
        <a className={'w-16 h-16'}>
          {/* bug: use Image component with svg, in server, svg rendered size will be 0x0, can not display */}
          {/* <Image
            className={"cursor-pointer"}
            src={logo}
            alt="website logo"
            width={64}
            height={64}
          /> */}
          <img src={logo.src} alt="logo" width={64} height={64} />
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
