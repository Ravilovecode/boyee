"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { ArrowRight, Leaf, Sparkles } from "lucide-react"
import { AIMascot, AIParticles, FloatingLeaves } from "./ai-mascot"

export function HeroSection() {
    const [showVideo, setShowVideo] = useState(false)

    const handleOpenVideo = () => {
        console.log('>>> STEP 1: See How It Works clicked!')
        setShowVideo(true)
        console.log('>>> STEP 2: setShowVideo(true) called')
    }

    const handleCloseVideo = () => {
        console.log('>>> Closing video modal')
        setShowVideo(false)
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 bg-[#0a0f0a]">
            {/* Animated floating leaves */}
            <FloatingLeaves />




            {/* Floating orbs with morph animation */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-morph" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: "4s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10 max-w-7xl mx-auto mt-20">
                <div className="text-center mb-16">
                    {/* AI Mascot */}
                    <div className="flex justify-center mb-6">
                        <AIMascot variant="floating" size="md" />
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-xl border border-gray-700 mb-8 animate-glow-pulse">
                        <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-sm text-gray-300">AI-Powered Plant Care</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
                        Grow Plants Smarter
                        <br />
                        <span className="text-green-500">with AI</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-pretty">
                        Your intelligent plant companion. Get personalized care reminders,
                        instant disease detection, and expert advice powered by advanced AI.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="gap-2 px-8 py-6 text-lg rounded-full bg-green-600 text-white hover:bg-green-700 animate-glow-pulse">
                            <Leaf className="w-5 h-5" />
                            Download Free
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 px-8 py-6 text-lg rounded-full border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700"
                            onClick={handleOpenVideo}
                        >
                            See How It Works
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* App Screenshot Display */}
                <div className="relative flex items-center justify-center mt-12">
                    {/* Main screenshot container */}
                    <div className="relative">
                        {/* Glow effect behind image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-teal-500/30 to-green-500/30 rounded-3xl blur-3xl scale-110" />

                        {/* App Screenshot */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-15bA9wyx3cNcBsXZwlIHnlTbRuRHCK.png"
                                alt="Boyee AI App - Smart plant care with AI-powered features including task management, weather tracking, and plant identification"
                                className="w-full max-w-4xl h-auto"
                            />

                            {/* Overlay gradient for blending */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating AI indicators */}
                        <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8">
                            <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 border border-gray-700 shadow-xl animate-bounce-slow">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm font-medium text-white">AI Analyzing</p>
                                        <p className="text-xs text-gray-400">Snake Plant</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6">
                            <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-3 md:p-4 border border-gray-700 shadow-xl animate-bounce-slow" style={{ animationDelay: "1s" }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                                        <Leaf className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm font-medium text-white">8 Tasks Today</p>
                                        <p className="text-xs text-gray-400">Water & Misting</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Temperature badge */}
                        <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2">
                            <div className="bg-gradient-to-br from-emerald-400/90 to-teal-500/90 rounded-2xl p-3 md:p-4 shadow-xl animate-float">
                                <p className="text-2xl md:text-3xl font-bold text-gray-900">20°C</p>
                                <p className="text-xs text-gray-900/80">Sunny</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
                    {[
                        { value: "50K+", label: "Active Users" },
                        { value: "1M+", label: "Plants Identified" },
                        { value: "4.9", label: "App Rating" },
                        { value: "99%", label: "Accuracy" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            <p className="text-2xl md:text-3xl font-bold text-green-500">{stat.value}</p>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== VIDEO POPUP ===== */}
            {showVideo && (
                <div
                    onClick={handleCloseVideo}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.92)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            width: '70%',
                            maxWidth: '480px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: '#000',
                            boxShadow: '0 0 60px rgba(124, 179, 66, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* Close button */}
                        <div
                            onClick={handleCloseVideo}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.15)',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                fontSize: '20px',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            ✕
                        </div>

                        {/* Video player */}
                        <video
                            src="/boyee_intro.mp4"
                            controls
                            autoPlay
                            playsInline
                            onPlay={() => console.log('>>> STEP 3: Video is playing!')}
                            onError={(e) => console.error('>>> VIDEO ERROR:', e.target.error)}
                            style={{
                                width: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
