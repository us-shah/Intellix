import Link from "next/link";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  { variants: { variant: {
    default: "bg-blue-700 text-white hover:bg-blue-800",
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    outline: "border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    ghost: "text-slate-800 hover:bg-slate-100",
    destructive: "bg-red-50 text-red-700 hover:bg-red-100",
    link: "text-blue-700 underline-offset-4 hover:underline",
  }, size: { default:"h-10 gap-2 px-4", xs:"h-7 px-2 text-xs", sm:"h-8 px-3", lg:"h-11 px-5", icon:"size-9", "icon-xs":"size-6", "icon-sm":"size-8", "icon-lg":"size-10" } }, defaultVariants:{variant:"default",size:"default"} }
);

type BaseProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;
type ButtonProps = BaseProps & { href?: string };
function Button({ className, variant="default", size="default", href, children, ...props }: ButtonProps) {
 const cls=cn(buttonVariants({variant,size,className}));
 if(href) return <Link href={href} className={cls}>{children}</Link>;
 return <ButtonPrimitive data-slot="button" className={cls} {...props}>{children}</ButtonPrimitive>;
}
export { Button, buttonVariants };
export type { ButtonProps };
