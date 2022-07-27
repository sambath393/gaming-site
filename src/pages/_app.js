import React from 'react';
import { RecoilRoot } from 'recoil';
import '../utilities/i18n';
import '../styles/globals.css';
import { Main } from '../components';
import { seoDefualt } from '../constants';

const config = {
  enableRecoil: false,
};

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  let appElem = (
    <Layout>
      <Main.HeadNextSeo dataSource={pageProps?.seo || seoDefualt} />
      <Component {...pageProps} />
    </Layout>
  );

  if (config.enableRecoil) {
    appElem = <RecoilRoot>{appElem}</RecoilRoot>;
  }

  return appElem;
}

export default MyApp;
