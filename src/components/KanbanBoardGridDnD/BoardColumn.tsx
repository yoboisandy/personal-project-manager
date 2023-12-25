"use client";
import React, { useState } from "react";
import Task from "./Task";
import { colors } from "./utils";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	rectSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import Grid from "./Grid";
import { CSS } from "@dnd-kit/utilities";

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

	// console.log("issues" + id, issues);

	const {
		isOver,
		isDragging,
		attributes,
		listeners,
		setNodeRef: setNodeRef2,
		transform,
		transition,
	} = useSortable({
		id: id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.3 : 1,
	};

	return (
		<div
			className="min-w-[340px] max-w-[340px] flex flex-col gap-4"
			style={style}
			{...attributes}
			{...listeners}
			ref={setNodeRef2}
		>
			<div className="text-lg font-semibold bg-gray-50 p-2 rounded-t-lg">
				{title}
			</div>
			<SortableContext
				id={id.toString()}
				items={issues.map((item: any) => `${item.id}`)}
				strategy={rectSortingStrategy}
			>
				<div
					className="bg-gray-50 p-2 min-h-[500px] max-h-[500px] overflow-y-auto no-scrollbar"
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
