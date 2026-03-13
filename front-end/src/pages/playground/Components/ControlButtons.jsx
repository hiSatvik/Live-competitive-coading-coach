export default function ControlButtons() {
    return (
        <div className="flex flex-row gap-3">
            <button className="flex items-center gap-2 text-lg px-8 py-2.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl text-white font-bold font-['Quicksand']
                               transition-all duration-300 ease-out
                               hover:from-emerald-500 hover:to-emerald-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/40
                               active:scale-95 active:translate-y-0 border border-emerald-400/50">
                
                {/* Jennie added a super cute little Play icon! */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
                
                Run Code
            </button>
        </div>
    );
}