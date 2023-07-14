import React from 'react'

// Material UI Imports
import { Backdrop, Modal, Fade } from '@mui/material'

interface QuoteGeneratorModalProps {
    open: boolean;
    close: () => void;
}

const QuoteGeneratorModal = ({open, close}: QuoteGeneratorModalProps) => {
  return (
    <Modal
        id="quoteGeneratorModal"
        aria-labelledby="spring-modal-quotegeneratormodal"
        aria-describedby="spring-modal-opens-and-closes-quote-generator"
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    
    >
        <Fade in={open}>
            <h1>hello world</h1>
        </Fade>
    </Modal>
  )
}

export default QuoteGeneratorModal