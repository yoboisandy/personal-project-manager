const Grid = ({ children, columns }: any) => {
	return (
		<div
			className={`grid items-start gap-2 bg-gray-50 p-2 overflow-y-auto no-scrollbar`}
			style={{
				gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
			}}
		>
			{children}
		</div>
	);
};

export default Grid;
