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
        <SelectValue placeholder="What represent you the best?" />
      </SelectTrigger>
      <SelectContent className="bg-black outline-none">
        <SelectGroup className="bg-black  text-white">
          <SelectItem value="Student">Student</SelectItem>
          <SelectItem value="Fresher">Fresher</SelectItem>
          <SelectItem value="Working">Working</SelectItem>
          <SelectItem value="Unemployed">Career Gap</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
