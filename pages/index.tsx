import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

// Components
import {BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle, RedSpan } from '@/components/QuoteGenerator/QuoteGeneratorElement'
import QuoteGeneratorModal from '@/components/QuoteGenerator'

//Assests
import Cloud1 from '@/assets/cloud-and-thunder.png'
import Cloud2 from '@/assets/cloudy-weather.png'
import { API } from 'aws-amplify'
import { quotesQueryName } from '@/src/graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'

// interface for DynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}
// type guard for fetch function
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items : [UpdateQuoteInfoData];
  };
}>{
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
  const [openGenerator,setOpenGenerator]=useState(false);
  const [processingQuote, setProcessingQuote] = useState(false);
  const [quoteReceived, setQuoteReceived] = useState<String | null>(null);
  
  // Function to fetch our DynamoDB object (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "LIVE"
        }
      })
      //console.log('response',response);
      //setNumberOfQuotes();

      // Create type guard for our DynamoDB object
      if(!isGraphQLResultForquotesQueryName(response)){
        throw new Error('Unexpected response from API.graphql');
      }

      if(!response.data){
        throw new Error('Response data is undefined');
      }

      const receivedNumberOfQuotes= response.data.quotesQueryName.items[0].quotesGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes);

    } catch (error) {
      console.log('error getting quote data', error)
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, [])

  // Functions for the quote generator modal
  const handleCloseGenerator = () => {
    setOpenGenerator(false);
  }

  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenGenerator(true);
    setProcessingQuote(true);
    try {
      // Run Lambda Function
      //setProcessingQuote(false);
      setTimeout(() => {
        setProcessingQuote(false);
      },3000);
    } catch(error) {
      console.log('error generating quote:', error);
      setProcessingQuote(false);
    }
  }
  
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
        <QuoteGeneratorModal
         open={openGenerator}
         close={handleCloseGenerator}
         processingQuote={processingQuote}
         setProcessingQuote={setProcessingQuote}
         quoteReceived={quoteReceived}
         setQuoteReceived={setQuoteReceived}
        />

        {/*Quote Generator*/}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <GenerateQuoteButton onClick={handleOpenGenerator}>
              <GenerateQuoteButtonText >
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