import { useState, useEffect } from "react";
import React from "react";
import { db } from "../firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const Information = () => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users")
    // const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [editUserId, setEditUserId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        console.log("usersCollectionRef ==========>>>>>>> ", data);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        console.log("sssssssssssssss--------->>>>>>>>", db);
        await deleteDoc(userDoc);
        getUsers();
    };

    const handleEdit = (id) => {
        const selectedStudent = users.find((user) => user.id === id);
        setEditUserId(id);

        setFormData({
            name: selectedStudent.name,
            email: selectedStudent.email,
        });
    };

    const handleUpdate = async () => {
        try {
            if (editUserId !== null) {
                const userDoc = doc(db, "users", editUserId);
                await updateDoc(userDoc, {
                    name: formData.name,
                    email: formData.email,
                });

                // Clear editing state
                setEditUserId(null);

                // Clear the form fields after successfully updating a document
                setFormData({ name: "", email: "" });

                // Fetch the updated list of users
                getUsers();
            }
        } catch (error) {
            console.error("Error updating document: ", error);

        }
    };

    const handleSubmit = async () => {
        alert('hi')
        try {
            // Create a new document in the "users" collection
            await addDoc(usersCollectionRef, {
                name: formData.name,
                email: formData.email,
            });

            // Clear the form fields after successfully adding a document
            setFormData({ name: "", email: "" });

            // Fetch the updated list of users
            getUsers();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };





    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 mt-1">TODO'S APP</h2>
            <div className="row">

                <div className="col-md-6 mx-auto">

                    <form id="myform" className="p-3 border border-dark border-3"  >
                        <div className="mb-3 mt-3">
                            <label>Name:</label>
                            {/* <input type="text" className="form-control input"  placeholder="Enter employe name" id="fname"/> */}
                            <input type="text" id="name" placeholder="Enter student name" className="form-control" value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value }, console.log(formData.name))}
                            />

                        </div>

                        <div className="mb-3 mt-3">
                            <label>Email:</label>
                            {/* <input type="email" className="form-control" placeholder="Enter student email" id="email" value={formData.email || ""}
        onChange={(e)=> setFormData({...formData, eamil:e.target.value})} /> */}
                            <input type="email" className="form-control" placeholder="Enter student email" id="email" name="email" value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />


                        </div>

                        <div className="row g-1" >
                            {/* <div class="col-md-2 ">
                  <button type="submit" className="btn btn-primary" id="button" onClick={handleSubmit} >Submit</button> 
                  <button  className="btn btn-success ms-1" id="upbutton" style={{display:"none"}} >update</button>
                  </div> */}
                            <div class="col-md-2">
                                <button type="button" className={`btn ${editUserId ? "btn-success" : "btn-primary"}`} onClick={editUserId ? handleUpdate : handleSubmit}>
                                    {editUserId ? "Update" : "Submit"} </button>
                            </div>
                            <div class="col-md-2">

                                <button className="btn btn-secondary ms-1" >
                                    Cancel
                                </button>

                            </div>

                            {/* <span className="text-danger" id="error">{error}</span> */}
                            {/* {error && <span className="text-danger">{error}</span>}   */}
                        </div>
                    </form>

                </div>
            </div>

            {/* Table representation */}

            <h2 className='text-center mt-5 mb-3'>STUDENT DATA</h2>
            <table className="table table-striped border border-dark border-2 table-hover ">

                <thead>
                    <tr>

                        <th className="border border-dark bg-info">Name</th>
                        <th className="border border-dark bg-info" >Email</th>
                        <th className="border border-dark bg-info">Action</th>
                        {/* <th className="border border-dark bg-info">Delete</th> */}
                    </tr>
                </thead>
                <tbody id="tbody">
                    {
                        users.map((user) => (
                            <tr>
                                <td className="border border-dark">{user.name}</td>
                                <td className="border border-dark">{user.email}</td>
                                {/* <td className="border border-dark"><button class="btn btn-primary" >Edit</button></td> */}
                                <td className="border border-dark"><button className="btn btn-primary" onClick={() => handleEdit(user.id)} >Edit</button>
                                    <button class="btn btn-danger ms-3" onClick={() => deleteUser(user.id)}  >Delete</button>
                                </td>
                                {/* <td className="border border-dark" onClick={() => handleDelete(user.id)}><button class="btn btn-danger" >Delete</button></td> */}
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>

    );
}

export default Information;
