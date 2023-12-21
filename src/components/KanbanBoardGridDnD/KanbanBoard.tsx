"use client";
import {
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	closestCorners,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import { sprintBoardData as data } from "./utils";
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { Card } from "./Task";

const KanbanBoard = () => {
	const [tempData, setTempData] = useState<any>(data);
	const issues = tempData.map((item: any) => item.issues).flat();
	const [activeIssue, setActiveIssue]: any = useState();
	const [activeContainer, setActiveContainer] = useState<any>(null);
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
	}, [tempData]);

	const handleDragStart = (event: any) => {
		if (event.active.id in items) {
			setActiveContainer(event.active.id);
			return;
		}
		setActiveIssue(issues?.find((item: any) => item.id == event.active.id));
	};

	function findContainer(id: number) {
		if (`${id}` in items) return id;

		return Object.keys(items).find((key) => {
			return items[key].find((item: any) => item?.id == id);
		});
	}

	const handleDragEnd = (event: any) => {
		setActiveIssue(null);
		setActiveContainer(null);
	};

	function handleDragOver(event: any) {
		console.log("drag over", event);
		const { active, over, draggingRect } = event;
		const { id } = active;
		const { id: overId } = over;

		if (id in items && overId in items && id != overId) {
			setTempData((prev: any) => {
				const activeIndex = prev.findIndex(
					(item: any) => item.id == id
				);
				const overIndex = prev.findIndex(
					(item: any) => item.id == overId
				);

				return arrayMove(prev, activeIndex, overIndex);
			});
			return;
		}

		// Find the containers
		const activeContainer: any = findContainer(id);
		const overContainer: any = findContainer(overId);

		if (!activeContainer || !overContainer) {
			return;
		}

		if (activeContainer == overContainer) {
			// check it the item is dragged over itself
			if (id == overId) return;

			// check if the item is dragged over the last item
			setItems((prev: any) => {
				const activeItems = prev[activeContainer].map(
					(item: any) => item.id
				);
				const overItems = prev[overContainer].map(
					(item: any) => item.id
				);

				// Find the indexes for the items
				const activeIndex = activeItems.indexOf(Number(id));
				const overIndex = overItems.indexOf(Number(overId));

				let newIndex;
				if (overId in prev) {
					// We're at the root droppable of a container
					newIndex = overItems.length + 1;
				} else {
					if (overIndex == 0) {
						newIndex = 0;
					} else {
						newIndex = overIndex ? overIndex : overItems.length;
					}
				}

				return {
					...prev,
					[activeContainer]: arrayMove(
						prev[activeContainer],
						activeIndex,
						newIndex
					),
				};
			});

			return;
		}

		setItems((prev: any) => {
			const activeItems = prev[activeContainer];
			const overItems = prev[overContainer];

			// Find the indexes for the items
			const activeIndex = activeItems.findIndex(
				(item: any) => item.id == id
			);
			const overIndex = overItems.findIndex(
				(item: any) => item.id == overId
			);

			let newIndex;
			if (overId in prev) {
				// We're at the root droppable of a container
				newIndex = overItems.length + 1;
			} else {
				if (overIndex == 0) {
					newIndex = 0;
				} else {
					newIndex = overIndex ? overIndex : overItems.length;
				}
			}

			return {
				...prev,
				[activeContainer]: [
					...prev[activeContainer].filter(
						(item: any) => item.id != active.id
					),
				],
				[overContainer]: [
					...prev[overContainer].slice(0, newIndex),
					items[activeContainer][activeIndex],
					...prev[overContainer].slice(
						newIndex,
						prev[overContainer].length
					),
				],
			};
		});
	}

	const { setNodeRef } = useDroppable({
		id: "board",
	});

	return (
		items && (
			<DndContext
				collisionDetection={closestCorners}
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={tempData}
					strategy={rectSortingStrategy}
					id="board"
				>
					<div
						className="m-10 min-h-[550px] w-full overflow-x-auto no-scrollbar flex gap-8"
						ref={setNodeRef}
					>
						{tempData.map((item: any) => (
							<BoardColumn
								key={`${item.id}`}
								id={item.id}
								title={item.name}
								issues={items[item.id]}
							/>
						))}
					</div>
				</SortableContext>
				<DragOverlay
					dropAnimation={{
						duration: 500,
						easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
					}}
					style={{ transformOrigin: "0 0 " }}
				>
					{activeIssue ? (
						<Card
							color={activeIssue.color}
							task={activeIssue?.name}
							storyPoints={activeIssue?.storyPoint}
							avatar={activeIssue?.assignee?.image}
							index={0}
							id={activeIssue?.id}
						/>
					) : (
						<BoardColumn
							id={activeContainer}
							title={
								tempData.find(
									(item: any) => item.id == activeContainer
								)?.name
							}
							issues={items[activeContainer]}
						/>
					)}
				</DragOverlay>
			</DndContext>
		)
	);
};

export default KanbanBoard;
