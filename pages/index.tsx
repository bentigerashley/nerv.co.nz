import Head from "next/head";

import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Stack from "@/components/Stack/Stack";
import Contact from "@/components/Contact/Contact";
import Socials from "@/components/Socials/Socials";

import Orb from "@/components/Orb/Orb";
import Items from "@/components/Scene/Items";
import { Suspense } from "react";
import { ScrollControls, Scroll } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";

type Props = {
  data: { posts: Post[] };
};

interface Post {
  link: string;
  title: string;
  desc: string;
}

const posts: Post[] = [
  {
    title: "chess-vision",
    desc: "Android app that captures or imports a photo of a chessboard, detects the board and pieces with TensorFlow Lite, converts the position to FEN, and runs Stockfish for evaluation and best move.",
    link: "https://github.com/bentigerashley/chess-vision",
  },
  {
    title: "nerv-vercel",
    desc: "The website you're on. A developer portfolio built with Next.js, Three.js, Vercel, and a signal-driven interface for email handling.",
    link: "https://github.com/bentigerashley/nerv.co.nz",
  },
  
  
  
  
];

export default function Home({ data }: Props) {
  return (
    <>
      <Head>
        <title>NERV</title>
        <meta name="description" content="hey, i'm ben, full-stack dev." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"bg-dark-blue text-light-clay font-sans"}>
        <div className="fixed top-0 left-0 right-0 h-screen w-screen z-20">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{ depth: false }}
            camera={{ position: [0, 0, 15], fov: 45 }}
          >
            <color attach="background" args={["black"]}></color>
            <ScrollControls
              pages={5}
              distance={1}
              damping={6}
              horizontal={false}
              infinite={false}
            >
              <Orb />
              <Scroll html>
                <div className="w-screen">
                  <div className="max-w-[1280px] mx-auto">
                    <Hero />
                    <Posts posts={data.posts} />
                    <Stack />
                    <Contact />
                    <Socials />
                  </div>
                </div>
              </Scroll>
              <Suspense>
                <Items />
              </Suspense>
            </ScrollControls>
          </Canvas>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: { posts },
    },
  };
}
