import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className=" h-screen bg-gradient-to-bl from-blu via-vio to-yello bg-cover bg-fixed bg-no-repeat ">
        <div className=" bg-black bg-opacity-30">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
