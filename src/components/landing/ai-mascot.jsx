"use client"

import { useEffect, useState } from "react"

export function AIMascot({ variant = "floating", size = "md", className = "" }) {
    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32"
    }

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* Main body */}
            <div className={`
        absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500
        ${variant === "floating" ? "animate-bounce-slow" : ""}
        ${variant === "thinking" ? "animate-pulse" : ""}
        shadow-lg shadow-emerald-500/30
      `}>
                {/* Face */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Eyes */}
                    <div className="flex gap-2 -mt-1">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-background animate-blink" />
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-background animate-blink" />
                    </div>
                </div>

                {/* Smile */}
                <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-4 h-2 md:w-6 md:h-3 border-b-2 border-background rounded-b-full" />

                {/* Leaf antenna */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <svg className="w-4 h-6 md:w-6 md:h-8 text-emerald-300 animate-wiggle" viewBox="0 0 24 32" fill="currentColor">
                        <path d="M12 32V16C12 8 4 4 4 4C4 4 8 8 8 16C8 16 12 12 12 8C12 12 16 16 16 16C16 8 20 4 20 4C20 4 12 8 12 16V32Z" />
                    </svg>
                </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl animate-pulse" />

            {/* Sparkle particles */}
            <SparkleParticles />
        </div>
    )
}

function SparkleParticles() {
    return (
        <>
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-200 rounded-full animate-sparkle"
                    style={{
                        top: `${20 + i * 25}%`,
                        left: `${-10 + i * 50}%`,
                        animationDelay: `${i * 0.5}s`
                    }}
                />
            ))}
        </>
    )
}

export function AIParticles({ count = 20 }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        setParticles(
            [...Array(count)].map(() => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                delay: Math.random() * 5
            }))
        )
    }, [count])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-emerald-400/40 animate-float"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                    }}
                />
            ))}
        </div>
    )
}

export function AIBrain({ className = "" }) {
    return (
        <div className={`relative ${className}`}>
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Neural network nodes */}
                {[
                    { cx: 20, cy: 30 }, { cx: 50, cy: 20 }, { cx: 80, cy: 30 },
                    { cx: 15, cy: 50 }, { cx: 50, cy: 50 }, { cx: 85, cy: 50 },
                    { cx: 20, cy: 70 }, { cx: 50, cy: 80 }, { cx: 80, cy: 70 }
                ].map((node, i) => (
                    <g key={i}>
                        <circle
                            cx={node.cx}
                            cy={node.cy}
                            r="6"
                            className="fill-emerald-400/60 animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                        <circle
                            cx={node.cx}
                            cy={node.cy}
                            r="10"
                            className="fill-emerald-400/20 animate-ping"
                            style={{ animationDelay: `${i * 0.2}s`, animationDuration: "2s" }}
                        />
                    </g>
                ))}

                {/* Connections */}
                {[
                    "M20,30 Q35,40 50,50", "M50,20 Q50,35 50,50", "M80,30 Q65,40 50,50",
                    "M15,50 Q32,50 50,50", "M85,50 Q67,50 50,50",
                    "M20,70 Q35,60 50,50", "M50,80 Q50,65 50,50", "M80,70 Q65,60 50,50"
                ].map((d, i) => (
                    <path
                        key={i}
                        d={d}
                        className="stroke-emerald-400/40 fill-none stroke-1 animate-draw"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </svg>
        </div>
    )
}

export function FloatingLeaves() {
    const leafPaths = [
        "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.97C7.14 19.08 8.08 18.5 9.1 18.5C10.12 18.5 11.06 19.08 11.54 19.97L12.49 22L14.38 21.34C12.3 16.17 10 10 17 8Z",
    ]

    const [leaves, setLeaves] = useState([])

    useEffect(() => {
        setLeaves(
            [...Array(12)].map(() => ({
                x: Math.random() * 100,
                delay: Math.random() * 15,
                duration: 12 + Math.random() * 14,
                size: 14 + Math.random() * 20,
                opacity: 0.15 + Math.random() * 0.3,
                pathIndex: Math.floor(Math.random() * leafPaths.length),
                spinDuration: 6 + Math.random() * 8
            }))
        )
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {leaves.map((leaf, i) => (
                <div
                    key={i}
                    className="absolute animate-fall"
                    style={{
                        left: `${leaf.x}%`,
                        animationDelay: `${leaf.delay}s`,
                        animationDuration: `${leaf.duration}s`
                    }}
                >
                    <svg
                        className="text-emerald-400 animate-spin-slow"
                        style={{
                            width: leaf.size,
                            height: leaf.size,
                            opacity: leaf.opacity,
                            animationDuration: `${leaf.spinDuration}s`
                        }}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d={leafPaths[leaf.pathIndex]} />
                    </svg>
                </div>
            ))}
        </div>
    )
}
