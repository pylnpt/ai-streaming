"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToxicityModel } from "@/hooks/use-toxicity-model";
import { useState } from "react";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface AITestMessageCardProps {
  threshold: number;
  toxicityLabels: string[];
}

export const AITestMessageCard = ({
  threshold,
  toxicityLabels,
}: AITestMessageCardProps) => {
  const [testMessage, setTestMessage] = useState("");
  const [testResult, setTestResult] = useState<{
    isToxic: boolean;
    label?: string;
    allPredictions?: Array<{ label: string; match: boolean | null; probabilities: number[] }>;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const { checkToxicity, isLoading: modelLoading } = useToxicityModel(
    threshold,
    toxicityLabels
  );

  const handleTest = async () => {
    if (!testMessage.trim()) return;

    setIsTesting(true);
    setTestResult(null);

    try {
      // Get detailed predictions
      const result = await checkToxicity(testMessage, true);
      setTestResult(result);
    } catch (error) {
      console.error("Test error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  const getConfidenceColor = (prob: number) => {
    if (prob >= threshold) return "text-red-500 font-bold";
    if (prob >= threshold - 0.1) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <Card className="w-full border-2 border-primary rounded-lg">
      <CardHeader>
        <CardTitle>Test Message Filter</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Test how your current settings would filter a message
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message to test..."
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTest();
            }}
            disabled={modelLoading || isTesting}
          />
          <Button
            onClick={handleTest}
            disabled={!testMessage.trim() || modelLoading || isTesting}
          >
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              "Test"
            )}
          </Button>
        </div>

        {modelLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading AI model...
          </div>
        )}

        {testResult && (
          <div className="space-y-3 mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              {testResult.isToxic ? (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-500">
                    Would be FILTERED
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-500">
                    Would be ALLOWED
                  </span>
                </>
              )}
            </div>

            {testResult.isToxic && testResult.label && (
              <div className="text-sm">
                <span className="text-muted-foreground">Detected category:</span>{" "}
                <span className="font-medium">{testResult.label}</span>
              </div>
            )}

            {testResult.allPredictions && (
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertCircle className="h-4 w-4" />
                  Detailed Analysis:
                </div>
                <div className="space-y-1 text-xs">
                  {testResult.allPredictions.map((pred) => (
                    <div
                      key={pred.label}
                      className="flex justify-between items-center p-2 bg-background rounded"
                    >
                      <span className="font-medium">{pred.label}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={getConfidenceColor(
                            pred.probabilities[1] || 0
                          )}
                        >
                          {((pred.probabilities[1] || 0) * 100).toFixed(1)}%
                        </span>
                        {pred.match === true && (
                          <XCircle className="h-3 w-3 text-red-500" />
                        )}
                        {pred.match === false && (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Threshold: {(threshold * 100).toFixed(0)}% - Messages above
                  this confidence are filtered
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
