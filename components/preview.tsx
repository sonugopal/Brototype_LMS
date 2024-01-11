import { removeHtmlTags } from "@/lib/tagremover";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const memoizedValue = useMemo(() => removeHtmlTags(value), [value]);

  return (
    <div className="my-2 mx-2">
      <p>{memoizedValue}</p>
    </div>
  );
};
