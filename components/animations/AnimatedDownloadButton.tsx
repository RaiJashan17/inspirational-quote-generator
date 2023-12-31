import React from 'react'
import Image from 'next/image'

import lottieJson from '../../assets/animatedphoto.json'
import { CenteredLottie, DownloadQuoteCardCon, DownloadQuoteCardConText } from './AnimationElement';
import Lottie from 'react-lottie-player';

interface AnimatedDownloadButtonProps{
    handleDownload: () => void;
}

const AnimatedDownloadButton = ({handleDownload}: AnimatedDownloadButtonProps) => {
  return (
    <DownloadQuoteCardCon 
        onClick={handleDownload}
    >
        <CenteredLottie
            loop
            animationData={lottieJson}
            play
        />
        <DownloadQuoteCardConText>
            Download your quote card
        </DownloadQuoteCardConText>
    </DownloadQuoteCardCon>
  )
}

export default AnimatedDownloadButton