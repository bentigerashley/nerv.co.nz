export default function Hero() {
  return (
    <div className="pb-16 md:pb-0 h-screen flex flex-col lg:flex-row justify-center items-center px-6">
      <div className="w-full lg:w-1/2 relative flex items-center justify-center mb-12 lg:mb-0">
        <div className="signal-panel w-full max-w-md min-h-[220px] p-6 font-mono text-sm text-terminal">
          <div className="flex justify-between text-amber">
            <span>PROFILE: BEN</span>
            <span>SYNC 98.7%</span>
          </div>
          <div className="mt-10 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
            <span className="text-signal">01</span>
            <span>software systems</span>
            <span className="text-signal">02</span>
            <span>interfaces and automations</span>
            <span className="text-signal">03</span>
            <span>quiet tools with sharp edges</span>
          </div>
          <div className="mt-10 h-2 bg-terminal/20">
            <div className="h-full w-3/4 bg-terminal" />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 relative flex flex-col justify-center">
        <p className="signal-label self-center lg:self-start bg-dark-blue/80 px-2 py-1 font-mono text-base mb-4 text-center lg:text-left">
          personal site // nerv.co.nz
        </p>
        <p className="font-mono text-3xl mb-6 text-center lg:text-5xl lg:text-left lg:mb-12 text-light-clay">
          hey, i&apos;m ben,
          <br /> full-stack dev.
        </p>
        <p className="text-3xl text-center lg:text-5xl lg:text-left text-light-clay">
          building precise,
          <br /> useful things.
        </p>
      </div>
    </div>
  );
}
