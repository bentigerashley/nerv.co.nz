import Head from "next/head";

import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Stack from "@/components/Stack/Stack";
import Contact from "@/components/Contact/Contact";
import Socials from "@/components/Socials/Socials";

import Items from "@/components/Scene/Items";
import SectionSnap from "@/components/Scene/SectionSnap";
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
    desc: "App that detects chess pieces with ML and runs Stockfish for evaluation and best move.",
    link: "https://github.com/bentigerashley/chess-vision",
  },
  {
    title: "fdi-headless",
    desc: "Headless WordPress and Next.js test site with verified SSH staging CI/CD",
    link: "https://github.com/bentigerashley/fdi-headless-test",
  },
  {
    title: "opengl-engine",
    desc: "Custom game engine with GLSL, CMake and C++",
    link: "https://github.com/bentigerashley/opengl-engine",
  },
  {
    title: "dotfiles",
    desc: "My personal Arch Linux dotfiles for coding and desktop config",
    link: "https://github.com/bentigerashley/dotfiles",
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
            dpr={[1, 1.25]}
            gl={{
              antialias: false,
              depth: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0, 0, 15], fov: 45 }}
          >
            <color attach="background" args={["black"]}></color>
            <ScrollControls
              pages={5}
              distance={1}
              damping={5}
              horizontal={false}
              infinite={false}
            >
              <SectionSnap pages={5} />
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
