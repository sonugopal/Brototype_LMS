"use client"

import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {

  const {theme} = useTheme()
  return (
    <Image
        height={130}
        width={130}
        alt="logo"
        src={theme === 'light' ? "/logo.png" : "/logo-dark.png"}
      />
  )
}