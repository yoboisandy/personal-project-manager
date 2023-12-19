"use client";
import BoardColumn from "./BoardColumn";
import { sprintBoardData as data } from "./utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard = () => {
	const tempData = [...data];

	return (
		<DndProvider backend={HTML5Backend}>
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
		</DndProvider>
	);
};

export default KanbanBoard;
