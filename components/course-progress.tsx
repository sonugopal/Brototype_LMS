import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success" | "inprogress",
  size?: "default" | "sm";
};

const colorByVariant = {
  default: "text-sky-700 ",
  success: "text-emerald-700",
  inprogress: "text-red-800",
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
}

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      {
        value ?
          <>
            <Progress
              className="h-1"
              value={value}
              variant={value == 100 ? 'default' : 'inprogress'}
            />
            <p className={cn(
              "font-medium text-sky-700 dark:text-slate-400",
              colorByVariant[variant || "default"],
              sizeByVariant[size || "default"],
            )}>
            </p>
          </> : null
      }
    </div>
  )
}