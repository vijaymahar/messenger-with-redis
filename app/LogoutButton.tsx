'use client';

function LogoutButton() {
    return (
        <button onClick={() => console.log("heyyyy")} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold" >
            Sign Out
        </button>
    )
}

export default LogoutButton