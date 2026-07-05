import LogoImage from "./LogoImage";
import { motion } from "framer-motion";
export default function Socials() {
  return (
    <div className="pb-16 md:pb-0 h-screen min-w-screen flex justify-center items-center">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="mx-10 text-3xl md:text-4xl lg:text-6xl mb-6 font-bold">
          external signals
        </h2>
        <motion.div className="signal-panel relative max-w-fit mx-auto flex justify-center backdrop-blur-sm py-3 px-6">
          <motion.div className="z-10 flex mx-auto gap-6 justify-center items-center">
            <LogoImage
              src="/assets/logos/github.svg"
              href="https://github.com/bentigerashley"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
