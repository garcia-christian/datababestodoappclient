import React, { Fragment, useState, useEffect} from "react";


const InputTodo = ({ userId, statusU }) => {

    const [desc, setDesc] = useState("");
    const [notes, setNotes] = useState("");
   
    const [privacy,setPrivacy] = useState()

    useEffect(() => {
        setPrivacy(localStorage.status)
    })
 
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            setPrivacy(localStorage.status)
            console.log(privacy)
                const body = { desc, notes, userId, privacy };
            const respo = await fetch("https://datababestodoappserver.herokuapp.com/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            
            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    
}

return <Fragment>

    <h1 className="text-center mt-5 " >Todo List</h1>

    <form onSubmit={onSubmitForm}>
        <label><h3>Task</h3></label>
        <div className="d-flex">
            <input
                type="text"
                className="form-control bg-dark text-light"
                value={desc}
                required
                onChange={e => setDesc(e.target.value)}
                placeholder="Insert Task"
            />
            <button className="btn  ml-3 btn-outline-success">Add </button>
        </div>
        <div className="mt-3 mr-5">
            <label><h5>Notes</h5></label>
            <textarea
                class="form-control bg-dark text-light"
                id="exampleFormControlTextarea1"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add Notes"
                rows="4">

            </textarea>
        </div>
    </form>

</Fragment>;

    
};



export default InputTodo;