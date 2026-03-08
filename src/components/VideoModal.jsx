import { useEffect, useRef, useCallback } from 'react';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose }) => {
    const videoRef = useRef(null);

    // Pause & reset video when modal closes
    useEffect(() => {
        if (!isOpen && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isOpen]);

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

    // Escape key
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        },
        [isOpen, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div
            className={`video-modal-overlay ${isOpen ? 'video-modal-open' : ''}`}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="video-modal-container" role="dialog" aria-modal="true">
                {/* Close */}
                <button className="video-modal-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                {/* Video */}
                <video
                    ref={videoRef}
                    className="video-modal-video"
                    src="/boyee_intro.mp4"
                    controls
                    autoPlay
                    playsInline
                />

                {/* Title overlay */}
                <div className="video-modal-title">
                    <span className="video-modal-title-badge">▶ BOYEE</span>
                    <span>See How It Works</span>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
