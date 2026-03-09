import PlayerBadge from "./PlayerBadge";
import QuestionCard from "./QuestionCard";
import ArenaHeader from "./ArenaHeader";

export default function StadiumView({ onExit }: { onExit?: () => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 w-full animate-in fade-in duration-500 relative">
      <ArenaHeader onExit={onExit} />
      
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] gap-6 lg:gap-8 mt-4 lg:mt-6 max-w-[1400px] mx-auto w-full pb-24 lg:pb-0 px-2 md:px-0 overflow-y-auto lg:overflow-visible no-scrollbar">
        {/* Player 1 (You) */}
        <PlayerBadge 
          name="You"
          title="Battle Mage"
          level={24}
          hp={850}
          maxHp={1000}
          avatar="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
          colorTheme="green"
        />

        {/* Central Arena */}
        <QuestionCard />

        {/* Player 2 (Opponent) */}
        <PlayerBadge 
          name="DarkScholar"
          title="Rogue Academic"
          level={26}
          hp={420}
          maxHp={1100}
          avatar="https://api.dicebear.com/9.x/avataaars/svg?seed=Jessica&backgroundColor=ffdfbf"
          colorTheme="red"
          flip
        />
      </div>
    </div>
  );
}
