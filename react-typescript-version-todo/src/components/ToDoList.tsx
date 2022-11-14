import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";



// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value },
//         } = event;
//         setToDo(value);
        
//     }
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//      };
//     return <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange } value={toDo} placeholder="Write a to do" />
//             <button>Add</button>
//         </form>
//     </div>
// }





interface IToDo { 
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
    id: number;

}

function ToDoList() {
    
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
      setCategory(event.currentTarget.value as any);  

    };
    console.log(category);
    return (<div>
        <h1>To Dos</h1>
        <hr />
        <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
        {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo} /> )} 
        
        
    </div>);
}

export default ToDoList;