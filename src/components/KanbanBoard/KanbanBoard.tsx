import BoardColumn from "./BoardColumn";
import { sprintBoardData as data } from "./utils";
const KanbanBoard = () => {
	const tempData = [...data];

	return (
		<div className="m-10">
			<div className="min-h-[550px] w-full overflow-x-auto flex gap-8">
				{tempData.map((item: any) => (
					<BoardColumn
						key={item.id}
						title={item.name}
						issues={item.issues}
					/>
				))}
			</div>
		</div>
	);
};

export default KanbanBoard;
