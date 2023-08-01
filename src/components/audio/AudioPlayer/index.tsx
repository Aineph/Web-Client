/**
 * Created by Aineph for web-client.
 * Started on 27/07/2023.
 */

import React, { useCallback, useMemo, useRef, useState } from "react"
import MediaElement from "./MediaElement"
import AudioTrack from "./AudioTrack"

interface AudioPlayerProps {
  autoplay: boolean
  tracks: Array<Queries.STRAPI_AUDIO_TRACK>
  startTrack: number
}

export interface AudioPlayerType {
  duration: string
  play: () => void
  remove: () => void
  setSrc: (src: string) => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  autoplay,
  tracks,
  startTrack,
}) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(startTrack)

  const playerRef = useRef<AudioPlayerType | null>(null)

  const onSelectedSongChange = useCallback(
    (position: number) => {
      setSelectedTrackIndex(position - 1)
      if (playerRef.current) {
        playerRef.current.setSrc(tracks[position - 1].file?.url || "")
        playerRef.current.play()
      }
    },
    [tracks, setSelectedTrackIndex],
  )
  const onTrackChange = useCallback(
    (trackIndex: number) => {
      setSelectedTrackIndex(trackIndex)
    },
    [setSelectedTrackIndex],
  )

  const trackFiles = useMemo(
    () => tracks.map(track => track.file?.url || ""),
    [tracks],
  )

  return (
    <div>
      <div>
        <MediaElement
          autoplay={autoplay}
          onTrackChange={onTrackChange}
          playerRef={playerRef}
          startTrack={startTrack}
          tracks={trackFiles}
        />
      </div>
      <div>
        {tracks.map((track, trackPosition) => (
          <AudioTrack
            key={track.title}
            onSelect={onSelectedSongChange}
            position={trackPosition + 1}
            selected={selectedTrackIndex === trackPosition}
            track={track}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(AudioPlayer)
