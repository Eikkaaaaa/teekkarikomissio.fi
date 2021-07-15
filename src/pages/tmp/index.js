import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import TranslationStrings from '../../static-translations/locales';
import withLocalization from '../../../hocs/withLocalization';
import useTranslation from '../../../hooks/useTranslation';
import Layout from '../../components/Layout';
import HeaderPicture from '../../components/HeaderPicture';
import { H1, H2, ShortText } from '../../components/Typography';

import fetchEntries from '../../api/api';

// const client = require('contentful').createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

function Homepage(props) {
  const router = useRouter();
  const { defaultLocale } = router;
  // const [entries, setEntries] = useState([]);

  // async function fetchEntries() {
  //   return await client.getEntries({ content_type: 'home' }).then((entries) => {
  //     if (entries && entries.items && entries.items.length > 0) {
  //       return entries.items;
  //     }
  //     return [];
  //   });
  // }

  // useEffect(() => {
  //   async function getEntries() {
  //     const allEntries = await fetchEntries();
  //     setEntries([...allEntries]);
  //   }
  //   getEntries();
  //   setEntries(homeContent);
  // }, []);

  const { t } = useTranslation('home');

  const partners = [
    {
      img: '/logo-tek.png',
      alt: 'TEK',
      href: 'https://www.tek.fi/',
    },
    {
      img: '/logo-tfif.svg',
      alt: 'TFiF',
      href: 'https://tfif.fi/',
    },
  ];

  const PartnerCard = ({ img, href, alt }) => {
    return (
      <div className="flex items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 m-8 p-4">
        <a href={href}>
          <img src={img} alt={alt} />
        </a>
      </div>
    );
  };

  return (
    <Layout titleKey={t('metaTitle')}>
      <p>Default locale: {defaultLocale}</p>
      {/* {homeContent.map((entry) => {
        console.log(entry.fields.intro);
        return (
          <Markdown key={entry.fields.intro} options={{ wrapper: 'article' }}>
            {entry.fields.intro}
          </Markdown>
        );
      })} */}
      <HeaderPicture img="/index-banner-fi.jpg" alt="Teekkarikomissio" />
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="bg-white rounded-b lg:rounded-b-none p-4 flex flex-col justify-between leading-normal">
          <H1>{t('homeHeading')}</H1>
          <ShortText>{t('homeContent')}</ShortText>
        </div>
      </div>
      {/* <div className="flex lg:flex-row flex-col items-center justify-center">
        <img className="lg:h-56 w-auto" src="/logo-utu.png" alt="Utu logo" />
        <img className="h-56 w-auto" src="/logo-AboAkademi.png" alt="Åbo akademi logo" />
      </div> */}
      <div className="my-16 lg:flex lg:flex-row justify-between items-center">
        <img
          className="lg:rounded-lg flex-none lg:shadow-2xl bg-cover text-center lg:h-1/4 lg:w-1/4 overflow-hidden"
          src="/index-teekkari.jpg"
          alt="Teekkari"
        />
        <div className="bg-white mx-8 p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <H2>{t('homeHeading2')}</H2>
            <ShortText>{t('homeContent2')}</ShortText>
          </div>
        </div>
      </div>
      <div className="my-16 lg:flex lg:flex-row-reverse justify-between items-center">
        <img
          className="lg:rounded-lg flex-none lg:shadow-2xl bg-cover text-center lg:h-1/4 lg:w-1/4 overflow-hidden"
          src="/index-jaynamerkki.jpeg"
          alt="Jäynämerkki"
        ></img>
        <div className="bg-white mx-8 p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <H2>{t('homeHeading3')}</H2>
            <ShortText>{t('homeContent3')}</ShortText>
          </div>
        </div>
      </div>
      <div className="my-16 lg:flex lg:flex-row justify-between items-center">
        <img
          className="lg:rounded-lg flex-none lg:shadow-2xl bg-cover text-center lg:h-2/5 lg:w-2/5 overflow-hidden"
          src="/paavon-lakitus.jpg"
          alt="Paavon lakitus"
        ></img>
        <div className="bg-white mx-8 p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <H2>{t('homeHeading4')}</H2>
            <ShortText>{t('homeContent4')}</ShortText>
          </div>
        </div>
      </div>
      <H1>{t('homeHeading5')}</H1>
      <div className="lg:grid lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-1 md:block">
        {partners.map(({ img, href, alt }) => (
          <PartnerCard key={`${href}${alt}`} img={img} href={href} alt={alt} />
        ))}
      </div>
    </Layout>
  );
}

// export async function getStaticProps({ params: { lang } }) {
//   const namespaces = ['home', 'common', 'nav'];

//   return {
//     props: {
//       lang,
//       namespaces,
//       translations: namespaces.map((namespace) => ({
//         namespace,
//         translatedStrings:
//           TranslationStrings[lang] && TranslationStrings[lang][namespace],
//       })),
//     },
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { lang: 'fi' } }, { params: { lang: 'sv' } }],
//     fallback: false,
//   };
// }

// export default withLocalization(Homepage);

export async function getStaticProps({ locale, locales }) {
  // const homeContent = await fetchEntries();

  // return {
  //   props: { homeContent },
  // };
  return {
    props: {
      locale,
      locales,
    },
  };
}