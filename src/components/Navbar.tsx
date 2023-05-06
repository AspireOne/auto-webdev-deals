import {LightButton, LightLinkButton} from "~/components/LightButton";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {PropsWithChildren, useEffect, useRef, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {BiLogOut} from "react-icons/Bi";

export default function Navbar() {
    return (
        <div className={"flex flex-row items-center px-4 h-20"}>
            <p className={"mr-6 font-bold text-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"}>Auto Web Dev</p>
            <div className={"space-x-3"}>
                <NavButton path={"/"}>
                    Projects
                </NavButton>
            </div>
            <UserButton/>
        </div>
    )
}

function UserButton() {
    const { data } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            // @ts-ignore
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [containerRef, setShowDropdown]);

    return (
        <div className={"relative ml-auto"} ref={containerRef}>
            <LightButton className="flex flex-row items-center" onClick={toggleDropdown}>
                {data?.user?.image ? (
                    <img
                        className="w-6 h-6 rounded-full"
                        src={data?.user?.image!}
                        alt="avatar"
                    />
                ) : (
                    <Skeleton className="w-6 h-6 rounded-full" />
                )}
                <p className="ml-2 hidden sm:block">{data?.user?.name}</p>
            </LightButton>
            {showDropdown && <DropDown />}
        </div>
    );
}

function DropDown() {
    return (
        <div className="absolute mt-2 w-40 rounded-lg shadow-lg bg-zinc-800">
            <div className="py-1 px-1">
                <LightButton
                    onClick={async () => await signOut()}
                    className="w-full text-left px-4 py-2 text-sm rounded-lg bg-transparent"
                >
                    <div className={"flex flex-row gap-4"}>
                        <BiLogOut size={20}></BiLogOut>
                        Sign Out
                    </div>
                </LightButton>
            </div>
        </div>
    );
}

function NavButton(props: PropsWithChildren<{path: string}>) {
    const router = useRouter();

    return (
        <LightLinkButton href={props.path} active={router.pathname === props.path}>
            {props.children}
        </LightLinkButton>
    )
}
