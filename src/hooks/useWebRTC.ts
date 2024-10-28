import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebRTC() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [volume, setVolume] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setHasPermission(true);
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
      return false;
    }
  }, []);

  const startMicTest = useCallback(() => {
    if (!streamRef.current || !hasPermission) return;

    setIsTesting(true);
    audioContextRef.current = new AudioContext();
    const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateVolume = () => {
      if (!isTesting) return;
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setVolume(average);
      requestAnimationFrame(updateVolume);
    };

    updateVolume();
  }, [hasPermission, isTesting]);

  const stopMicTest = useCallback(() => {
    setIsTesting(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setVolume(0);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    hasPermission,
    isTesting,
    volume,
    requestPermission,
    startMicTest,
    stopMicTest
  };
}