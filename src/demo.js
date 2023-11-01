import React, {useState} from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {MenuOutlined} from "@ant-design/icons";

const Demo = () =>{

    const [items, setItems] = useState([
        { id: 'item-1', content: 'Item 1' },
        { id: 'item-2', content: 'Item 2' },
        { id: 'item-3', content: 'Item 3' },
        // 添加更多项目
    ]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        setItems(reorderedItems);
    };


    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        <div
                                            {...provided.dragHandleProps}
                                            style={{ marginRight: '10px', cursor: 'move' }}
                                        >
                                            <MenuOutlined />
                                        </div>
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Demo