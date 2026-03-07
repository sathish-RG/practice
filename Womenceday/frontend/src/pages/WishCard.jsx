import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import Tilt from "react-parallax-tilt";
import {
    Crown,
    Sparkles,
    Heart,
    ArrowRight,
    Flower2,
} from "lucide-react";

const WishCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [wish, setWish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // New state for click-to-reveal mechanic
    const [isRevealed, setIsRevealed] = useState(false);
    const [burstId, setBurstId] = useState(0);

    const triggerConfetti = () => setBurstId((prev) => prev + 1);

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchWish = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
                const res = await axios.get(`${API_URL}/api/wishes/${id}`);
                setWish(res.data);
            } catch {
                setError("This wish could not be found. It may have been removed.");
            } finally {
                setLoading(false);
            }
        };
        fetchWish();
    }, [id]);

    /* ——— Loading State ——— */
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-fuchsia-900 to-pink-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative mx-auto w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-pink-500/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-400 animate-spin" />
                    </div>
                    <p className="text-pink-200/70 text-lg font-light animate-pulse">
                        Unwrapping your surprise...
                    </p>
                </div>
            </div>
        );
    }

    /* ——— Error State ——— */
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-fuchsia-900 to-pink-900 flex items-center justify-center px-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center max-w-md">
                    <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-7 h-7 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Oops!</h2>
                    <p className="text-pink-200/70 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                        Create Your Own Wish
                    </button>
                </div>
            </div>
        );
    }

    /* ——— Wish Card Main View ——— */
    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-purple-950 via-fuchsia-900 to-pink-900 relative overflow-hidden pb-10">
            {/* Confetti */}
            {burstId > 0 && (
                <Confetti
                    key={burstId}
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={600}
                    recycle={false}
                    colors={[
                        "#ec4899",
                        "#a855f7",
                        "#f59e0b",
                        "#f472b6",
                        "#c084fc",
                        "#fbbf24",
                        "#e879f9",
                        "#fcd34d",
                    ]}
                    gravity={0.2}
                />
            )}

            {/* Decorative blurs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Main content Area */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16 pb-28">
                {!isRevealed ? (
                    /* Initial View: Click to Reveal */
                    <div className="text-center flex flex-col items-center justify-center max-w-lg mx-auto space-y-8 animate-in fade-in duration-1000">
                        <h2 className="text-3xl md:text-4xl font-['Pacifico'] text-pink-200 mb-6 leading-relaxed px-4 drop-shadow-lg">
                            {wish.senderName} has sent you a magical wish!
                        </h2>

                        <button
                            onClick={() => {
                                setIsRevealed(true);
                                triggerConfetti();
                            }}
                            className="group relative flex items-center justify-center focus:outline-none transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                        >
                            {/* Outer pulsing glow */}
                            <div className="absolute inset-0 bg-pink-500/40 rounded-full blur-2xl animate-pulse group-hover:bg-pink-400/60 transition-colors" />
                            {/* Inner circle with Heart */}
                            <div className="relative w-36 h-36 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.5)] border-4 border-white/20">
                                <Heart className="w-16 h-16 text-white animate-pulse" fill="currentColor" />
                            </div>
                        </button>

                        <p className="text-pink-100/90 text-lg font-light tracking-wide animate-pulse mt-8">
                            Tap to open the magic ✨
                        </p>
                    </div>
                ) : (
                    /* Revealed Card Content */
                    <div
                        className="w-full max-w-lg animate-in fade-in zoom-in-95 duration-700 cursor-pointer"
                        onClick={triggerConfetti}
                    >
                        {/* Top crown icon */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/30">
                                    <Crown className="w-10 h-10 text-white" />
                                </div>
                                <Sparkles className="w-5 h-5 text-pink-300 absolute -top-1 -right-1 animate-pulse" />
                                <Heart className="w-4 h-4 text-pink-400 absolute -bottom-1 -left-1 animate-bounce" />
                            </div>
                        </div>

                        <Tilt glareEnable={true} glareMaxOpacity={0.4} scale={1.05} transitionSpeed={2500}>
                            {/* Card */}
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-purple-900/50 overflow-hidden">
                                {/* Gold accent bar */}
                                <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

                                <div className="p-6 md:p-10 text-center space-y-6">
                                    {/* Greeting */}
                                    <div className="space-y-2">
                                        <p className="text-pink-300/80 text-sm uppercase tracking-[0.25em] font-medium">
                                            Happy Women&apos;s Day
                                        </p>
                                        <h1 className="text-3xl md:text-4xl font-['Pacifico'] bg-gradient-to-r from-pink-300 via-purple-300 to-amber-300 bg-clip-text text-transparent leading-tight py-1">
                                            Dear {wish.receiverName},
                                        </h1>
                                    </div>

                                    {/* Divider */}
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50" />
                                        <Flower2 className="w-5 h-5 text-pink-400/60" />
                                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50" />
                                    </div>

                                    {/* Message */}
                                    <p className="text-pink-100/85 text-base md:text-lg leading-relaxed font-light">
                                        You are a remarkable woman who inspires everyone around you.
                                        Your strength, grace, and warmth make the world a better
                                        place. Today and every day, you deserve to be celebrated for
                                        the incredible person you are. 💜
                                    </p>

                                    {/* Custom Message (Optional) */}
                                    {wish.customMessage && (
                                        <div className="py-2">
                                            <div className="relative inline-block px-8 py-4 before:content-['“'] before:absolute before:text-4xl before:text-pink-400/20 before:top-0 before:left-0 after:content-['”'] after:absolute after:text-4xl after:text-pink-400/20 after:bottom-0 after:right-0">
                                                <p className="text-pink-200/90 text-xl font-medium italic tracking-wide leading-relaxed font-serif">
                                                    {wish.customMessage}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Superpowers */}
                                    {wish.superpowers && wish.superpowers.length > 0 && (
                                        <div className="space-y-3 pt-2">
                                            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70 font-semibold">
                                                Your Superpowers
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {wish.superpowers.map((power, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-5 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-full text-sm font-semibold text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.3)] animate-pulse backdrop-blur-sm"
                                                    >
                                                        <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-amber-400" />
                                                        {power}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="flex items-center justify-center gap-3 pt-2">
                                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/15" />
                                        <Heart className="w-4 h-4 text-pink-400/40" />
                                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/15" />
                                    </div>

                                    {/* Sender */}
                                    <div className="space-y-1">
                                        <p className="text-white/40 text-sm font-light">
                                            With love & admiration,
                                        </p>
                                        <p className="text-xl font-bold bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">
                                            — {wish.senderName}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom gradient bar */}
                                <div className="h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400" />
                            </div>
                        </Tilt>

                        {/* Footer text */}
                        <p className="text-center text-white/15 text-xs mt-6">
                            Made with 💜 to celebrate extraordinary women everywhere
                        </p>
                    </div>
                )}
            </div>

            {/* Sticky "Create your own" button */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="bg-gradient-to-t from-purple-950 via-purple-950/95 to-transparent pt-8 pb-5 px-4">
                    <div className="max-w-lg mx-auto">
                        <button
                            onClick={() => navigate("/")}
                            className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Sparkles className="w-5 h-5" />
                            Create Your Own Wish
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishCard;
