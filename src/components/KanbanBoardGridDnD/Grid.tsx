const Grid = ({ children, columns }: any) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gridGap: 10,
				maxWidth: "800px",
				// minHeight: "550px",
				// maxHeight: "550px",
				margin: "",
			}}
		>
			{children}
		</div>
	);
};

export default Grid;
