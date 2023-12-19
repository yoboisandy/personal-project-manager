"use client";
import React from "react";
import Task from "./Task";
import { colors } from "./utils";
import { useDrop } from "react-dnd";

const BoardColumn = ({ title, issues }: { title: string; issues: any }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: "task",
		drop: (item) => addTaskToBoard(item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const data = [...issues];

	const addTaskToBoard = (item: any) => {
		data.push(item);
	};

	return (
		<div className="min-w-[324px] w-[324px] flex flex-col gap-4">
			<div className="text-lg font-semibold bg-gray-50 p-2 rounded-t-lg">
				{title}
			</div>
			<div className="w-full">
				<div
					className="gap-2 bg-gray-50 p-2 min-h-[500px] overflow-y-auto overflow-x-hidden"
					ref={drop}
				>
					{issues?.length > 0
						? issues.map((item: any, index: any) => (
								<Task
									key={item.id}
									issue={item}
									index={index}
									id={`${item.id}`}
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

export default BoardColumn;
