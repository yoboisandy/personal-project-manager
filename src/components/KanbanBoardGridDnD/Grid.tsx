const Grid = ({ children, columns }: any) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gridGap: 10,
				maxWidth: "800px",
				margin: "",
			}}
		>
			{children}
		</div>
	);
};

export default Grid;
