import Head from "next/head";
import Battle from "./components/battle";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Diffusion Royale</title>
        <meta
          name="description"
          content="Battle Royale for Stable Diffusion Images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Battle />
    </>
  );
}
