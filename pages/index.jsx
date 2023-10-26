import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import Header from '../components/home/header/Header';
import SectionArticles from '../components/home/SectionArticles'
import Home from '../components/home/SectionHome'
import Footer from '../components/home/footer/Footer';


function Main() {
  return (
    <div>
      <Header />
      <Home />  
      <SectionArticles />
      <Footer />
    </div>
  );
};

export default Main;