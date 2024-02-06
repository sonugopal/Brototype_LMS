import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectOptions({ value, onChange }: any) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Leads" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="Hot">Hot</SelectItem>
                    <SelectItem value="Cold">Cold</SelectItem>
                    <SelectItem value="Warm">Warm</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
