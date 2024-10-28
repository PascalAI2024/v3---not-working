import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, CheckCircle } from 'lucide-react';
import { useMediaDevices } from '../../hooks/useMediaDevices';
import { useWebRTC } from '../../hooks/useWebRTC';

interface MicrophoneTestProps {
  onComplete: (success: boolean) => void;
}

export default function MicrophoneTest({ onComplete }: MicrophoneTestProps) {
  const {
    hasPermission,
    audioLevel,
    error: mediaError,
    requestPermission,
    startAudioLevelMonitoring,
    stopStream,
  } = useMediaDevices();

  const webrtc = useWebRTC({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  });

  const [isTestActive, setIsTestActive] = useState(false);
  const [testPassed, setTestPassed] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (isTestActive && hasPermission) {
      cleanup = startAudioLevelMonitoring();
    }

    return () => {
      cleanup?.();
    };
  }, [isTestActive, hasPermission, startAudioLevelMonitoring]);

  const handleStartTest = async () => {
    const granted = await requestPermission();
    if (granted) {
      const initialized = await webrtc.initialize();
      if (initialized) {
        setIsTestActive(true);
      }
    }
  };

  const handleStopTest = () => {
    setIsTestActive(false);
    stopStream();
  };

  const handleComplete = () => {
    handleStopTest();
    setTestPassed(true);
    onComplete(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Microphone Test</h3>
        {(mediaError || webrtc.error) && (
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">{mediaError || webrtc.error}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {!hasPermission ? (
          <div className="text-center">
            <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              We need access to your microphone for calls.
              Please allow microphone access when prompted.
            </p>
            <button
              onClick={handleStartTest}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Mic className="w-4 h-4 mr-2" />
              Start Microphone Test
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center space-x-4">
              {isTestActive ? (
                <button
                  onClick={handleStopTest}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop Test
                </button>
              ) : (
                <button
                  onClick={() => setIsTestActive(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Test Again
                </button>
              )}
            </div>

            {isTestActive && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-100"
                      style={{ width: `${(audioLevel / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {Math.round((audioLevel / 255) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Speak into your microphone to test the audio level
                </p>
              </div>
            )}

            {testPassed ? (
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Microphone test passed successfully!</span>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={handleComplete}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}