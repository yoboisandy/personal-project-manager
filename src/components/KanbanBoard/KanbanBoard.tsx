"use client";
import BoardColumn from "./BoardColumn";
import { sprintBoardData as data } from "./utils";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanBoard = () => {
	const tempData = [...data];

	const handleDragEnd = (result: any) => {
		console.log("End", result);
	};

	const handleDragStart = (result: any) => {
		console.log("start", result);
	};

	const handleDragUpdate = (result: any) => {
		console.log("update", result);
	};

	// let columnsWithIssues: any = {};
	// tempData.forEach((item: any) => {
	// 	columnsWithIssues[item.name] = item.issues;
	// });

	// console.log("columnsWithIssues", columnsWithIssues);

	return (
		<DragDropContext
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			onDragUpdate={handleDragUpdate}
		>
			<div className="m-10">
				<div className="min-h-[550px] w-full overflow-x-auto flex gap-8">
					{tempData.map((item: any) => (
						<BoardColumn
							key={`${item.id}`}
							title={item.name}
							issues={item.issues}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	);
};

export default KanbanBoard;
