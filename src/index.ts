import sharp from 'sharp';

function makeImage(
	width: number,
	height: number,
	format: 'png' | 'jpg',
	text: string | null = null,
	backgroundColor = 'lightgray',
	textColor = 'gray'
) {
	const overString = text || `${width}x${height}`;
	const fontSize = Math.min(width / 10, 48);

	(async () => {
		const result = await sharp({
			create: {
				width: width,
				height: height,
				channels: 3,
				background: backgroundColor,
			},
		})
			.composite([
				{
					input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
				<text x="50%" y="50%" font-family="monospace" text-anchor="middle" dy=".50em" font-size="${fontSize}" fill="${textColor}">
					${overString}
				</text>
				</svg>`),
					blend: 'over',
				},
			])
			.toFormat(format)
			.toFile(`dest/${overString.replace(' ', '_')}.png`);
		// .toBuffer({ resolveWithObject: false });

		console.log({ result });
		// console.log({ base64: `data:image/${format};base64,${result.toString('base64')}` });
	})();
}

makeImage(200, 200, 'png', 'image text');
makeImage(1024, 500, 'jpg', null, '#ff00ff', 'white');
