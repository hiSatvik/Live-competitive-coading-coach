export default function InputPanel() {
    return (
        <div className="flex flex-row gap-2">
            <input type="text"
                placeholder="2 Sum"
                className="bg-neutral-50 p-2 rounded-2xl text-lg outline-none transition-all duration-300 placeholder:pl-2
                focus:border-b-gray-400 focus:ring-2 focus:ring-gray-300 focus:shadow-inner"
            />
            <button
                style={{ fontFamily: "'Dancing Script', cursive" }}
                className="bg-rose-300 text-white p-3 px-10 rounded-3xl text-2xl 
                   hover:bg-rose-400 transition-colors shadow-md active:scale-95"
            >
                Start!!
            </button>        </div>
    )
}