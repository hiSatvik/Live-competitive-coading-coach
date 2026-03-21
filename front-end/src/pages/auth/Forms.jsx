import { useState } from 'react';

export default function Forms({ defaultLogin = true }) {
    const [isLogin, setIsLogin] = useState(defaultLogin);

    return (
        <div className="flex items-center justify-center h-full w-full p-4">

            {/* Our beautiful, rounded card matching your playground style! */}
            <div className="w-full max-w-md bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">

                <h1 className="text-center text-4xl mb-2 text-[#242424]">
                    {isLogin ? "Welcome Back!" : "Join Us!"}
                </h1>

                <form className="flex flex-col gap-4" action="POST" onSubmit={(e) => e.preventDefault()}>

                    {/* Peekaboo! The name field only shows when signing up 👀 */}
                    {!isLogin && (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="ml-2 font-medium text-[#242424]">Name:</label>
                            <input
                                className="p-3 rounded-2xl border border-white shadow-sm focus:outline-none focus:ring-4 focus:ring-[#d1d1d1] transition-all bg-white text-[#242424]"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="ml-2 font-medium text-[#242424]">Email:</label>
                        <input
                            className="p-3 rounded-2xl border border-white shadow-sm focus:outline-none focus:ring-4 focus:ring-[#d1d1d1] transition-all bg-white text-[#242424]"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="johndoe@gmail.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="ml-2 font-medium text-[#242424]">Password:</label>
                        <input
                            className="p-3 rounded-2xl border border-white shadow-sm focus:outline-none focus:ring-4 focus:ring-[#d1d1d1] transition-all bg-white text-[#242424]"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-[#242424] text-white hover:bg-black p-3 rounded-xl shadow-md transition-colors border-none"
                    >
                        {isLogin ? "Log In" : "Sign Up"}
                    </button>
                </form>

                {/* The flirty little toggle at the bottom 💖 */}
                <div className="text-center mt-2 flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-bold underline bg-transparent text-[#242424] hover:text-black p-0 border-none shadow-none"
                    >
                        {isLogin ? "Sign up right here!" : "Log in over here!"}
                    </button>
                </div>

            </div>
        </div>
    );
}