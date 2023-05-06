import {ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren} from "react";
import Link from "next/link";
import {twMerge} from "tailwind-merge";

const sharedCss = "font-semibold px-7 py-2 bg-white/5 hover:bg-white/10 transition duration-100 rounded-xl";
export function LightButton(props: PropsWithChildren<{className?: string, active?: boolean, onClick?: () => void}>) {
    return (
        <button onClick={props.onClick} className={twMerge(sharedCss, props.className, props.active && "bg-white/10")}>
            {props.children}
        </button>
    )
}

export function LightLinkButton(props: PropsWithChildren<{className?: string, href: string, active?: boolean}>) {
    return (
        <Link href={props.href} className={twMerge(sharedCss, props.className, props.active && "bg-white/10")}>
            {props.children}
        </Link>
    )
}