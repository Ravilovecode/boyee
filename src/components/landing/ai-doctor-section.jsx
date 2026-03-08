"use client"

import { useState, useEffect } from "react"
import { Camera, Send, Sparkles, CheckCircle2, AlertTriangle, Leaf, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { AIMascot, AIBrain } from "./ai-mascot"

const diagnoses = [
    { issue: "Yellow leaves", solution: "Reduce watering frequency", severity: "moderate" },
    { issue: "Brown tips", solution: "Increase humidity levels", severity: "low" },
    { issue: "Wilting", solution: "Check for root rot", severity: "high" },
]

export function AIDoctorSection() {
    const [activeTab, setActiveTab] = useState("upload")
    const [isTyping, setIsTyping] = useState(false)
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        if (activeTab === "chat") {
            setIsTyping(true)
            const timer = setTimeout(() => setIsTyping(false), 2000)
            return () => clearTimeout(timer)
        }
        if (activeTab === "result") {
            setShowResult(false)
            const timer = setTimeout(() => setShowResult(true), 500)
            return () => clearTimeout(timer)
        }
    }, [activeTab])

    return (
        <section className="relative py-32 px-4 overflow-hidden bg-[#0a0f0a]">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-teal-500/10" />
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-morph" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-morph" style={{ animationDelay: "4s" }} />

            {/* Floating AI Brain decoration */}
            <div className="absolute top-20 right-10 w-32 h-32 opacity-20">
                <AIBrain />
            </div>
            <div className="absolute bottom-20 left-10 w-24 h-24 opacity-20">
                <AIBrain />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <AIMascot variant="thinking" size="sm" />
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-xl border border-gray-700">
                                <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                                <span className="text-sm text-gray-200">Boyee AI Doctor</span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                            Instant Plant <br />
                            <span className="text-green-500">Disease Detection</span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-8 text-pretty">
                            Take a photo of your plant&apos;s problem area. Our AI analyzes the image
                            in seconds and provides accurate diagnosis with treatment recommendations.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "Identifies 1000+ plant diseases",
                                "Treatment recommendations in seconds",
                                "Track recovery progress over time",
                                "Connect with plant experts if needed"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    </div>
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="gap-2 px-8 py-6 text-lg rounded-full bg-green-600 text-white hover:bg-green-700 animate-glow-pulse">
                            <Camera className="w-5 h-5" />
                            Try AI Diagnosis
                        </Button>
                    </div>

                    {/* Right - Interactive Demo */}
                    <div className="relative">
                        <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 shadow-2xl">
                            {/* Demo Header */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center animate-glow-pulse">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Boyee AI Doctor</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-xs text-green-500">Online &amp; Ready</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-2 mb-6">
                                {(["upload", "chat", "result"]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                                            ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                                            : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="min-h-[300px]">
                                {activeTab === "upload" && (
                                    <div className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-gray-600 rounded-2xl hover:border-green-500/50 transition-colors cursor-pointer group">
                                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Camera className="w-10 h-10 text-green-500" />
                                        </div>
                                        <p className="text-white font-medium mb-2">Upload Plant Photo</p>
                                        <p className="text-sm text-gray-400 text-center px-4">
                                            Take a clear photo of the affected area for best results
                                        </p>

                                        {/* Animated scanning lines */}
                                        <div className="absolute inset-4 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
                                        </div>
                                    </div>
                                )}

                                {activeTab === "chat" && (
                                    <div className="h-[300px] flex flex-col">
                                        <div className="flex-1 space-y-4 overflow-hidden">
                                            <div className="flex justify-end animate-slide-up">
                                                <div className="bg-green-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                                                    <p className="text-sm">Why are my plant leaves turning yellow?</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
                                                <div className="bg-gray-700/50 rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                                                    {isTyping ? (
                                                        <div className="flex items-center gap-2">
                                                            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                                                            <span className="text-sm text-gray-400">AI is thinking...</span>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-200">
                                                            Yellow leaves can indicate several issues. Could you share a photo
                                                            so I can provide a more accurate diagnosis?
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <div className="flex-1 bg-gray-700/30 rounded-full px-4 py-3 flex items-center">
                                                <span className="text-sm text-gray-400">Type your question...</span>
                                            </div>
                                            <button className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                                <Send className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "result" && (
                                    <div className="space-y-4">
                                        <div className={`flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl transition-all duration-500 ${showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                            <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
                                            <div>
                                                <p className="font-medium text-gray-200">Potential Issue Detected</p>
                                                <p className="text-sm text-gray-400">Nutrient deficiency identified</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {diagnoses.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center justify-between p-4 bg-gray-700/30 rounded-xl transition-all duration-500 ${showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                                    style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Leaf className="w-5 h-5 text-green-500" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-200">{d.issue}</p>
                                                            <p className="text-xs text-gray-400">{d.solution}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${d.severity === "low" ? "bg-green-500/20 text-green-500" :
                                                        d.severity === "moderate" ? "bg-yellow-500/20 text-yellow-500" :
                                                            "bg-red-500/20 text-red-500"
                                                        }`}>
                                                        {d.severity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
                    </div>
                </div>
            </div>
        </section>
    )
}
