// import Sidebar from "@/components/Sidebar";
import Head from 'next/head';
import '../styles/globals.css';
import 'chart.js/auto'; 
import firebase from 'firebase/app';
import 'firebase/storage';
import '@radix-ui/themes/styles.css';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
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