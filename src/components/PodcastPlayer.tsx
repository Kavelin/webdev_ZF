import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

interface PodcastPlayerProps {
  title: string;
  description?: string;
  guestName?: string;
  audioUrl: string;
  duration: number;
  spotifyUrl?: string;
  applePodcastsUrl?: string;
  youtubeUrl?: string;
  episodeNumber?: number;
  season?: number;
}

export default function PodcastPlayer({
  title,
  description,
  guestName,
  audioUrl,
  duration,
  spotifyUrl,
  applePodcastsUrl,
  youtubeUrl,
  episodeNumber,
  season,
}: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl p-6 lg:p-8 overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-br from-[#FF1177] via-[#B14FD1] to-transparent blur-2xl" />

      <audio ref={audioRef} src={audioUrl} />

      <div className="relative z-10">
        {/* Episode Header */}
        <div className="mb-6 pb-6 border-b border-white/10">
          {season && episodeNumber && (
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#FF1177]/10 text-[#FF1177] border border-[#FF1177]/20">
                S{season} E{episodeNumber}
              </span>
            </div>
          )}
          <h3 className="text-xl lg:text-2xl font-bold mb-2">{title}</h3>
          {guestName && (
            <p className="text-sm text-white/60">
              Featuring <span className="text-cyan-400 font-medium">{guestName}</span>
            </p>
          )}
          {description && (
            <p className="text-sm text-white/50 mt-2 line-clamp-2">{description}</p>
          )}
        </div>

        {/* Player Controls */}
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-3">
            <div
              className="relative h-1 bg-white/10 rounded-full cursor-pointer group/progress hover:h-2 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-gradient-to-r from-[#FF1177] to-[#B14FD1] rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/40">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => skip(-15)}
                className="p-2 rounded-lg hover:bg-white/5 transition text-white/60 hover:text-white"
                title="Skip back 15s"
              >
                <SkipBack size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-red-500/25 transition-all"
              >
                {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => skip(15)}
                className="p-2 rounded-lg hover:bg-white/5 transition text-white/60 hover:text-white"
                title="Skip forward 15s"
              >
                <SkipForward size={18} />
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-white/40" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  setVolume(vol);
                  if (audioRef.current) {
                    audioRef.current.volume = vol;
                  }
                }}
                className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-green-500/30 text-white/70 hover:text-white transition-all"
              >
                Spotify
              </a>
            )}
            {applePodcastsUrl && (
              <a
                href={applePodcastsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 text-white/70 hover:text-white transition-all"
              >
                Apple Podcasts
              </a>
            )}
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-red-500/30 text-white/70 hover:text-white transition-all"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
