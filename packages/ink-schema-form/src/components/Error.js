import React from 'react'
import { Box, Color } from '@gen-codes/ink-cli'

export default function Error({ children }) {
	return (
		<Box>
			<Color red>{children}</Color>
		</Box>
	)
}
