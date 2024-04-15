import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  
import React from 'react'
import { IconType } from "react-icons"

interface ISheetComponent {
    children: React.ReactNode;
    title: string;
    desc: any;
}

const SheetComponent = ({children, title, desc}: ISheetComponent) => {
  return (
    <Sheet>
  <SheetTrigger>
    {
        children
    }
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>{title}</SheetTitle>
      <SheetDescription>
        {desc}
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

  )
}

export default SheetComponent