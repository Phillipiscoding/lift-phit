import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  Row,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchData, searchParam } from "../apicalls/fetchData";
import { FaSearch } from "react-icons/fa";

function SearchExercises() {
    const [searchInput, setSearchInput] = useState("");
    const [exercises, setExercises] = useState([]);
    const [noResultsFound, setNoResultsFound] = useState(false);
  
    async function handleSearch() {
      if (searchInput) {
        console.log("Searched for " + searchInput);
        const exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises`,
          searchParam
        );
  
        const searchedExercises = exercisesData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchInput) ||
            item.target.toLowerCase().includes(searchInput) ||
            item.equipment.toLowerCase().includes(searchInput) ||
            item.bodyPart.toLowerCase().includes(searchInput)
        );
  
        if(searchedExercises == "") {
          setNoResultsFound(true);
        } 
        if(searchedExercises != "") {
          setNoResultsFound(false);
        } 
        setExercises(searchedExercises);     
      }
    }
    console.log(exercises);
    return (
      
        <div className="d-flex vh-100">
          <div className="container mt-5 margin-bottom-custom">
        <h1 className="brand-font">Exercises</h1>
        <InputGroup className="input-group my-3" size="sm">
          <FormControl
          className="form"
            placeholder="Search for an exercise..."
            type="input"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                handleSearch();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
          />
          <Button className="search-button workout-btn" onClick={handleSearch}><FaSearch className="search-icon" /></Button>
        </InputGroup>
         { noResultsFound && <p className="alert alert-primary">No results found, please try again.</p>
         }  
        {exercises != "" && (
          <div>
            <p>Here are the results for {searchInput}...</p>
            <Row>
              {exercises.map((exercise, i) => {
                return (
                  <div className="card-container col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-5" key={i}>
                    <Card className="card-style h-100">
                      <Card.Img src={exercise.gifUrl} alt="Visual instructions on how to perform the exercise" />
                      <Card.Body className="card-body">
                        <Card.Title className="card-title">
                          {exercise.name.toUpperCase()}
                        </Card.Title>
                        <Card.Text className="card-text">
                          This exercise targets the {exercise.target}.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </Row>
          </div>
        )}
      </div> </div>
    );
  }

export default SearchExercises