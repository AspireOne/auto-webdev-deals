import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import {LightButton} from "~/components/LightButton";
import React, {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";
import {TfiPlus} from "react-icons/tfi";
import {Modal, useMantineTheme} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {FcGoogle} from "react-icons/Fc";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data, status } = useSession();

  return (
    <>
        <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Automatic web dev" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="mx-4">
            <Tabs/>
        </main>
        {status === "unauthenticated" && <SignInModal/>}
    </>
  );
};

function SignInModal() {
    const theme = useMantineTheme();
    return (
        <Modal opened={true} onClose={() => {}} withCloseButton={false} centered
               overlayProps={{
                   color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                   opacity: 0.55,
                   blur: 3,
               }}
        >
            <p className={"text-center text-lg"}>Please log in before continuing</p>
            <button onClick={() => signIn("google")}
                    className={"px-3 py-2 bg-transparent rounded-md border border-zinc-500 " +
                        "mx-auto flex flex-row gap-4 items-center my-6"}>
                <FcGoogle size={20}/>
                <p className={"font-bold text-sm"}>Sign in with Google</p>
            </button>
        </Modal>
    )
}
function Tabs() {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    return (
        <div className={"flex shadow flex-row gap-3 items-center h-20 bg-zinc-800 rounded-lg p-3"}>
            <Tab selected={true}>
                <p>Pokus 1</p>
                <p className={"text-zinc-400 font-normal text-sm"}>0/12</p>
            </Tab>
            <Tab>
                <p>Pokus 1</p>
                <p className={"text-zinc-400 font-normal text-sm"}>0/12</p>
            </Tab>

            <Modal opened={opened} onClose={close} title="Create a new session" centered
                   overlayProps={{
                       color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                       opacity: 0.55,
                       blur: 3,
                   }}
            >
                {/* Modal content */}
            </Modal>

            <LightButton onClick={open} className={"ml-auto px-2 mr-4 bg-transparent"}>
                <TfiPlus className={""} size={23}/>
            </LightButton>
        </div>
    )
}

function Tab(props: PropsWithChildren<{className?: string, selected?: boolean}>) {
    return (
        <LightButton
            active={props.selected}
            className={twMerge("pt-3 overflow-ellipsis border border-zinc-700 " +
                "text-left px-2 h-full shadow rounded-2xl w-40", props.className)}>
            {props.children}
        </LightButton>
    )
}

export default Home;
