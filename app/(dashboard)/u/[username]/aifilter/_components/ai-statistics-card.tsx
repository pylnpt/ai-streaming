"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingDown, Calendar } from "lucide-react";

interface AIStatisticsCardProps {
  stats: {
    totalFiltered: number;
    categoryCount: Record<string, number>;
    dailyCount: Record<string, number>;
  };
}

export const AIStatisticsCard = ({ stats }: AIStatisticsCardProps) => {
  // Sort categories by count
  const sortedCategories = Object.entries(stats.categoryCount).sort(
    ([, a], [, b]) => b - a
  );

  // Get last 7 days for display
  const last7Days = Object.entries(stats.dailyCount)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7);

  // Calculate percentage for each category
  const getCategoryPercentage = (count: number) => {
    if (stats.totalFiltered === 0) return 0;
    return ((count / stats.totalFiltered) * 100).toFixed(1);
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full border-2 border-primary rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Filter Statistics (Last 7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Filtered */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Total Filtered Messages</p>
            <p className="text-3xl font-bold">{stats.totalFiltered}</p>
          </div>
          <TrendingDown className="h-8 w-8 text-primary" />
        </div>

        {/* Category Breakdown */}
        {sortedCategories.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4" />
              By Category
            </div>
            <div className="space-y-2">
              {sortedCategories.map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {getCategoryPercentage(count)}%
                      </span>
                      <span className="font-bold">{count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${getCategoryPercentage(count)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Breakdown */}
        {last7Days.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              By Day
            </div>
            <div className="space-y-2">
              {last7Days.map(([date, count]) => (
                <div
                  key={date}
                  className="flex justify-between items-center text-sm p-2 bg-muted rounded"
                >
                  <span className="font-medium">{formatDate(date)}</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats.totalFiltered === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No messages filtered yet</p>
            <p className="text-sm mt-2">
              Statistics will appear here once the filter starts working
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
