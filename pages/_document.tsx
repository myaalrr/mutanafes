/*my-website > pages >_document.tsx*/ 

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar">
      <Head>
        {/* مهم جداً عشان الجوال يضبط العرض والقياسات */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="antialiased" dir="rtl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
