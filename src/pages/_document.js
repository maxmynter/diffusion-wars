import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="no-scrollbar  isolate bg-black bg-cover font-sans text-white ">
        <div className="w-full items-center justify-center">
          <div className="relative h-full w-full overflow-clip">
            <div className="absolute left-1/4 top-1/2 -mt-[250px]  -ml-[250px] h-[535px] w-[535px] animate-antiblob rounded-full bg-vio opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-6000 absolute top-12 right-4 h-[250px] w-[250px] animate-blob rounded-full bg-yello opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-2000 absolute bottom-4 left-12  h-[450px] w-[450px] animate-blob rounded-full bg-blu opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-4000 absolute bottom-6  right-1/3 h-[370px] w-[370px] animate-blob rounded-full bg-lime-300 opacity-70 mix-blend-multiply blur-xl filter"></div>

            <div className="animation-delay-6000 absolute left-12 top-12 h-[375px] w-[375px] animate-antiblob rounded-full bg-yello opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-2000 absolute top-12 right-4 h-[500px] w-[500px] animate-antiblob rounded-full bg-teal-700 opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-4000 absolute bottom-1/2 right-1/3 -mr-[100px] -mt-[100px]  h-[250px] w-[250px] animate-antiblob rounded-full bg-orange-300  opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-3000 absolute bottom-6  right-7 h-[300px] w-[300px] animate-antiblob rounded-full bg-red-200 opacity-70 mix-blend-multiply blur-xl filter"></div>

            <div className="absolute left-1/2 top-1/2 -ml-[250px] -mt-[250px] h-[500px] w-[500px] animate-blob rounded-full bg-purple-600 opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-2000 absolute right-7 top-1/2 -mr-[100px] -mt-[100px] h-[200px] w-[200px] animate-blob rounded-full bg-amber-400 opacity-70 mix-blend-multiply blur-xl filter"></div>

            <div className="items-top relative flex min-h-screen justify-center">
              <div>
                <Main />
                <NextScript />
              </div>
            </div>
          </div>
        </div>
      </body>
    </Html>
  );
}

//className="absolute h-full w-full bg-gradient-to-bl  from-blu via-vio to-yello bg-cover bg-cover bg-fixed bg-no-repeat object-cover pb-0.5 "
