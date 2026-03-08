import { useState, useEffect, useCallback } from 'react';
import './HowItWorksModal.css';

const steps = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <line x1="10" y1="6.5" x2="14" y2="6.5" />
                <line x1="6.5" y1="10" x2="6.5" y2="14" />
            </svg>
        ),
        title: 'Scan Your Plant',
        description:
            'Simply scan the QR code on your plant or take a photo. Our AI instantly identifies it and creates a personalized care profile just for you.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
        ),
        title: 'Smart Water Alerts',
        description:
            'Never over-water or under-water again! AI-powered reminders adapt to your local weather conditions and each plant\'s unique needs.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        ),
        title: 'Sunlight Tracking',
        description:
            'Monitor light levels throughout the day. Get smart suggestions for the perfect spot in your home where your plant will thrive.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M12 8v2" />
                <path d="M12 14h.01" />
            </svg>
        ),
        title: 'AI Plant Doctor',
        description:
            'Plant looking sick? Snap a photo and get instant expert diagnosis with treatment steps — powered by advanced AI, available 24/7.',
    },
];

const HowItWorksModal = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [slideDir, setSlideDir] = useState('');

    // Reset step when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
            setSlideDir('');
        }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
                setSlideDir('next');
                setCurrentStep((s) => s + 1);
            }
            if (e.key === 'ArrowLeft' && currentStep > 0) {
                setSlideDir('prev');
                setCurrentStep((s) => s - 1);
            }
        },
        [isOpen, currentStep, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setSlideDir('next');
            setCurrentStep((s) => s + 1);
        }
    };

    const goPrev = () => {
        if (currentStep > 0) {
            setSlideDir('prev');
            setCurrentStep((s) => s - 1);
        }
    };

    const goTo = (index) => {
        setSlideDir(index > currentStep ? 'next' : 'prev');
        setCurrentStep(index);
    };

    const isLastStep = currentStep === steps.length - 1;
    const progressWidth = ((currentStep + 1) / steps.length) * 100;

    return (
        <div
            className={`hiw-overlay ${isOpen ? 'hiw-open' : ''}`}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="hiw-modal" role="dialog" aria-modal="true">
                {/* Floating particles */}
                <div className="hiw-particle"></div>
                <div className="hiw-particle"></div>
                <div className="hiw-particle"></div>

                {/* Close button */}
                <button className="hiw-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                {/* Step badge */}
                <div className="hiw-step-badge">
                    ✦ Step {currentStep + 1} of {steps.length}
                </div>

                {/* Slides */}
                <div className="hiw-slide-area">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`hiw-slide ${index === currentStep
                                    ? 'hiw-slide-active'
                                    : index < currentStep
                                        ? 'hiw-slide-exit'
                                        : ''
                                }`}
                        >
                            <div className="hiw-icon-wrap">{step.icon}</div>
                            <h3 className="hiw-slide-title">{step.title}</h3>
                            <p className="hiw-slide-desc">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation dots */}
                <div className="hiw-dots">
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            className={`hiw-dot ${index === currentStep ? 'hiw-dot-active' : ''}`}
                            onClick={() => goTo(index)}
                            aria-label={`Go to step ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Nav buttons */}
                <div className="hiw-nav">
                    <button className="hiw-btn" onClick={goPrev} disabled={currentStep === 0}>
                        ← Prev
                    </button>
                    {isLastStep ? (
                        <button className="hiw-btn hiw-btn-finish" onClick={onClose}>
                            Got it! ✨
                        </button>
                    ) : (
                        <button className="hiw-btn hiw-btn-next" onClick={goNext}>
                            Next →
                        </button>
                    )}
                </div>

                {/* Progress bar */}
                <div className="hiw-progress" style={{ width: `${progressWidth}%` }} />
            </div>
        </div>
    );
};

export default HowItWorksModal;
