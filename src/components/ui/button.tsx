import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: any) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700",
        className
      )}
      {...props}
    />
  );
}
