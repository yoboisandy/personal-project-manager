// "use client";
// import React from "react";
// import Image from "next/image";
// import Draggable from "react-draggable";

// const Task = ({
// 	color,
// 	task,
// 	storyPoints,
// 	avatar,
// 	index,
// 	id,
// }: {
// 	color: string;
// 	task: string;
// 	storyPoints: number;
// 	avatar: string;
// 	index: number;
// 	id: string;
// }) => {
// 	task = task.length > 40 ? task.slice(0, 40) + "..." : task;
// 	return (
// 		<Draggable key={id}>
// 			<div
// 				className={`flex flex-col justify-between shadow-md shadow-gray-200 p-2 min-w-[150px] max-w-[150px] h-28 ${color}`}
// 			>
// 				<div className="text-sm font-semibold">{task}</div>
// 				<div className="flex gap-2 justify-end items-end">
// 					{storyPoints >= 0 && (
// 						<div className="text-xs font-semibold text-gray-400 h-6 w-6 bg-white rounded-full flex items-center justify-center">
// 							{storyPoints}
// 						</div>
// 					)}
// 					{avatar && (
// 						<div className="text-xs font-semibold text-gray-400 h-6 w-6 bg-white rounded-full flex items-center justify-center">
// 							<Image
// 								src={avatar}
// 								alt="plus"
// 								width={24}
// 								height={24}
// 								className="rounded-full"
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</Draggable>
// 	);
// };

// export default Task;

"use client";
import React from "react";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";

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
	task = task.length > 40 ? task.slice(0, 40) + "..." : task;
	return (
		<Draggable draggableId={`${id}`} index={index} key={id}>
			{(provided, snapshot) => (
				<div
					className={`flex flex-col justify-between shadow-md shadow-gray-200 p-2 min-w-[150px] max-w-[150px] h-28 ${color}`}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={{ ...provided.draggableProps.style }}
				>
					<div className="text-sm font-semibold">{task}</div>
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
			)}
		</Draggable>
	);
};

export default Task;
