import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DropDown({ setQualification }: any) {
  return (
    <Select onValueChange={(value) => setQualification(value)}>
      <SelectTrigger className="bg-black z-50 focus:outline-none outline-none">
        <SelectValue placeholder="Highest Qualification (optional)" />
      </SelectTrigger>
      <SelectContent className="bg-black outline-none">
        <SelectGroup className="bg-black  text-white">
          <SelectItem value="Student">Student</SelectItem>
          <SelectItem value="Fresher">Fresher</SelectItem>
          <SelectItem value="Working">Working</SelectItem>
          <SelectItem value="Unemployed">Unemployed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
