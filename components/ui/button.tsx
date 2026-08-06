import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-bold uppercase tracking-wider transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: 'border border-slate-900/80 dark:border-slate-700 bg-primary text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-primary/95',
        destructive:
          'border border-slate-900/80 dark:border-slate-700 bg-destructive text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.85)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-destructive/90',
        outline:
          'border border-slate-300 dark:border-slate-800 bg-card text-foreground hover:bg-secondary/70 hover:border-slate-400 dark:hover:border-slate-700 transition-colors',
        secondary:
          'border border-slate-200 dark:border-slate-800 bg-secondary text-foreground hover:bg-secondary/80 transition-colors',
        ghost:
          'hover:bg-secondary text-foreground transition-colors',
        link: 'text-primary underline-offset-4 hover:underline lowercase font-normal',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-none gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-none px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
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
