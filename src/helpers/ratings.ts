import { IRating } from "@/models/rating";

export const aggregateRatings = ({ 
  ratings,
}: { 
  ratings: IRating[];
}): {
  total: number;
  positive: number;
  negative: number;
  score: number;
} => {
  const total = ratings.length;

  let positive = 0, negative = 0;

  ratings.forEach((rating) => {
    if (rating.value === 1) {
      positive++;
    } else if (rating.value === -1) {
      negative++;
    }
  });

  let score = positive - negative;

  return {
    total,
    positive,
    negative,
    score,
  };
};
