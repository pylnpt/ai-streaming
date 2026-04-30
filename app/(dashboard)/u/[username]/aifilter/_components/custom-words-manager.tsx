"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Shield, Ban } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useCustomWords } from "@/hooks/use-custom-words";
import type { WordTypeLiteral } from "@/lib/custom-words-utils";

interface CustomWord {
  id: string;
  word: string;
  type: WordTypeLiteral;
  caseSensitive: boolean;
}

interface CustomWordsManagerProps {
  userId: string;
  customWords: CustomWord[];
}

export const CustomWordsManager = ({
  userId,
  customWords,
}: CustomWordsManagerProps) => {
  const [newWord, setNewWord] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { add, remove, isPending } = useCustomWords(userId);

  const whitelist = customWords.filter((w) => w.type === "WHITELIST");
  const blacklist = customWords.filter((w) => w.type === "BLACKLIST");

  const handleAdd = async (type: WordTypeLiteral) => {
    if (!newWord.trim()) {
      toast.error("Please enter a word");
      return;
    }
    try {
      await add(newWord.trim(), type, caseSensitive);
      toast.success(`Added to ${type.toLowerCase()}`);
      setNewWord("");
      setCaseSensitive(false);
    } catch {
      toast.error("Failed to add word");
    }
  };

  const handleDelete = async (wordId: string) => {
    try {
      await remove(wordId);
      toast.success("Word removed");
    } catch {
      toast.error("Failed to remove word");
    }
  };

  return (
    <Card className="w-full border-2 border-primary rounded-lg">
      <CardHeader>
        <CardTitle>Custom Word Lists</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Add words to always block (blacklist) or never block (whitelist)
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="whitelist" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="whitelist">
              <Shield className="h-4 w-4 mr-2" />
              Whitelist ({whitelist.length})
            </TabsTrigger>
            <TabsTrigger value="blacklist">
              <Ban className="h-4 w-4 mr-2" />
              Blacklist ({blacklist.length})
            </TabsTrigger>
          </TabsList>

          {/* Whitelist Tab */}
          <TabsContent value="whitelist" className="space-y-4">
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="text-muted-foreground">
                Messages containing these words will <strong>never</strong> be filtered
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add word to whitelist..."
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd("WHITELIST");
                  }}
                  disabled={isPending}
                />
                <Button
                  onClick={() => handleAdd("WHITELIST")}
                  disabled={!newWord.trim() || isPending}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Switch
                  checked={caseSensitive}
                  onCheckedChange={setCaseSensitive}
                  disabled={isPending}
                />
                <span className="text-muted-foreground">Case sensitive</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {whitelist.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No whitelisted words yet
                </p>
              ) : (
                whitelist.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{word.word}</span>
                      {word.caseSensitive && (
                        <Badge variant="secondary" className="text-xs">
                          Aa
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(word.id)}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Blacklist Tab */}
          <TabsContent value="blacklist" className="space-y-4">
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="text-muted-foreground">
                Messages containing these words will <strong>always</strong> be filtered
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add word to blacklist..."
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd("BLACKLIST");
                  }}
                  disabled={isPending}
                />
                <Button
                  onClick={() => handleAdd("BLACKLIST")}
                  disabled={!newWord.trim() || isPending}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Switch
                  checked={caseSensitive}
                  onCheckedChange={setCaseSensitive}
                  disabled={isPending}
                />
                <span className="text-muted-foreground">Case sensitive</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {blacklist.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No blacklisted words yet
                </p>
              ) : (
                blacklist.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{word.word}</span>
                      {word.caseSensitive && (
                        <Badge variant="secondary" className="text-xs">
                          Aa
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(word.id)}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
