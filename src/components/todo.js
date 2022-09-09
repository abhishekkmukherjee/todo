 import React, { useState, useEffect } from 'react'
 import './style.css'

 //get the localstorage data back
 const getLocalData = ()=>{
const lists = localStorage.getItem("mytodolist");
if(lists){
    return JSON.parse(lists);
}
else{
    return[];
}
 };
 
 const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items,setItems]= useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //add the items function
    const addItem = () =>{
        if(!inputdata){
            alert('Please fill the data')
        }else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) =>{
if(curElem.id === isEditItem){
    return{...curElem, name:inputdata};
}
return curElem;
                }
                )
            )
        }
        
        else{
            const myNewInputData ={
                id:new Date().getTime().toString(),
                name : inputdata,

            }
            setItems([...items,myNewInputData]);
            setInputData("")
        }
    };


    //edit the items
const editItem = (index) =>{
    const item_todo_edited = items.find((curElem)=>{
        return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
setIsEditItem(index);
setToggleButton(true);
};


    //how to delete item section
    const deleteItem = (index) =>{
        const updatedItem = items.filter((curElem)=>{
return curElem.id !==  index;
        });
setItems(updatedItem);
    };

    //remove all the element
    const removeAll = ()    =>{
setItems([]);
    };

    //adding localstorage
    useEffect(() =>{
        localStorage.setItem("mytodolist" , JSON.stringify(items));

    },[items]
    );

   return (
     <div className='main-div'>
        <div className='child-div'>
            <figure>
                <figcaption>Add your List here✌</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='✍ Add Item' 
                    className='form-control'
                    value = {inputdata }
                    onChange = {(event) => setInputData(event.target.value) }

                    />
                    {
                        toggleButton ? (
                            <i class="fa fa-solid fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i class="fa fa-solid fa-plus add-btn" onClick={addItem}></i>
                        )
                    }
                    
                    
            </div>
           
           {/* show our items*/}


           <div className='showItems'>
{items.map((curElem) => {
    return(

        <div className='eachItem' key = {curElem.id}>
        <h3>{curElem.name}</h3>
        <div className='todo-btn'>
        <i class="far fa-solid fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
        <i class="far fa-solid fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
        </div>
    </div>
    )
})}


           
           </div>
           
           
           
            {/* remove all items */}
<div className='showItems'></div>
            <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                <span>Check List</span></button></div>
        </div>
     </div>

   )
 }
 
 export default Todo