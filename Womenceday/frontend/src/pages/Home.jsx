import { useState } from "react";
import axios from "axios";
import { Sparkles, Copy, Check, Send, Heart, Star, Crown } from "lucide-react";

const SUPERPOWERS = [
    "#Fierce",
    "#Caring",
    "#Multitasker",
    "#BossLady",
    "#Fearless",
    "#Inspiring",
    "#Unstoppable",
    "#Compassionate",
];

const Home = () => {
    const [receiverName, setReceiverName] = useState("");
    const [senderName, setSenderName] = useState("");
    const [selectedPowers, setSelectedPowers] = useState([]);
    const [customMessage, setCustomMessage] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const togglePower = (power) => {
        if (selectedPowers.includes(power)) {
            setSelectedPowers(selectedPowers.filter((p) => p !== power));
        } else if (selectedPowers.length < 3) {
            setSelectedPowers([...selectedPowers, power]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!receiverName.trim() || !senderName.trim()) {
            setError("Please fill in both names.");
            return;
        }
        if (selectedPowers.length === 0) {
            setError("Please select at least one superpower.");
            return;
        }
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/wishes`, {
                senderName: senderName.trim(),
                receiverName: receiverName.trim(),
                superpowers: selectedPowers,
                customMessage: customMessage.trim(),
            });
            const wishId = res.data.id;
            setGeneratedLink(`${window.location.origin}/wish/${wishId}`);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* fallback */
            const ta = document.createElement("textarea");
            ta.value = generatedLink;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareWhatsApp = () => {
        const text = `🌸 Happy Women's Day, ${receiverName}! Here's a special wish for you: ${generatedLink}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank"
        );
    };

    const resetForm = () => {
        setReceiverName("");
        setSenderName("");
        setSelectedPowers([]);
        setCustomMessage("");
        setGeneratedLink("");
        setError("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-fuchsia-900 to-pink-900 relative overflow-hidden">
            {/* Decorative floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Crown className="w-8 h-8 text-amber-400 animate-bounce" />
                        <Sparkles className="w-6 h-6 text-pink-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-300 to-amber-300 bg-clip-text text-transparent mb-2">
                        Happy Women&apos;s Day
                    </h1>
                    <p className="text-pink-200/80 text-lg md:text-xl font-light tracking-wide">
                        Celebrate the superwoman in your life ✨
                    </p>
                </div>

                {/* Card */}
                <div className="w-full max-w-lg">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-purple-900/50 p-6 md:p-8">
                        {!generatedLink ? (
                            /* ——— FORM ——— */
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Receiver Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-pink-200 tracking-wide flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-pink-400" />
                                        Who is your Superwoman?
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Her name..."
                                        value={receiverName}
                                        onChange={(e) => setReceiverName(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400/60 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                                    />
                                </div>

                                {/* Sender Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-pink-200 tracking-wide flex items-center gap-2">
                                        <Star className="w-4 h-4 text-amber-400" />
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name..."
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                                    />
                                </div>

                                {/* Superpower Tags */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-pink-200 tracking-wide flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-purple-300" />
                                        Select her Superpowers
                                        <span className="text-xs font-normal text-white/40">
                                            (up to 3)
                                        </span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {SUPERPOWERS.map((power) => {
                                            const isSelected = selectedPowers.includes(power);
                                            const isDisabled =
                                                !isSelected && selectedPowers.length >= 3;
                                            return (
                                                <button
                                                    key={power}
                                                    type="button"
                                                    onClick={() => togglePower(power)}
                                                    disabled={isDisabled}
                                                    className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                            ${isSelected
                                                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg shadow-pink-500/30 scale-105"
                                                            : isDisabled
                                                                ? "bg-white/3 text-white/20 border-white/5 cursor-not-allowed"
                                                                : "bg-white/5 text-pink-200 border-white/15 hover:bg-white/15 hover:border-pink-400/40 hover:scale-105 cursor-pointer"
                                                        }
                          `}
                                                >
                                                    {power}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {selectedPowers.length > 0 && (
                                        <p className="text-xs text-white/40">
                                            {selectedPowers.length}/3 selected
                                        </p>
                                    )}
                                </div>

                                {/* Custom Message */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-pink-200 tracking-wide flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-purple-300" />
                                        Add a personal message <span className="text-xs font-normal text-white/40">(Optional)</span>
                                    </label>
                                    <textarea
                                        placeholder="Write something special..."
                                        value={customMessage}
                                        onChange={(e) => setCustomMessage(e.target.value)}
                                        maxLength={150}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-transparent transition-all duration-300 hover:bg-white/10 resize-none"
                                    />
                                    <p className="text-right text-xs text-white/40">
                                        {customMessage.length}/150
                                    </p>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Magic Link
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            /* ——— SUCCESS / SHARE ——— */
                            <div className="text-center space-y-6">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        Your wish is ready! 🎉
                                    </h2>
                                    <p className="text-pink-200/70 text-sm">
                                        Share this magic link with{" "}
                                        <span className="font-semibold text-pink-300">
                                            {receiverName}
                                        </span>
                                    </p>
                                </div>

                                {/* Generated Link */}
                                <div className="bg-black/20 border border-white/10 rounded-xl p-4 break-all text-pink-200 text-sm font-mono">
                                    {generatedLink}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={copyLink}
                                        className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-400" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy Link
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={shareWhatsApp}
                                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        Share on WhatsApp
                                    </button>
                                </div>

                                {/* Create Another */}
                                <button
                                    onClick={resetForm}
                                    className="text-pink-300/70 text-sm hover:text-pink-200 transition-colors underline underline-offset-4 cursor-pointer"
                                >
                                    Create another wish →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-white/20 text-xs mt-6">
                        Made with 💜 to celebrate extraordinary women everywhere
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
