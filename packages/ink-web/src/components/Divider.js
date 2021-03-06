import React from 'react'
import {Color, Box} from '../index';
import PropTypes from 'prop-types';
import stringWidth from 'string-width'
// Helpers
const getSideDividerWidth = (width, titleWidth) => (width - titleWidth) / 2;
const getNumberOfCharsPerWidth = (char, width) => width / stringWidth(char);

const PAD = ' ';

// Divider
const Divider = ({
	title,
	width,
	padding,
	titlePadding,
	titleColor,
	dividerChar,
	dividerColor,
	height,
	direction = "row",
	...props
}) => {
	if(height) {
		return (
			<Box flexDirection={"column"} height={"100%"} {...props}>
				<Color keyword={dividerColor}>{dividerChar.repeat(height).split("").join("\n")}</Color>
			</Box>
		)
	}
	const titleString = title ?
		`${PAD.repeat(titlePadding) + title + PAD.repeat(titlePadding)}` :
		'';
	const titleWidth = stringWidth(titleString);

	const dividerWidth = getSideDividerWidth(width, titleWidth);
	const numberOfCharsPerSide = getNumberOfCharsPerWidth(
		dividerChar,
		dividerWidth
	);
	const dividerSideString = dividerChar.repeat(numberOfCharsPerSide);

	const paddingString = PAD.repeat(padding);

	return (
		<Box flexDirection={direction} {...props}>
			{paddingString}
			<Color keyword={dividerColor}>{dividerSideString}</Color>
			<Color keyword={titleColor}>{titleString}</Color>
			{/* <Color keyword={dividerColor}>{dividerSideString}</Color> */}
			{paddingString}
		</Box>
	);
};

Divider.propTypes = {
	title: PropTypes.string,
	width: PropTypes.number,
	padding: PropTypes.number,
	titlePadding: PropTypes.number,
	titleColor: PropTypes.string,
	dividerChar: PropTypes.string,
	dividerColor: PropTypes.string
};

Divider.defaultProps = {
	title: null,
	width: 50,
	padding: 1,
	titlePadding: 1,
	titleColor: 'white',
	dividerChar: '─',
	dividerColor: 'grey'
};
export default Divider
