import type { TarrotCard } from "@/data/tarrot.data";

export const getCardMeta = (card: TarrotCard) => {
  const id = card.id.toLowerCase();

  let color = "from-slate-700 to-slate-900"; // Default
  let isMajor = false;
  let numberDisplay = "";

  // 1. Determine Color Scheme based on ID or Element
  if (id.includes("pentacles") || card.element === "Đất") {
    color = "from-emerald-600 to-teal-900"; // Earth/Pentacles
  } else if (id.includes("wands") || card.element === "Lửa") {
    color = "from-orange-600 to-red-900"; // Fire/Wands
  } else if (id.includes("cups") || card.element === "Nước") {
    color = "from-blue-600 to-indigo-900"; // Water/Cups
  } else if (id.includes("swords") || card.element === "Khí") {
    color = "from-slate-500 to-gray-800"; // Air/Swords
  } else {
    // Fallback for Major Arcana if not caught above
    isMajor = true;
    color = "from-purple-600 to-fuchsia-900";
  }

  // 2. Determine Display Number/Court Title
  if (id.includes("king")) numberDisplay = "KING";
  else if (id.includes("queen")) numberDisplay = "QUEEN";
  else if (id.includes("knight")) numberDisplay = "KNIGHT";
  else if (id.includes("page")) numberDisplay = "PAGE";
  else if (id.includes("ace")) numberDisplay = "ACE";
  else {
    // Try to split ID to get number (e.g., "swords_10" -> "10")
    // If your IDs are strictly text (e.g. "wheel_of_fortune"), we default to Roman numeral logic or just "VI"
    // For now, let's default to a star symbol or generic text for Major Arcana
    numberDisplay = isMajor
      ? "MAJOR"
      : id.split("_").pop()?.toUpperCase() || "";
  }

  return { color, isMajor, numberDisplay };
};
