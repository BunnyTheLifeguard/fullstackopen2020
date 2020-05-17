import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            {part.name}
            <br />
            {part.exerciseCount}
            <br />
            {part.description}
          </p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>
            {part.name}
            <br />
            {part.exerciseCount}
            <br />
            {part.groupProjectCount}
          </p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            {part.name}
            <br />
            {part.exerciseCount}
            <br />
            {part.description}
            <br />
            {part.exerciseSubmissionLink}
          </p>
        </div>
      );
    case "Another one":
      return (
        <div>
          <p>
            {part.name}
            <br />
            {part.exerciseCount}
            <br />
            {part.description}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
