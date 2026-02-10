import { useState, useEffect, useCallback } from "react";

export const useTextToSpeech = (enabled: boolean = true) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = useCallback((text: string) => {
        if (!enabled || !('speechSynthesis' in window)) return;

        // Stop any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // language
        utterance.rate = 1.0; // speed
        utterance.pitch = 1.0; // like tone of voice

        utterance.onstart = () => setIsSpeaking(true); // When speech starts
        utterance.onend = () => setIsSpeaking(false); // When speech ends
        utterance.onerror = () => setIsSpeaking(false); // Handle errors

        window.speechSynthesis.speak(utterance); // allow the browser to speak the text
    }, [enabled]);

    // Function to stop speaking immediately
    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return { speak, stop, isSpeaking };

}