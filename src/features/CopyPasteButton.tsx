"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useCopyToClipboard } from "usehooks-ts";
const CopyPasteButton = ({className,getTextContent}:{className?:string, getTextContent: () => string;}) => {
  const [copied, setCopied] = useState(false)
  const [copiedText, copy] = useCopyToClipboard();
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <motion.button
    
    
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      onClick={() => {
        setCopied(!copied)
        copy(getTextContent())
      }}
     
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="checkmark"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Check className={className}  />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
              <Copy className={className} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default CopyPasteButton