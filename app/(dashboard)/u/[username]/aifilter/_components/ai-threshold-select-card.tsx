"use client";

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle 
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { 
    RadioGroup,
    RadioGroupItem 
} from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { AIThreshold } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateUserThreshold } from "@/lib/profanity-service";

interface AIThresholdSelectCardProps {
    userId: string;
    userThreshold:  AIThreshold | null;
    everyThreshold: AIThreshold[];
}

// Adjusted schema to store a single string threshold value
const FormSchema = z.object({
    threshold: z.string().nonempty("Please select a threshold"),
});

export const AIThresholdSelectCard = ({ 
    userId,
    userThreshold,
    everyThreshold,
}: AIThresholdSelectCardProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            threshold: userThreshold?.value !== undefined
                ? userThreshold?.value.toString() 
                : "0.9", // Default to user's threshold or 0.9
        },
    });


    // Update selected value on radio change
    const onValueChange = (value: string) => {
        form.setValue("threshold", value);
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        startTransition(()=>{
            updateUserThreshold(userId, data.threshold)
            .then(() => { toast.success(`Threshold successfully updated.`)})
            .catch(() => {toast.error("Something went wrong with the update.\nPlease try again later.")})
        })
    } 

    return (
        <Card className="w-full max-w-md p-6 min-h-[450px] border-2 border-primary rounded">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Select AI Threshold</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField 
                            control={form.control}
                            name="threshold"
                            render={({ field }) => (
                                <RadioGroup 
                                    value={field.value} 
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        onValueChange(value);
                                    }} 
                                    className="flex flex-col space-y-4"
                                >
                                    {everyThreshold.map((threshold) => (
                                        <FormItem key={threshold.value.toString()} className="flex items-center space-x-3">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={threshold.value.toString()}
                                                    id={threshold.value.toString()}
                                                />
                                            </FormControl>
                                            <FormLabel htmlFor={threshold.value.toString()} className="font-medium text-primary">
                                                {threshold.label}
                                            </FormLabel>
                                            <p className="ml-6 text-sm text-muted-foreground">
                                                {threshold.description}
                                            </p>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                    </CardContent>
                    <Button type="submit" className="mt-4 w-full" disabled={isPending}>
                        Submit
                    </Button>
                </form>
            </Form>
        </Card>
    );
};
