import { useState, useEffect } from "react";
import {csv} from "d3"
import Statement from "./components/Statement"

const App = () => {
  const [data, setData] = useState([]);
  const [pupils, setPupils] = useState([]);
  const [schools, setSchools] = useState([]);
  const [statements, setStatements] = useState([]);
  const [sortType, setSortType] = useState('name');
      
  useEffect(() => {
    if (pupils.length === 0) {
      csv('testData/data.csv').then(data => { setData(data); });
      csv('testData/pupils.csv').then(data => { setPupils(data); });
      csv('testData/schools.csv').then(data => { setSchools(data); });
      csv('testData/statements.csv').then(data => { setStatements(data); });
    }

    const sortArray = type => {
      const types = {
        name: 'name',
        age: 'YearReal',
        school: 'SchoolID',
      };
      const sortProperty = types[type];
      const sorted = [...pupils].sort((a, b) => {
        if (sortProperty === 'name') {
          return a.Firstname + a.Surname > b.Firstname + b.Surname ? 1 : -1
        }
        return +a[sortProperty] < +b[sortProperty] ? 1 : -1
      });
      setPupils(sorted);
    };

    sortArray(sortType);

  }, [sortType]);
  

  const parseDate = (date) => {
    return date.substring(6,8) + ' / ' + date.substring(4,6) + ' / ' + date.substring(0,4);
  }

  const getSchoolName = (idSchool) => {
    const school = schools.filter(item => item.schoolcode === idSchool);
    return school[0].schoolName;
  };

  // console.log(pupils)
  // console.log(schools)
  // console.log(data)
  // console.log(statements)

  return (
      <div className="App">
        <select onChange={(e) => setSortType(e.target.value)}>
        <option value="" disabled>sort by</option>
          <option value="name">name</option>
          <option value="age">age</option>
          <option value="school">school</option>
        </select>
              <div className="user-info fixed">
                <div><strong>Name:</strong></div>
                <div><strong>Age:</strong></div>
                <div><strong>DOB:</strong></div>
                <div><strong>School:</strong></div>
              </div>

        {pupils &&
          pupils.map((pupilData, index) => (
            <div className="user" key={index}>
              <div className="user-info">
                <div>{pupilData.Firstname} {pupilData.Surname}</div>
                <div>{pupilData.YearReal}</div>
                <div>{parseDate(pupilData.DateOfBirth)}</div>
                <div>{getSchoolName(pupilData.SchoolID)}</div>
              </div>
              <Statement data = {data} statements = {statements} PupilID = {pupilData.ID} />
            </div>
          ))}
      </div>
  );
}

export default App;
