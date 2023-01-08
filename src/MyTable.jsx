import React, { useEffect, useState } from "react";
import axios from "axios";
const MyTable = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [Id, setId] = useState("");
  const [isChecked, setisChecked]= useState([]);
  // const [countries, setCountries] = useState(null);
  // const [inputValue, setInputValue] = useState("");
  // const [selected, setSelected] = useState("");
  // const [open, setOpen] = useState(false);
   const Roles =[{
       id:1,
       role:"Marketing Manager"

   },{
    id:2,
    role:"Backend Developer"
   },{
    id:3,
    role:"Frontend Developer"
   },{
    id:4,
    role:"Data Scientist"
   },{
   
        id:5,
        role:"UX Researcher"
     
   },{
   
    id:6,
    role:"Product Manager"
 
}
   ]
//   useEffect(() => {
//     fetch("https://restcountries.com/v2/all?fields=name")
//       .then((res) => res.json())
//       .then((data) => {
//         setCountries(data);
//       });
//   }, []);
  function loadUsers() {
    axios
      .get("https://639c40a916d1763ab143ea54.mockapi.io/api/v1/members")
      .then((res) => {
        console.log(res.data.items)
        setUsers(res.data.items);
      });
  }
  useEffect(() => {
    loadUsers();
  }, []);
  const handleClick = (id) => {
    console.log(id);
    setId(id);
    setShow(true);
  };
  const handleClick1 = (id) => {
    console.log(id);
    setId(id);
    setShow1(true);
  };
  const handleChange = (e) =>{
    console.log(e.target.value)
    setUserRole(e.target.value)
  }
  const updated = {
    name: name,
    email: email,
    role:userRole
  };
  function Update() {
    // e.preventDefault();
    axios.put(`https://639c40a916d1763ab143ea54.mockapi.io/api/v1/members/${Id}`, updated).then((res)=>{
        console.log(res.data);
        if (res.data !== undefined) {
            alert("User details Changed");
          }
    });
  }

  const handlecheckbox = (e)=>{
    const {value, checked}= e.target;
    console.log(value);
    if(checked)
    {
      setisChecked([...isChecked, value]);
    } else{
      setisChecked(isChecked.filter( (e)=>e!== value));
    }
  }
  const alldelete= ()=>{
    //console.log(isChecked);
  if(isChecked.length!==0){
    //  axios.delete(`https://639c40a916d1763ab143ea54.mockapi.io/api/v1/members/${isChecked}`).then((res)=>{
    //     console.log(res.data)
    //  });
    for(let i = 0;i<isChecked.length;i++){
        axios.delete(`https://639c40a916d1763ab143ea54.mockapi.io/api/v1/members/${isChecked[i]}`).then((res)=>{
        console.log(res.data)
        if (res.data !== undefined) {
            alert("Seleted Items Deleted Successfully");
          }
     });
    }
   
  } else {
    alert("please Select at least one check box !");
  }

  }

  const handleDelete = () => {
    // alert('Deleted Successfully')
    axios
      .delete(
        `https://639c40a916d1763ab143ea54.mockapi.io/api/v1/members/${Id}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          alert("Deleted Successfully");
        }
      })
      .then(loadUsers())
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {show1 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShow1(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  {/* <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div> */}
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Edit User Details
                    </p>
                    <form className="w-[50%] h-full flex flex-col mt-2">
                        <label>Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
                        type="text"
                        // placeholder="Enter your name"
                      />
                        <label>User Role</label>
                        <select  onChange={handleChange}>
                         {Roles.map((i)=>{
                            return (
                               <option key ={i.id} value={i.role}>
                                   {i.role}
                               </option>
                            )
                         })}
                         </select>
                        <label>Email Address</label>
                        <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
                        type="email"
                        // placeholder="Enter your email"
                      />
                    
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShow1(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          setShow1(false);
                          Update()
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {show ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShow(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  {/* <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div> */}
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Are you Sure you want to delete User ?
                    </p>

                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShow(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          setShow(false);
                          if(isChecked.length ===0){
                          handleDelete();
                          }else{
                            alldelete();
                          }
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div class="mx-auto">
        <div
          className="flex-space-x-4 w-100 "
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            width: "1000px",
          }}
        >
          <div class="flex-initial">
            <h1 className="text-xl font-semibold text-left mb-4  mx-auto w-auto">
              Team members 100 users
            </h1>
          </div>
          <div class="flex-initial">
            <button className="flex-initial bg-purple-800 border-2 text-white w-auto p-4 mb-8" onClick={()=>setShow(true)}>
              {" "}
              Delete selected
            </button>
          </div>
        </div>
        <table
          // {...getTableProps()}
          className="mx-auto border-2"
          //    className="min-w-full divide-y divide-gray-200"
          // className="relative w-full border"
        >
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {" "}
                    Name
                  </label>
                </div>
              </th>
              <th
                scope="col"
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email address
              </th>
              <th
                scope="col"
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Teams
              </th>
              <th
                scope="col"
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((data, index) => (
              <tr
                key={data.id}
                // className="bg-white border-b-2 border-black"
              >
                <td className="px-4 py-4 whitespace-nowrap ">
                  <div className="flex gap-1w-64 ">
                    <div className="w-32 flex">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value={data.id} 
                        checked={ data.isChecked}
                        onChange={(e)=>handlecheckbox(e)}
                        class="mt-4 flex-initial w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <img
                        src={data.avatar}
                        class="rounded-full w-16 h-16 flex-initial"
                        //  height={10}
                        alt="Avatar"
                      />
                    </div>
                    <div>
                      <p>
                        <span className="semi-bold">{data.name}</span>
                      </p>
                      <p className="text-gray-500 text-sm">{data.userName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.isActive === true ? (
                    <div class=" bg-green-200  rounded-full py-2 px-4 h-auto ">
                      <p class="text-green-700 p-2">Active</p>
                    </div>
                  ) : (
                    <div class=" bg-red-200 rounded-full py-2 px-4">
                      <p class="text-red-700 p-2">Inactive</p>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{data.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                <td className="flex px-6 py-4 whitespace-nowrap">
                  {data.teams.map((i) => {
                    return (
                      <div class=" bg-green-200  rounded-full flex-initial w-50 ">
                        <p class="text-green-700 p-2 flex-initial w-50">{i}</p>
                      </div>
                    );
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div class="flex m-2 space-x-4">
                    <button
                      onClick={() => handleClick(data.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleClick1(data.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div>
        </div> */}
    </div>
  );
};

export default MyTable;
