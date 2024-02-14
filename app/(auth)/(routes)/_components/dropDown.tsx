import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function DropDown({ setQualification }: any) {
    return (
        <Select onValueChange={(value) => setQualification(value)}>
            <SelectTrigger className="bg-black z-50 focus:outline-none outline-none">
                <SelectValue placeholder="Highest Qualification" />
            </SelectTrigger>
            <SelectContent className="bg-black outline-none">
                <SelectGroup className="bg-black  text-white">
                    <SelectItem value="+2">+2 Graduate</SelectItem>
                    <SelectItem value="degree">Degree Graduate</SelectItem>
                    <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
