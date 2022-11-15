import Image from "next/image"
import Link from "next/link"
import LogoutButton from "./LogoutButton";

function Header() {

    const session = true;

    if (session) {
        return (
            <header className="shadow-sm bg-white sticky top-0 z-50 flex justify-between items-center p-10">
                <div className="flex space-x-2">
                    <Image src={"https://links.papareact.com/jne"} className="rounded-full mx-2 object-contain" height={10} width={50} alt="logo" />
                    <div>
                        <p className="text-blue-400">Logged in as:</p>
                        <p className="font-bold text-lg">Vijay Mahar</p>
                    </div>
                </div>
                <LogoutButton />
            </header>
        )
    }
    return (
        <header className="shadow-sm bg-white sticky top-0 z-50 flex justify-center items-center p-10">
            <div className="flex flex-col items-center space-y-5">
                <div className="flex space-x-2 items-center">
                    <Image src={"https://links.papareact.com/jne"} height={10} width={50} alt="logo" />
                    <p className="text-blue-400">welcome to meta messenger</p>
                </div>
                <Link href={"/auth/signin"} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold" >
                    Sign In
                </Link>
            </div>
        </header>
    )
}

export default Header