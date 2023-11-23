// import Sidebar from "@/components/Sidebar";
import Head from 'next/head';
import '../styles/globals.css';
import 'chart.js/auto'; 
import 'firebase/storage';
import '@radix-ui/themes/styles.css';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Bebê-Vindo</title>
       <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
      <link rel="preconnect" href="https://ka-f.fontawesome.com"/>
        <script src="https://kit.fontawesome.com/121a930925.js" crossOrigin="anonymous"></script>
      </Head>
      {/* <Sidebar /> */}
      <Component {...pageProps} />
    </div>
  );
}


// export default App;
// 