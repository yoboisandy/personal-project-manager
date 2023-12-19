"use client";
import React from "react";
import Task from "./Task";
import { colors } from "./utils";
import { Droppable } from "react-beautiful-dnd";

const BoardColumn = ({ title, issues }: { title: string; issues: any }) => {
	return (
		<div className=" w-[324px] flex flex-col gap-4">
			<div className="text-lg font-semibold bg-gray-50 p-2 rounded-t-lg">
				{title}
			</div>
			{/* <Droppable droppableId={title}> */}
			{/* {(provided, snapshot) => ( */}
			{/* <div className="w-full">
				<div className="gap-2 bg-gray-50 p-2 min-h-[500px] overflow-y-auto overflow-x-hidden">
					{issues?.length > 0
						? issues.map((item: any, index: any) => (
								<Task
									key={item.id}
									color={
										colors[
											Math.floor(
												Math.random() * colors.length
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
			</div> */}
			{/* )} */}
			{/* </Droppable> */}
			<div className="flex min-w-[324px]">
				<Droppable droppableId={title}>
					{(provided, snapshot) => (
						<div
							className="w-full"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<div className="gap-2 bg-gray-50 p-2 min-h-[500px] overflow-y-auto overflow-x-hidden ">
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
						</div>
					)}
				</Droppable>
				<Droppable droppableId={title}>
					{(provided, snapshot) => (
						<div
							className="w-full"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<div className="gap-2 flex  flex-wrap bg-gray-50 p-2 min-h-[500px] overflow-y-auto overflow-x-hidden ">
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
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
};

export default BoardColumn;
