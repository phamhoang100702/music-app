import React, { useCallback } from 'react'
import { Text } from 'react-native'
import { Lyric } from 'react-native-lyric'

interface LyricContainerProps {
	lrc: any // Định dạng lời bài hát từ thư viện
	currentTime: number // Thời gian hiện tại của bài hát (millisecond)
}

const LyricContainer: React.FC<LyricContainerProps> = ({ lrc, currentTime }) => {
	const lineRenderer = useCallback(
		({ lrcLine: { content }, active }: { lrcLine: { content: string }; active: boolean }) => (
			<Text style={{ textAlign: 'center', color: active ? 'white' : 'gray' }}>
				{content}
			</Text>
		),
		[],
	)

	return (
		<Lyric
			style={{ height: 500 }}
			lrc={lrc}
			currentTime={currentTime}
			lineHeight={16}
			lineRenderer={lineRenderer}
		/>
	)
}

export default LyricContainer
