import { cn } from "@/lib/utils"
//{}:{type for typescript}, ?: means optional, doesn't need to exist, if does, then here is the type
export const ScreenWrapper=(
    {className,
    children}
)=> {
    return <div className={cn(
        "h-full w-full max-w-screen-xl mx-auto px-2.5 md:px-20",
        className
        )}>
            {children}
    </div>
}