import LogoImage from "./LogoImage";
import { motion } from "framer-motion";
export default function Socials() {
  return (
    <div className="pb-16 md:pb-0 h-screen min-w-screen flex justify-center items-center">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display uppercase mx-10 text-3xl md:text-4xl lg:text-6xl mb-6">
          external signals
        </h2>
        <motion.div className="signal-panel relative max-w-fit mx-auto flex justify-center backdrop-blur-sm py-3 px-6">
          <motion.div className="z-10 flex mx-auto gap-6 justify-center items-center">
            <LogoImage
              src="/assets/logos/github.svg"
              href="https://github.com/bentigerashley"
            />
            <LogoImage
              src="/assets/logos/discord.svg"
              href="https://discordapp.com/users/229147991716397056"
            />
            <LogoImage
              src="/assets/logos/linkedin.svg"
              href="https://linkedin.com/in/btashley"
            />
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
