import { useState, useEffect, useCallback } from 'react';

export function useMediaDevices() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);
      setHasPermission(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Microphone access denied');
      setHasPermission(false);
      return false;
    }
  }, []);

  const startAudioLevelMonitoring = useCallback(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    source.connect(analyzer);

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    
    const updateLevel = () => {
      analyzer.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average);
      requestAnimationFrame(updateLevel);
    };

    updateLevel();

    return () => {
      source.disconnect();
      audioContext.close();
    };
  }, [stream]);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, [stopStream]);

  return {
    hasPermission,
    stream,
    audioLevel,
    error,
    requestPermission,
    startAudioLevelMonitoring,
    stopStream
  };
}