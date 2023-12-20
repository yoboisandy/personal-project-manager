"use client";
import {
	DndContext,
	DragOverEvent,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	closestCorners,
	rectIntersection,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import { sprintBoardData as data } from "./utils";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { Card } from "./Task";

const KanbanBoard = () => {
	const tempData = [...data];
	const issues = tempData.map((item: any) => item.issues).flat();
	const [activeIssue, setActiveIssue]: any = useState();
	const [items, setItems] = useState<any>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	useEffect(() => {
		const temp: any = {};
		tempData.forEach((item: any) => {
			temp[item.id] = item.issues;
		});
		setItems(temp);
	}, []);

	const handleDragStart = (event: any) => {
		setActiveIssue(issues?.find((item: any) => item.id == event.active.id));
	};

	function findContainer(id: number) {
		return Object.keys(items).find((key) => {
			return items[key].find((item: any) => item?.id == id);
		});
	}

	// function handleDragOver(event: any) {
	// 	const { active, over, draggingRect } = event;
	// 	const { id }: { id: number } = active;
	// 	const { id: overId }: { id: number } = over;

	// 	// console.log("active", id);
	// 	// console.log("over", overId);

	// 	// Find the containers
	// 	const activeContainer = findContainer(id);
	// 	const overContainer = findContainer(overId);

	// 	// console.log(activeContainer, overContainer);

	// 	// console.log("overContainer", overContainer);
	// 	// console.log("activeContainer", activeContainer);

	// 	if (
	// 		!activeContainer ||
	// 		!overContainer ||
	// 		activeContainer === overContainer
	// 	) {
	// 		return;
	// 	}

	// 	setItems((prev: any) => {
	// 		const activeItems = prev[activeContainer].map(
	// 			(item: any) => item.id
	// 		);
	// 		const overItems = prev[overContainer].map((item: any) => item?.id);

	// 		console.log("prev overItems", prev[overContainer]);

	// 		// console.log("activeItems", activeItems);
	// 		// console.log("overItems", overItems);

	// 		// console.log("activeId", id);
	// 		// console.log("overId", overId);

	// 		// Find the indexes for the items
	// 		const activeIndex = activeItems.indexOf(Number(id));
	// 		const overIndex = overItems.indexOf(Number(overId));

	// 		console.log(activeIndex, overIndex);

	// 		let newIndex;
	// 		if (overId in prev) {
	// 			// We're at the root droppable of a container
	// 			newIndex = overItems.length + 1;
	// 		} else {
	// 			const isBelowLastItem =
	// 				over &&
	// 				overIndex === overItems.length - 1 &&
	// 				draggingRect?.offsetTop >
	// 					over.rect.offsetTop + over.rect.height;

	// 			const modifier = isBelowLastItem ? 1 : 0;

	// 			newIndex =
	// 				overIndex >= 0
	// 					? overIndex + modifier
	// 					: overItems.length + 1;
	// 		}

	// 		console.log("activeIndex", activeIndex);
	// 		console.log("active issue", items[activeContainer][activeIndex]);

	// 		return {
	// 			...prev,
	// 			[activeContainer]: [
	// 				...prev[activeContainer].filter(
	// 					(item: any) => item.id !== active.id
	// 				),
	// 			],
	// 			[overContainer]: [
	// 				...prev[overContainer].slice(0, newIndex),
	// 				items[activeContainer][activeIndex],
	// 				...prev[overContainer].slice(
	// 					newIndex,
	// 					prev[overContainer].length
	// 				),
	// 			],
	// 		};
	// 	});
	// }

	// const handleDragOver = (e: any) => {
	// 	console.log(e);
	// 	// Check if item is drag into unknown area
	// 	if (!e.over) return;

	// 	// Get the initial and target sortable list name
	// 	const initialContainer = e.active.data.current?.sortable?.containerId;
	// 	const targetContainer = e.over.data.current?.sortable?.containerId;

	// 	console.log("initialContainer", initialContainer);
	// 	console.log("targetContainer", targetContainer);
	// 	// if there are none initial sortable list name, then item is not sortable item
	// 	if (!initialContainer) return;

	// 	// Order the item list based on target item position
	// 	setItems((prev: any) => {
	// 		const temp = { ...prev };
	// 		const initialItems = temp[initialContainer].map(
	// 			(item: any) => item.id
	// 		);
	// 		const targetItems = targetContainer
	// 			? temp[targetContainer].map((item: any) => item.id)
	// 			: [];
	// 		console.log("drag over", temp);

	// 		// If there are no target container then item is moved into a droppable zone
	// 		// droppable = whole area of the sortable list (works when the sortable list is empty)
	// 		if (!targetContainer) {
	// 			// If item is already there then don't re-added it
	// 			// if (prev[e.over!.id].includes(e.active.id.toString())) {
	// 			// 	console.log("temp", temp);
	// 			// 	return temp;
	// 			// }

	// 			// // Remove item from it's initial container
	// 			// temp[initialContainer] = temp[initialContainer].filter(
	// 			// 	(item: any) => item.id !== activeIssue.id
	// 			// );

	// 			// // Add item to it's target container which the droppable zone belongs to
	// 			// temp[e.over!.id].push(activeIssue);

	// 			return temp;
	// 		}

	// 		// If the item is drag around in the same container then just reorder the list
	// 		if (initialContainer === targetContainer) {
	// 			console.log("initialItems", initialItems);
	// 			const oldIdx = temp[initialContainer].findIndex(
	// 				(item: any) => item.id === activeIssue.id
	// 			);
	// 			const newIdx = temp[].findIndex(
	// 				(item: any) => item === Number(e.over!.id)
	// 			);
	// 			temp[initialContainer] = arrayMove(
	// 				temp[initialContainer],
	// 				oldIdx,
	// 				newIdx
	// 			);
	// 		} else {
	// 			// If the item is drag into another different container

	// 			// Remove item from it's initial container
	// 			temp[initialContainer] = temp[initialContainer].filter(
	// 				(item: any) => item.id !== activeIssue.id
	// 			);

	// 			// Add item to it's target container
	// 			const newIdx = targetItems.indexOf(Number(e.over!.id));
	// 			temp[targetContainer].splice(newIdx, 0, activeIssue);
	// 		}

	// 		return temp;
	// 	});
	// };

	// const handleDragEnd = (e: any) => {
	// 	// Check if item is drag into unknown area
	// 	if (!e.over || !e.active.data.current || !e.over.data.current) return;

	// 	// Check if item position is the same
	// 	if (e.active.id === e.over.id) return;

	// 	// Check if item is moved outside of the column
	// 	if (
	// 		e.active.data.current.sortable.containerId !==
	// 		e.over.data.current.sortable.containerId
	// 	)
	// 		return;

	// 	// Sort the items list order based on item target position
	// 	const containerName = e.active.data.current.sortable.containerId;
	// 	const containerItems = items[containerName].map((item: any) => item.id);
	// 	setItems((item: any) => {
	// 		const temp = { ...item };
	// 		if (!e.over) return temp;
	// 		const oldIdx = containerItems.indexOf(e.active.id);
	// 		const newIdx = containerItems.indexOf(e.over.id);
	// 		temp[containerName] = arrayMove(
	// 			temp[containerName],
	// 			oldIdx,
	// 			newIdx
	// 		);
	// 		return temp;
	// 	});
	// };

	// function handleDragOver(event: any) {
	// 	const { active, over, draggingRect } = event;
	// 	const { id } = active;
	// 	const { id: overId } = over;

	// 	// Find the containers
	// 	const activeContainer = findContainer(id);
	// 	const overContainer = findContainer(overId);

	// 	if (
	// 		!activeContainer ||
	// 		!overContainer ||
	// 		activeContainer === overContainer
	// 	) {
	// 		return;
	// 	}

	// 	setItems((prev: any) => {
	// 		const activeItems = prev[activeContainer];
	// 		const overItems = prev[overContainer];

	// 		// Find the indexes for the items
	// 		const activeIndex = activeItems.indexOf(id);
	// 		const overIndex = overItems.indexOf(overId);

	// 		let newIndex;
	// 		if (overId in prev) {
	// 			// We're at the root droppable of a container
	// 			newIndex = overItems.length + 1;
	// 		} else {
	// 			const isBelowLastItem =
	// 				over &&
	// 				overIndex === overItems.length - 1 &&
	// 				draggingRect.offsetTop >
	// 					over.rect.offsetTop + over.rect.height;

	// 			const modifier = isBelowLastItem ? 1 : 0;

	// 			newIndex =
	// 				overIndex >= 0
	// 					? overIndex + modifier
	// 					: overItems.length + 1;
	// 		}

	// 		return {
	// 			...prev,
	// 			[activeContainer]: [
	// 				...prev[activeContainer].filter(
	// 					(item: any) => item !== active.id
	// 				),
	// 			],
	// 			[overContainer]: [
	// 				...prev[overContainer].slice(0, newIndex),
	// 				items[activeContainer][activeIndex],
	// 				...prev[overContainer].slice(
	// 					newIndex,
	// 					prev[overContainer].length
	// 				),
	// 			],
	// 		};
	// 	});
	// }

	return (
		items && (
			<DndContext
				collisionDetection={rectIntersection}
				sensors={sensors}
				onDragStart={handleDragStart}
			>
				{/* onDragOver={handleDragOver} */}
				{/* onDragEnd={handleDragEnd} */}
				<div className="m-10">
					<div className="min-h-[550px] w-full overflow-x-auto flex gap-8">
						{tempData.map((item: any) => (
							<BoardColumn
								key={`${item.id}`}
								id={item.id}
								title={item.name}
								issues={item.issues}
							/>
						))}
					</div>
				</div>
				<DragOverlay
					dropAnimation={{
						duration: 500,
						easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
					}}
					style={{ transformOrigin: "0 0 " }}
				>
					{activeIssue ? (
						<Card
							color={"bg-red-100"}
							task={activeIssue?.name}
							storyPoints={activeIssue?.storyPoint}
							avatar={activeIssue?.assignee?.image}
							index={0}
							id={activeIssue?.id}
						/>
					) : null}
				</DragOverlay>
			</DndContext>
		)
	);
};

export default KanbanBoard;
