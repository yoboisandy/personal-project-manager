"use client";
import React from "react";
import Task from "./Task";
import { colors } from "./utils";
import { Droppable } from "react-beautiful-dnd";

const BoardColumn = ({ title, issues }: { title: string; issues: any }) => {
	return (
		<div className="min-w-[25%] flex flex-col gap-4">
			<div className="text-lg font-semibold bg-gray-50 p-2 rounded-t-lg">
				{title}
			</div>
			<div className="gap-2 flex flex-wrap bg-gray-50 p-2 h-full overflow-y-auto overflow-x-hidden">
				<Droppable droppableId={title}>
					{(provided, snapshot) => (
						<div
							className="w-full"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{issues?.length > 0
								? issues.map((item: any, index: any) => (
										<Task
											key={item.id}
											color={
												colors[
													Math.floor(
														Math.random() *
															colors.length
													)
												]
											}
											task={item.name}
											storyPoints={item.storyPoint}
											avatar={item.assignee?.image}
											index={index}
											id={`${item.id}`}
										/>
								  ))
								: null}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
};

export default BoardColumn;
