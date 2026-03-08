"use client"

import { QrCode, Droplets, Sun, MessageCircle, Sparkles, Leaf, Shield, Bell } from "lucide-react"
import { AIParticles } from "./ai-mascot"

const features = [
    {
        icon: QrCode,
        title: "Scan to Add Plants",
        description: "Simply scan your plant's QR code or take a photo. Our AI instantly identifies your plant and creates a personalized care profile."
    },
    {
        icon: Droplets,
        title: "Smart Water Reminders",
        description: "Never over or under-water again. AI-powered reminders adapt to your local weather and your plant's specific needs."
    },
    {
        icon: Sun,
        title: "Sunlight Tracking",
        description: "Monitor light levels throughout the day. Get suggestions for optimal plant placement in your home."
    },
    {
        icon: MessageCircle,
        title: "Boyee AI Doctor",
        description: "Instant diagnosis for plant problems. Just snap a photo and get expert advice powered by advanced AI."
    }
]

export function FeaturesSection() {
    return (
        <section className="relative py-32 px-4 overflow-hidden bg-[#0a0f0a]">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-gray-800/10 to-background" />




            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-morph" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-morph" style={{ animationDelay: "4s" }} />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-xl border border-gray-700 mb-6 animate-glow-pulse">
                        <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-sm text-gray-300">Powerful Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                        Everything Your Plants Need
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto text-pretty">
                        Advanced AI technology meets simple, intuitive design.
                        Take the guesswork out of plant care.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Glow on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-green-500/5 opacity-0 group-hover:opacity-100 group-hover:animate-glow-pulse transition-opacity duration-300" />

                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-green-500" />
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: Leaf, value: "10K+", label: "Plants Identified" },
                        { icon: Bell, value: "50K+", label: "Reminders Sent" },
                        { icon: Shield, value: "99%", label: "Accuracy Rate" },
                        { icon: MessageCircle, value: "24/7", label: "AI Support" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-2xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 hover:border-green-500/30 transition-all animate-slide-up group"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center group-hover:animate-bounce-slow">
                                <stat.icon className="w-6 h-6 text-green-500" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
