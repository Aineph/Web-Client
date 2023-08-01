/**
 * Created by Aineph for web-client.
 * Started on 27/07/2023.
 */

import React, { useCallback } from "react"
import { Box, Text } from "@chakra-ui/react"

interface AudioTrackProps {
  onSelect: (position: number) => void
  position: number
  selected: boolean
  track: Queries.STRAPI_AUDIO_TRACK
}

const AudioTrack: React.FC<AudioTrackProps> = ({
  onSelect,
  position,
  selected,
  track,
}) => {
  const onAudioTrackSelection = useCallback(
    () => onSelect(position),
    [position, onSelect],
  )

  return (
    <Box
      cursor={"pointer"}
      display={"flex"}
      flexDirection={"column"}
      gap={"5px"}
      onClick={onAudioTrackSelection}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        fontWeight={selected ? "bold" : "normal"}
        gap={"5px"}
      >
        <Text>{position}.</Text>
        <Text>{track.title}</Text>
      </Box>
      <Box color={"primary"} display={"flex"} flexDirection={"row"} gap={"5px"}>
        <Text>—</Text>
        <Text>{track.author?.username}</Text>
      </Box>
    </Box>
  )
}

export default React.memo(AudioTrack)
