"use client";
import React from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import { useDrag } from "react-dnd";
import { colors } from "./utils";

const Task = ({
	issue,
	index,
	id,
}: {
	issue: any;
	index: number;
	id: string;
}) => {
	let { name: task, storyPoint: storyPoints, assignee } = issue;

	task = task.length > 40 ? task.slice(0, 40) + "..." : task;

	const color = colors[Math.floor(Math.random() * colors.length)];

	const [{ isDragging }, drag] = useDrag(() => ({
		type: "task",
		item: issue,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			className={`flex flex-col justify-between shadow-md shadow-gray-200 p-2 min-w-[150px] max-w-[150px] h-28 ${color}`}
			ref={drag}
		>
			<div className="text-sm font-semibold">{task}</div>
			<div className="flex gap-2 justify-end items-end">
				{storyPoints >= 0 && (
					<div className="text-xs font-semibold text-gray-400 h-6 w-6 bg-white rounded-full flex items-center justify-center">
						{storyPoints}
					</div>
				)}
				{assignee?.image && (
					<div className="text-xs font-semibold text-gray-400 h-6 w-6 bg-white rounded-full flex items-center justify-center">
						<Image
							src={assignee.image}
							alt="plus"
							width={24}
							height={24}
							className="rounded-full"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;
