import React, { Fragment, useState } from "react";


const EditTodo = ({ todo,uid }) => {
    const [desc, setDesc] = useState(todo.todo_desc);
    const [notes, setNotes] = useState(todo.todo_notes);

    
    let button;

    if(todo.user_id=== uid){
        button =  <button type="button " class="btn btn-outline-warning" data-dismiss="modal" onClick={e => updatePri(e)} >Change Privacy</button>;
    }
 

    
 

    const updateDesc = async e => {
        e.preventDefault();
        try {
            const body = { desc,notes };
            const respo = await fetch(`https://datababestodoappclient.herokuapp.com/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            })
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    const updatePri = async e => {
        e.preventDefault();
        try {
           
            const respo = await fetch(`https://datababestodoappclient.herokuapp.com/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }
    const setAll = ()=>{
 
        setNotes(todo.todo_notes)
        setDesc(todo.todo_desc)
       
    }
  
  
    return (
        <Fragment>
            <button type="button"
            onClick={() => setAll()} 
                class="btn btn-warning btn-outline-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}
            >
                Edit
                </button>


            <div class="modal " id={`id${todo.todo_id}`}  >
                <div class="modal-dialog bg-dark">
                    <div class="modal-content bg-dark">


                        <div class="modal-header bg-dark">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button type="button" class="close text-light" data-dismiss="modal" onClick={() => setDesc(todo.todo_desc)} onClick={() => setNotes(todo.todo_notes)}>&times;</button>
                        </div>

                        <div class="modal-body text-left bg-dark">
                        <label className="bg-dark"><h4>Task</h4></label>
                            <input type="text" className="form-control bg-dark text-light " value={desc} onChange={e => setDesc(e.target.value)} />
                            
                            <div className="mt-3 bg-dark">
                                <label className="bg-dark"><h6>Notes</h6></label>
                                <textarea
                                    class="form-control bg-dark text-light"
                                     id="exampleFormControlTextarea1"
                                     value={notes}
                                     onChange={e => setNotes(e.target.value)}
                                    placeholder="Add Notes"
                                    rows="4">
                                </textarea>
                            </div>
                        </div>

                        <div class="modal-footer bg-dark">
                            {button}
                            <button type="button " class="btn btn-outline-warning" data-dismiss="modal" onClick={e => updateDesc(e)} >Edit</button>
                            <button type="button " class="btn btn-danger btn-outline-danger" data-dismiss="modal">Close</button>
                        </div>


                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default EditTodo;