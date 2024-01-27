import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./pagination.css"

function Pagination()
{
    const[employee, setEmployee] = useState([]);
    const[currentpage, setCurrentpage] = useState(1);
    const datasPerPage = 10;

    useEffect(() => {
      fetchData();
    },[currentpage])

  const fetchData = async() => {
    try{
    const response = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
    setEmployee(response.data);
    }
    catch(e)
    {
        console.log('error', e);
    }
  }


  const handleNext = () => {
    setCurrentpage(prevPage => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentpage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const indexOfLastItem = currentpage * datasPerPage;
  const indexOfFirstItem = indexOfLastItem - datasPerPage;
  const currentItems = employee.slice(indexOfFirstItem, indexOfLastItem);


   return(
    <div>
        <h1 className="heading">Employee Data Table</h1>
         <table  className="table">
    <thead >
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody className="body">
    {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
      
   
    </tbody>
  </table>
  <footer className="btn">
    <button className="button" onClick={handlePrevious}>Previous</button>
    <button className="button">{currentpage}</button>
    <button className="button" onClick={handleNext}>Next</button>
  </footer>
    </div>
   );
}
export default Pagination;