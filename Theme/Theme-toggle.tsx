"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
export const ThemeToggle = () => {
    const {setTheme,theme} = useTheme()
  return (
    <Button
    className='px-2 py-2 w-10 h-10'
    variant={"ghost"}
 //    size={"sm"}
    onClick={()=>{
     setTheme(theme === "light" ? "dark" : "light")
    }}
    >
 <SunIcon 
     size={40}
     className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
 />
 <MoonIcon 
     size={20}
     className='absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 '
 />
 <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}

