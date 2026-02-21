import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Dress } from '../../types';
import { generate360Video } from '../../services/ai';

const VideoModal = ({ dress, isOpen, onClose }: { dress: Dress, isOpen: boolean, onClose: () => void }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && !videoUrl) {
            generateVideo();
        }
    }, [isOpen]);

    const generateVideo = async () => {
        setLoading(true);
        try {
            const url = await generate360Video(dress.imageUrl, dress.name);
            setVideoUrl(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Cinematics: ${dress.name}`}>
            <div className="flex flex-col items-center justify-center p-8 min-h-[70vh] bg-[#1a1a1a]">
                {loading ? (
                    <div className="text-center space-y-8 max-w-md">
                        <div className="w-12 h-12 border border-[#959595] border-t-white rounded-full animate-spin mx-auto"></div>
                        <p className="font-serif text-xl italic text-white">
                            Generăm prezentarea 360°...
                        </p>
                    </div>
                ) : videoUrl ? (
                    <div className="w-full max-w-md aspect-[9/16] shadow-2xl relative">
                        <video src={videoUrl} autoPlay loop controls className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="text-center text-white">
                        <p className="mb-4">Nu s-a putut genera videoclipul.</p>
                        <Button onClick={generateVideo} variant="secondary">Încearcă din nou</Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default VideoModal;
