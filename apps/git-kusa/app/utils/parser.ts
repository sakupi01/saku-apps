import type { ContributionCalendar } from "@/components/types";

export type StreakStats = {
  totalContributions: number;
  firstContribution: string;
  longestStreak: {
    start: string;
    end: string;
    days: number;
  };
  currentStreak: {
    start: string;
    end: string;
    days: number;
  };
};

export type Contributions = {
  [key: string]: number;
};

/**
 * Transform GitHub contribution graph to contributions object
 */
const parseContributionGraph = (graph?: ContributionCalendar) => {
  if (!graph) return undefined;

  let contributions: Contributions | undefined = undefined;
  for (const week of graph.weeks) {
    for (const contributionDay of week.days) {
      const date = contributionDay.date;
      const count = contributionDay.contributionCount;
      if (!contributions) {
        contributions = {};
      }
      contributions[date] = count;
    }
  }
  return contributions;
};

/**
 * Fetch user contribution calendars for provided years
 */
export const fetchContributions = async (
  contributionGraph: ContributionCalendar[],
) => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = now.toISOString().split("T")[0];
  let allContributions: Contributions | undefined = undefined;

  const manyContributions: Contributions[] = [];

  // -- fetch remaining year's contributions in concurrently

  for (const graph of contributionGraph) {
    if (!graph) {
      continue;
    }
    const contributions = parseContributionGraph(graph);

    contributions && manyContributions.push(contributions);
  }

  // flatten all contributions to a single object
  for (const contributions of manyContributions) {
    for (const contributionDate in contributions) {
      if (!allContributions) {
        allContributions = {};
      }

      const count = contributions[contributionDate];
      // count contributions up until today
      // also count next day if user contributed already
      if (
        contributionDate <= today ||
        (contributionDate === tomorrow && count > 0)
      ) {
        // add contributions to the array
        allContributions[contributionDate] = count;
      }
    }
  }
  return allContributions;
};

/**
 * Extract streak stats based on contribution count and dates
 *
 * @param contributions
 * @returns stats
 */
/**
 * Extract streak stats based on contribution count and dates
 *
 * @param contributions
 * @returns stats
 */
export const extractStreakStats = (contributions?: Contributions) => {
  if (!contributions) {
    return undefined;
  }

  const contributionsArr = Object.keys(contributions);
  const todayKey = contributionsArr.at(-1) ?? "";
  const firstKey = contributionsArr[0] ?? "";

  const stats: StreakStats = {
    totalContributions: 0,
    firstContribution: "",
    longestStreak: {
      start: firstKey,
      end: firstKey,
      days: 0,
    },
    currentStreak: {
      start: firstKey,
      end: firstKey,
      days: 0,
    },
  };

  // calculate stats based on contributions
  for (const contributionDate in contributions) {
    const contributionCount = contributions[contributionDate];
    // add contribution count to total
    stats.totalContributions += contributionCount;

    // check if still in streak
    if (contributionCount > 0) {
      // increment streak
      stats.currentStreak.days += 1;
      stats.currentStreak.end = contributionDate;

      // set start on first day of streak
      if (stats.currentStreak.days === 1) {
        stats.currentStreak.start = contributionDate;
      }

      // first date is the first contribution
      if (stats.firstContribution.length <= 0) {
        stats.firstContribution = contributionDate;
      }

      // update longest streak
      if (stats.currentStreak.days > stats.longestStreak.days) {
        // copy current streak start, end, and length into longest streak
        stats.longestStreak.start = stats.currentStreak.start;
        stats.longestStreak.end = stats.currentStreak.end;
        stats.longestStreak.days = stats.currentStreak.days;
      }
    }

    // reset streak with exception for today
    else if (contributionDate !== todayKey) {
      // reset streak
      stats.currentStreak.days = 0;
      stats.currentStreak.start = todayKey;
      stats.currentStreak.end = todayKey;
    }
  }
  return stats;
};

/**
 * Fetch and parse github user contribution to obtain streak stats
 *
 * @param username
 * @returns stats
 */
export const getStreakStats = async (
  contributionYears: number[],
  contributionGraph: ContributionCalendar[],
) => {
  const contributions = await fetchContributions(contributionGraph);
  // sort years in ascending order
  if (contributionYears.length === 0 || !contributions) {
    return {
      totalContributions: 0,
      firstContribution: null,
      longestStreak: {
        start: null,
        end: null,
        days: 0,
      },
      currentStreak: {
        start: null,
        end: null,
        days: 0,
      },
    };
  }

  const stats = extractStreakStats(contributions);

  return stats;
};
