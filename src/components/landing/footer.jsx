import { Leaf } from "lucide-react"

const footerLinks = {
    Product: ["Features", "Pricing", "Download", "Updates"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Help Center", "Community", "Guides", "API"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
}

export function Footer() {
    return (
        <footer className="relative py-16 px-4 border-t border-gray-800 bg-[#0a0f0a]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="col-span-2">
                        <a href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Boyee AI</span>
                        </a>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Your AI-powered plant care companion. Helping you grow healthier,
                            happier plants with smart technology.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-white mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400">
                        © 2026 Boyee AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
