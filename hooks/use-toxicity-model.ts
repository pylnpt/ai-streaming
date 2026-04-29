"use client";

import { useEffect, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

// Global cache for the model to avoid reloading
let globalModel: toxicity.ToxicityClassifier | null = null;
let globalThreshold: number | null = null;
let globalLabels: string[] | null = null;
let modelLoading = false;

export const useToxicityModel = (threshold: number, labels: string[]) => {
  const [model, setModel] = useState<toxicity.ToxicityClassifier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Track if settings changed
  const settingsChanged =
    globalThreshold !== threshold ||
    JSON.stringify(globalLabels) !== JSON.stringify(labels);

  useEffect(() => {
    const loadModel = async () => {
      // If model exists and settings haven't changed, reuse it
      if (globalModel && !settingsChanged) {
        setModel(globalModel);
        return;
      }

      // If another component is already loading, wait
      if (modelLoading) {
        const checkInterval = setInterval(() => {
          if (!modelLoading && globalModel) {
            setModel(globalModel);
            clearInterval(checkInterval);
          }
        }, 100);
        return;
      }

      try {
        modelLoading = true;
        setIsLoading(true);
        setError(null);

        const loadedModel = await toxicity.load(threshold, labels);

        // Cache globally
        globalModel = loadedModel;
        globalThreshold = threshold;
        globalLabels = labels;

        setModel(loadedModel);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to load model");
        setError(error);
        console.error("Failed to load toxicity model:", error);
      } finally {
        modelLoading = false;
        setIsLoading(false);
      }
    };

    loadModel();
  }, [threshold, JSON.stringify(labels), settingsChanged]);

  const checkToxicity = async (
    text: string,
    detailed: boolean = false
  ): Promise<{
    isToxic: boolean;
    label?: string;
    allPredictions?: Array<{
      label: string;
      match: boolean | null;
      probabilities: number[];
    }>;
  }> => {
    if (!model) {
      return { isToxic: false };
    }

    try {
      const predictions = await model.classify([text]);

      let isToxic = false;
      let matchedLabel: string | undefined;

      // Check for toxic content
      for (const prediction of predictions) {
        const matchResult = prediction.results[0];

        if (matchResult.match) {
          isToxic = true;
          matchedLabel = prediction.label;
          break;
        }
      }

      // If detailed analysis requested, include all predictions
      if (detailed) {
        const allPredictions = predictions.map((p) => ({
          label: p.label,
          match: p.results[0].match,
          probabilities: Array.from(p.results[0].probabilities),
        }));

        return {
          isToxic,
          label: matchedLabel,
          allPredictions,
        };
      }

      return {
        isToxic,
        label: matchedLabel,
      };
    } catch (err) {
      console.error("Error checking toxicity:", err);
      return { isToxic: false };
    }
  };

  return {
    model,
    isLoading,
    error,
    checkToxicity,
  };
};
