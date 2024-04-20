import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.number}</td>
   <td>{props.record.guessCt}</td>
 </tr>
);
export default function HighScoreList() {
 const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/highscores`);
      if (!response.ok) {
       //const message = `An error occurred: ${response.statusText}`;
       window.alert("failed in highscores.js UseEffect " + response.statusText);
       return;
     }
      const records = await response.json();
     setRecords(records);
   }
    getRecords();
    return;
 }, [records.length]);
  // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
    const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
  // This method will map out the records on the table
  function HighScoreList() {
    // Sort records by guess count in descending order
    const sortedRecords = records.sort((a, b) => a.guessCt - b.guessCt);
    
    return sortedRecords.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  // This following section will display the table with the records of individuals.
 return (
   <div>
     <h2>Number Guessing Game</h2>
     <h5>Try to guess a number between 1 and 100 with as few guesses as possible!</h5>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Number Guessed</th>
           <th>Guess Count</th>
         </tr>
       </thead>
       <tbody>{HighScoreList()}</tbody>
     </table>
     <div>
      <Link to={'create'} className="btn btn-primary">Play</Link>
     </div>
   </div>
 );
}