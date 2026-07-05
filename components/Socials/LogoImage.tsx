import Image from "next/image";
import StaticImport from "next";
type Props = {
  src: string;
  href: string;
};

export default function LogoImage({ src, href }: Props) {
  return (
    <a
      className="z-10 relative w-20 h-16 hover:scale-105 transition"
      href={href}
    >
      <Image alt="logo image" fill src={src} objectFit="contain" />
    </a>
  );
}
