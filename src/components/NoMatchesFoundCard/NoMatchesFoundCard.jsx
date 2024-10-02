import React from "react";
import "./NoMatchesFoundCard.scss";

export default function NoMatchesFoundCard({ searchQueryText }) {
  return (
    <section className="card-container">
      <h1 className="title">No Matches Found</h1>

      <h1>Your Search - {searchQueryText} - did not match any results</h1>
      <h4>Suggestions:</h4>
      <ul>
        <li>Try different keywords</li>
        <li>Try more general keywords</li>
        <li>Try fewer keywords</li>
      </ul>
    </section>
  );
}
