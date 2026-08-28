import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-98 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0075ff] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: 'bg-[#0075ff] hover:bg-blue-600 text-white border border-transparent shadow-xs transition-all',
        destructive:
          'bg-destructive hover:bg-destructive/90 text-white border border-transparent shadow-xs transition-all',
        outline:
          'border border-border/80 bg-card text-foreground hover:bg-secondary hover:border-slate-400 dark:hover:border-slate-700 transition-all shadow-xs',
        secondary:
          'border border-border/70 bg-secondary text-foreground hover:bg-secondary/80 transition-all',
        ghost:
          'hover:bg-secondary text-foreground transition-all',
        link: 'text-[#0075ff] underline-offset-4 hover:underline lowercase font-normal',
      },
      size: {
        default: 'h-11 sm:h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold has-[>svg]:px-3.5 sm:has-[>svg]:px-4.5',
        sm: 'h-9 sm:h-10 rounded-xl gap-1.5 px-3.5 sm:px-4 text-xs font-bold has-[>svg]:px-2.5 sm:has-[>svg]:px-3',
        lg: 'h-12 sm:h-14 rounded-xl px-6 sm:px-8 text-xs sm:text-sm font-extrabold has-[>svg]:px-4 sm:has-[>svg]:px-5',
        icon: 'size-11 sm:size-12 rounded-xl',
        'icon-sm': 'size-9 sm:size-10 rounded-xl',
        'icon-lg': 'size-12 sm:size-14 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
