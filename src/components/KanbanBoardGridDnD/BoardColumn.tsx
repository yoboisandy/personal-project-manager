"use client";
import React, { useState } from "react";
import Task from "./Task";
import { colors } from "./utils";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Grid from "./Grid";

const BoardColumn = ({
	title,
	id,
	issues,
}: {
	title: string;
	id: number;
	issues: any;
}) => {
	const { setNodeRef } = useDroppable({
		id: id,
	});

	return (
		<div className="min-w-[340px] max-w-[340px] flex flex-col gap-4">
			<div className="text-lg font-semibold bg-gray-50 p-2 rounded-t-lg">
				{title}
			</div>
			<SortableContext
				id={id.toString()}
				items={issues.map((item: any) => `${item.id}`)}
				strategy={rectSortingStrategy}
			>
				<div
					className="gap-2 bg-gray-50 p-2 min-h-[500px] overflow-y-auto no-scrollbar"
					ref={setNodeRef}
				>
					<Grid columns={2}>
						{issues?.length > 0
							? issues.map((item: any, index: any) => (
									<Task
										key={item.id}
										task={item.name}
										storyPoints={item.storyPoint}
										avatar={item.assignee?.image}
										index={index}
										color={item.color}
										id={`${item.id}`}
									/>
							  ))
							: null}
					</Grid>
				</div>
			</SortableContext>
		</div>
	);
};

export default BoardColumn;
