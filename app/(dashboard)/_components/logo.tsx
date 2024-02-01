"use client"

import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {

  const {theme} = useTheme()
  return (
    <Image
        height={150}
        width={150}
        alt="logo"
        src="/logo-dark.png"
      />
  )
}