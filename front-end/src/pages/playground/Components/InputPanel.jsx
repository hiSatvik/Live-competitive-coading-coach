export default function InputPanel() {
    return (
        <div className="flex flex-row gap-2">
            <input type="text"
                placeholder="2 Sum"
                className="bg-neutral-50 p-2 rounded-2xl text-lg outline-none transition-all duration-300 placeholder:pl-2
                focus:border-b-gray-400 focus:ring-2 focus:ring-gray-300 focus:shadow-inner"
            />
            <button
                className="text-xl px-6 py-3 bg-rose-300 rounded-2xl text-white font-bold font-['Quicksand']
                           transition-all duration-300 ease-in-out
                           hover:bg-rose-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-200/60
                           active:scale-95 active:translate-y-0"
            >
                Start!!
            </button>        </div>
    )
}