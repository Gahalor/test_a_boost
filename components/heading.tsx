import { LucideIcon } from "lucide-react";
//import { Icon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor
}: HeadingProps) => {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-x-3 mb-3 px-4 lg:px-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <Icon className={cn("w-4 h-4", iconColor)} />
        </div>
        <div>
          <h2 className="text-md font-semibold">{title}</h2>
          {/* <p className="text-sm text-muted-foreground">
            {description}
          </p> */}
        </div>
      </div>
        <div className="bg-slate-100 h-[2px] w-full"/>
    </div>
  );
};