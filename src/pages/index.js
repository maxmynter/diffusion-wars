import Head from "next/head";
import Enter from "./components/Enter";
import UploadImage from "./components/uploadImage";

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
      <Enter />
      <UploadImage />
    </>
  );
}
