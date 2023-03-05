import Head from "next/head";
import Battle from "./components/Battle";
import Enter from "./components/Enter";
import Navigation from "./components/Navigation";
import BlurredBackgroundContainer from "./components/BlurredBackgroundContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Diffusion Standoff</title>
        <meta
          name="description"
          content="Battle Royale for Stable Diffusion Images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="no-scrollbar w-screen">
        <Navigation />
        <div className="p-y-11 flex flex-col items-center justify-center">
          <div className="m-11 w-4/5">
            <BlurredBackgroundContainer>
              <Battle />
            </BlurredBackgroundContainer>
          </div>
          <div className="m-11 w-4/5">
            <BlurredBackgroundContainer>
              <Enter />
            </BlurredBackgroundContainer>
          </div>
        </div>
      </div>
    </>
  );
}
