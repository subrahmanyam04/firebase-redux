import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
const Students = () => {
  const [data, setData] = useState([]);
  // console.log('id',data)
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    getUser();
  }, [])

  // get call goes here..........................................


  const getUser = async () => {
    try {
      const response = await axios.get("https://simple-task-34c85-default-rtdb.firebaseio.com/user.json");
      const jsonData = response.data;

      // Check if jsonData is null
      if (jsonData === null) {
        // Handle the case when the database is empty (jsonData is an empty object)
        console.log("Database is null.");
        // You can set some default value or return an empty array, depending on your use case
        setData([]);
      } else {
        // Database has data, proceed to map the keys
        const data = Object.keys(jsonData).map((key) => ({ id: key, ...jsonData[key] }));
        console.log("Data:", data);

        setData(data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error gracefully, e.g., display an error message
    }
  };




  // delete call goes here...................................

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to remove?')) {
      await axios.delete("https://simple-task-34c85-default-rtdb.firebaseio.com/user/" + id + ".json")
        .then(() => {
          getUser();
          toast.success('User removed successfully.', {
            position: 'top-right',
            autoClose: 3000, // Close the notification after 3 seconds
            hideProgressBar: false, // Show the progress bar
            closeOnClick: true, // Close the notification when clicked
            pauseOnHover: true, // Pause the countdown when hovered
            draggable: true, // Allow dragging the notification
          });
        });
    }
  };

  // post call goes here..............................

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Name and email are required fields.");

      return;
    }

    axios
      .post("https://simple-task-34c85-default-rtdb.firebaseio.com/user.json", formData)
      .then(() => {

        getUser();

        setFormData({
          name: "",
          email: "",

        });
        setError('');
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  // edit call goes here..........................

  const handleEdit = (id) => {
    const selectedStudent = data.find((student) => student.id === id);
    setSelectedStudentId(id);
    setFormData({
      name: selectedStudent.name,
      email: selectedStudent.email,
    });
  };

  // put call goes here...........................

  const handleUpdate = () => {
    if (!formData.name || !formData.email) {
      setError("Name and email are required fields.");
      return;
    }

    axios
      .put("https://simple-task-34c85-default-rtdb.firebaseio.com/user/" + selectedStudentId + ".json", formData)
      .then(() => {
        getUser();
        setSelectedStudentId(null);
        setFormData({
          name: "",
          email: "",
        });
        setError('');
        // alert("Updated");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  // cancel button goes here...................................

  const handleCancelUpdate = () => {
    setSelectedStudentId(null);
    setFormData({
      name: "",
      email: "",
    });
    setError('');
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
                <button type="button" className={`btn ${selectedStudentId ? "btn-success" : "btn-primary"}`} onClick={selectedStudentId ? handleUpdate : handleSubmit}>
                  {selectedStudentId ? "Update" : "Submit"} </button>
              </div>
              <div class="col-md-2">

                <button className="btn btn-secondary ms-1" onClick={handleCancelUpdate} >
                  Cancel
                </button>

              </div>

              <span className="text-danger" id="error">{error}</span>
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
            {/* <th className="border border-dark bg-info">id</th> */}
            <th className="border border-dark bg-info">Name</th>
            <th className="border border-dark bg-info" >Email</th>
            <th className="border border-dark bg-info">Action</th>
            {/* <th className="border border-dark bg-info">Delete</th> */}
          </tr>
        </thead>
        <tbody id="tbody">
          {
            data.map((user) => {
              return (
                <tr >
                  {/* <td className="border border-dark">{user.id}</td> */}
                  <td className="border border-dark">{user.name}</td>
                  <td className="border border-dark">{user.email}</td>
                  {/* <td className="border border-dark"><button class="btn btn-primary" >Edit</button></td> */}
                  <td className="border border-dark"><button className="btn btn-primary" onClick={() => handleEdit(user.id)} >Edit</button>
                    <button class="btn btn-danger ms-3" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                  {/* <td className="border border-dark" onClick={() => handleDelete(user.id)}><button class="btn btn-danger" >Delete</button></td> */}
                </tr>
              )

            }
            )}
        </tbody>

      </table>
    </div>

  );
}


export default Students;