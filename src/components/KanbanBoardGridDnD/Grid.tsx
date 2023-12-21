const Grid = ({ children, columns }: any) => {
	return (
		<div
			className={`grid grid-cols-${columns} items-start gap-2 bg-gray-50 p-2 overflow-y-auto no-scrollbar`}
		>
			{children}
		</div>
	);
};

export default Grid;
