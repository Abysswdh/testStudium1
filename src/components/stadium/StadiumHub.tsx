import { useState } from "react";
import StadiumView from "./StadiumView";
import StadiumSelection from "./StadiumSelection";

export default function StadiumHub() {
  const [inDuel, setInDuel] = useState(false);

  if (inDuel) {
    return <StadiumView onExit={() => setInDuel(false)} />;
  }

  return <StadiumSelection onFindMatch={() => setInDuel(true)} />;
}
