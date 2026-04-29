"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Shield, Ban } from "lucide-react";
import { toast } from "sonner";
import { addCustomWord, deleteCustomWord } from "@/lib/custom-words-service";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

interface CustomWord {
  id: string;
  word: string;
  type: string;
  caseSensitive: boolean;
}

interface AICustomWordsCardProps {
  userId: string;
  customWords: CustomWord[];
}

export const AICustomWordsCard = ({
  userId,
  customWords,
}: AICustomWordsCardProps) => {
  const [newWord, setNewWord] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const whitelist = customWords.filter((w) => w.type === "whitelist");
  const blacklist = customWords.filter((w) => w.type === "blacklist");

  const handleAdd = (type: "whitelist" | "blacklist") => {
    if (!newWord.trim()) {
      toast.error("Please enter a word");
      return;
    }

    startTransition(async () => {
      try {
        await addCustomWord(userId, newWord.trim(), type, caseSensitive);
        toast.success(`Added to ${type}`);
        setNewWord("");
        setCaseSensitive(false);
        router.refresh();
      } catch {
        toast.error(`Failed to add word`);
      }
    });
  };

  const handleDelete = (wordId: string) => {
    startTransition(async () => {
      try {
        await deleteCustomWord(wordId, userId);
        toast.success("Word removed");
        router.refresh();
      } catch {
        toast.error("Failed to remove word");
      }
    });
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
                    if (e.key === "Enter") handleAdd("whitelist");
                  }}
                  disabled={isPending}
                />
                <Button
                  onClick={() => handleAdd("whitelist")}
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
                    if (e.key === "Enter") handleAdd("blacklist");
                  }}
                  disabled={isPending}
                />
                <Button
                  onClick={() => handleAdd("blacklist")}
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
