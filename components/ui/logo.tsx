"use client"

import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {
  const {theme} = useTheme()
  return <Image height={130} width={130} alt="logo" src={'/logo-dark.png'} />;
};


export const FormLogo = () => {
  const {theme} = useTheme()
  return <Image className="z-50" height={180} width={180} alt="logo" src={ '/logo-dark.png'} />;
};