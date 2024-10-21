import { PiChartLineUpBold, PiChartLineDownBold } from "react-icons/pi";

/**
 * The `assessmentGroupsSummary` function calculates the ratio of positive clusters to total clusters within
 * assessment insights and displays it visually with a chart icon.
 * @param {AssessmentInsights} insight
 * @returns The `groupSummary` function returns a JSX element that displays a summary of positive
 * clusters within assessment insights.
 */
export const assessmentGroupsSummary = (insights: AssessmentInsights) => {
  let totalCluster = 0;
  // Count the number of positive cluster inside a criteria
  let positiveCount = Object.values(insights).reduce(
    (acc, item: AssessmentCriteria | string) => {
      if (typeof item === "string") {
        return acc;
      }

      let currentCount: number = item.groups.reduce((groupAcc, groupItem) => {
        if (!groupItem) return groupAcc;
        totalCluster++;
        return groupItem.status == "Tích cực" ? groupAcc + 1 : groupAcc;
      }, 0);

      return acc + currentCount;
    },
    0,
  );

  const chartIconClasses = "size-4";
  let isPositive = true;
  let numerator = positiveCount;

  if (positiveCount - totalCluster / 2 < 0) {
    numerator = totalCluster - positiveCount;
    isPositive = false;
  }

  const chartIconEl = isPositive ? (
    <PiChartLineUpBold className={chartIconClasses} />
  ) : (
    <PiChartLineDownBold className={chartIconClasses} />
  );

  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-white text-xs ${isPositive ? "bg-green-400" : "bg-red-400"}`}
    >
      {numerator}/{totalCluster} nhóm {chartIconEl}
    </span>
  );
};
