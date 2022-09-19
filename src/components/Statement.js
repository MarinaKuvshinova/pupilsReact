import { useState, useEffect } from "react";


const Statement = ({data, statements, PupilID}) => {
  const [openState, setOpenState] = useState(false);

  let pupelInfo = data.filter(item => item.PupilID === PupilID); //StatementID
    pupelInfo.map(item => {
      const statementsObject = statements.filter(elem => elem.StatementID === item.StatementID);
      item.Statement = statementsObject[0].Statement;
  });

  let openClose = () => {
    setOpenState(!openState);
  };

    return (
      
      <div className= { `user-more ${openState ? "active" : ""}`}>
        <strong onClick = { openClose }>Statements:</strong>
        <div  className="statement-row-holder">
            { pupelInfo && pupelInfo.map((elem, indexElem) => {
              if (elem.Statement) {
                return (
                  <div className="statement-row" key={indexElem + '' + indexElem.ID}>
                    <strong>{elem.DateCreated}</strong>
                    <span>{elem.Statement}</span>
                  </div>
                )
                }
              })}
        </div>
      </div>
    )
}

export default Statement;