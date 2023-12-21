"use client";
import React from "react";
import Image from "next/image";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({
	color,
	task,
	storyPoints,
	avatar,
	index,
	id,
}: {
	color: string;
	task: string;
	storyPoints: number;
	avatar: string;
	index: number;
	id: string;
}) => {
	const {
		isDragging,
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			className="flex"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<Card
				color={color}
				task={task}
				storyPoints={storyPoints}
				avatar={avatar}
				index={index}
				id={id}
			/>
		</div>
	);
};

export const Card = ({
	color,
	task,
	storyPoints,
	avatar,
	index,
	id,
}: {
	color: string;
	task: string;
	storyPoints: number;
	avatar: string;
	index: number;
	id: string;
}) => {
	task = task.length > 80 ? task.slice(0, 80) + "..." : task;
	return (
		<div
			className={`flex flex-col justify-between shadow-md shadow-gray-200 p-2 min-w-[150px] max-w-[150px] h-[150px] ${color} z-10`}
		>
			<div className="text-sm font-semibold">{task}</div>
			<div className="flex justify-between">
				<div>MS-{index + 1}</div>
				<div className="flex gap-2 justify-end items-end">
					{storyPoints >= 0 && (
						<div className="text-xs font-semibold text-gray-400 h-6 w-6 bg-white rounded-full flex items-center justify-center">
							{storyPoints}
						</div>
					)}
					{avatar && (
						<div className="text-xs font-semibold text-gray-400 h-6 w-6 bg-white rounded-full flex items-center justify-center">
							<Image
								src={avatar}
								alt="plus"
								width={24}
								height={24}
								className="rounded-full"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Task;
