import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

// Components
import {BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle, RedSpan } from '@/components/QuoteGenerator/QuoteGeneratorElement'

//Assests
import Cloud1 from '@/assets/cloud-and-thunder.png'
import Cloud2 from '@/assets/cloudy-weather.png'
import { API } from 'aws-amplify'
import { quotesQueryName } from '@/src/graphql/queries'

// interface for DynamoDB object
interface UpdateQuoteInforData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}
// type guard for fetch function

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
  
  // Function to fetch our DynamoDB object (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInforData>({
        query: quotesQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "LIVE"
        }
      })
      console.log('response',response);
    } catch (error) {
      console.log('error getting quote data', error)
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, [])
  
  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A fun project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*Background*/}
      <GradientBackgroundCon>
        {/*Quote Generator Modual Pop-Up*/}
        {/*<QuoteGeneratorModal
        />*/}

        {/*Quote Generator*/}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <GenerateQuoteButton>
              <GenerateQuoteButtonText onClick={null}>
                Make a Quote
              </GenerateQuoteButtonText>

            </GenerateQuoteButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>
        
        {/*Background Images*/}
        <BackgroundImage1
            src={Cloud1}
            height="300"
            alt="cloudybackground1"
          />

        <BackgroundImage2
            src={Cloud2}
            height="300"
            alt="cloudybackground2"
          />


        {/*Footer*/}
        <FooterCon>
            <>
              Quotes Generated: {numberOfQuotes}
              <br />
              Developed with <RedSpan>❤️</RedSpan> by <FooterLink href="https://www.linkedin.com/in/raijashan17/" target="_blank" rel="no opener
              noreferrer">@raijashan17</FooterLink>
            </>
          </FooterCon>

      </GradientBackgroundCon>

    </>
  )
}