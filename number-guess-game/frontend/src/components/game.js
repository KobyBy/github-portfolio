import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Game() {
  const [form, setForm] = useState({
    name: "",
    number: 50,
    guessCt: 0,
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [guessedNumber, setGuessedNumber] = useState(null);

  useEffect(() => {
    // Inside the useEffect hook
    const fetchData = async () => {
      const id = params.id;
      const response = await fetch(`http://localhost:5000/game/${id}`)
      if (!response.ok) {
        window.alert("game.js useEffect response.ok was false");
        return;
      }
      const record = await response.json();
      if (!record) {
        console.log(`Record not found`);
        navigate("/");
        return;
      }
      // Extract name and number from the fetched record
      const { name, number } = record;
      // Update the form state with name and number
      setForm({ ...form, name, number });
    };


    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

// Inside the onSubmit function
  async function onSubmit(e) {
    e.preventDefault();
    handleGuessNumber();

    // Create the payload to update guessCt only
    const editedScore = {
      guessCt: form.guessCt,
    };

    //This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${form.guessCt}/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedScore),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // await fetch(`http://localhost:5000/guess/${form.guessedNumber}/${form.guessCt}/${params.id}`) 
    //   .then((response) => response.json())
    //   .then((comparison) =>{
    //       this.setStatus( {comparison} )
    // })
    

  };
  

  function handleInputChange(event){
    setGuessedNumber(event.target.value)

  }

  // function handleGuessNumber() {
  //   if (guessedNumber > form.number) {
  //     setStatus('Too High!')
  //   } 
  //   else if (guessedNumber < form.number){
  //     setStatus('Too Low!')
  //   } 
  //   else {
  //     setStatus('Correct!')
  //     navigate("/");
  //   }
  // }

  async function handleGuessNumber() {
    form.guessCt = parseInt(form.guessCt) + 1;
    
    const response = await fetch(`http://localhost:5000/status/${guessedNumber}/${params.id}`);
    if (!response.ok) {
      setStatus("Error fetching status");
      return;
    }
    
    const status = await response.text();
    setStatus(status);
    
    if (status === "Correct!") {
      navigate("/");
    }
  }
  

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Guess the Number</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="guessedNumber">Enter your guess: </label>
          <input
            type="number"
            className="form-control"
            id="guessedNumber"
            value={guessedNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="guessCt">Guess count: {form.guessCt}</label>
        </div>
        <br />
        <div className="status">{status}</div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Submit Guess"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}