import React from "react";

interface ArrObj {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ courseParts: ArrObj[] }> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
