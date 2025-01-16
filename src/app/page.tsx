'use client';

import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';


export default function Home() {
  useEffect(() => {
    const scrapPage = async () => {
      try {
        console.log("scrapping Page done")
      } catch (error) {
        console.error('Error scrapping Page:', error);
      }
    };
    scrapPage();
  }, []);

  return(
    <Menu />
  )}