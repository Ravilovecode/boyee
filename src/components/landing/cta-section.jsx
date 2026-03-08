"use client"

import { Button } from "../ui/button"
import { Apple, Smartphone, Star, ArrowRight } from "lucide-react"
import { AIMascot, AIParticles, FloatingLeaves } from "./ai-mascot"

export function CTASection() {
    return (
        <section className="relative py-32 px-4 overflow-hidden mt-20 bg-[#0a0f0a]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-background to-background" />

            {/* AI Particles */}
            <AIParticles count={20} />
            <FloatingLeaves />

            {/* Floating elements */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-morph" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: "4s" }} />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* AI Mascot */}
                <div className="flex justify-center mb-8">
                    <AIMascot variant="waving" size="lg" />
                </div>

                {/* Rating */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-xl border border-gray-700 mb-8 animate-glow-pulse">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                    <span className="text-sm text-gray-300">4.9 Rating • 50K+ Reviews</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
                    Start Growing <span className="text-green-500">Smarter</span> Today
                </h2>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-pretty">
                    Join thousands of plant lovers who have transformed their plant care routine
                    with AI-powered insights and personalized recommendations.
                </p>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Button size="lg" className="gap-3 px-8 py-6 text-lg rounded-2xl bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-transform w-full sm:w-auto">
                        <Apple className="w-6 h-6" />
                        <div className="text-left">
                            <div className="text-xs opacity-80">Download on the</div>
                            <div className="font-semibold">App Store</div>
                        </div>
                    </Button>

                    <Button size="lg" className="gap-3 px-8 py-6 text-lg rounded-2xl bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-transform w-full sm:w-auto">
                        <Smartphone className="w-6 h-6" />
                        <div className="text-left">
                            <div className="text-xs opacity-80">Get it on</div>
                            <div className="font-semibold">Google Play</div>
                        </div>
                    </Button>
                </div>

                {/* Alternative CTA */}
                <div className="inline-flex items-center gap-3 text-gray-400">
                    <span>Or try the web version</span>
                    <Button variant="link" className="gap-1 text-green-500 p-0 h-auto">
                        Get Started Free
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
