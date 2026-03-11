export default function UserPanel() {
    return (
        <div className="flex flex-row gap-2 items-center">
            <div>
                <p className="text-2xl font-bold font-['Quicksand'] text-gray-800">
                    Hello Satvik! 👋
                </p>
                <p className="text-sm text-gray-400 font-['Quicksand'] mt-1">
                    Ready to write some code?
                </p>
            </div>
            
            <a 
                href="#" 
                className="text-xl px-6 py-3 bg-rose-300 rounded-2xl text-white font-bold font-['Quicksand']
                           transition-all duration-300 ease-in-out
                           hover:bg-rose-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-200/60
                           active:scale-95 active:translate-y-0"
            >
                Dashboard
            </a>
        </div>
    )
}