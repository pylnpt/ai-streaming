"use client";

import * as z from 'zod';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/ui/loading-button';
import MultipleSelector from '@/components/ui/multi-select-picker';
import { AIFilter, User } from '@prisma/client';
import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfanityFilters, updateProfanityStatus } from '@/lib/profanity-service';
import { Filter } from '@/lib/types';

interface AIFilterSelectCardProps {
    everyFilter: AIFilter[]
    activeFilters: Filter[] | undefined
    user: User,
}

const optionSchema = z.object({
  label:    z.string(),
  value:    z.string(),
  id:       z.string(),
  disable:  z.boolean().optional(),
});
  
const FormSchema = z.object({
    frameworks: z.array(optionSchema).min(0),
});

export const AIFilterSelectCard = ({
    everyFilter,
    activeFilters,
    user,
}: AIFilterSelectCardProps) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFilters, setSelectedFilters] = useState<Filter[] | undefined >(activeFilters);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    
    const OPTIONS: { label: string; value: string, id: string }[] = everyFilter.map(filter => ({
        id:     filter.id,
        label: filter.label,
        value: filter.value,
    }));

    const SELECTEDOPTIONS: { label: string; value: string, id: string }[] | undefined = selectedFilters?.map(filter => ({
        label: filter.label,
        value: filter.value,
        id: filter.id
    }));

    // const upsertUserFilters = async (
    //     userId: string,
    //     filterIds: {
    //         frameworks: {
    //             id: string 
    //         }[] }) => {
    //     try {
    //         const response = await fetch('/api/userFiltersUpsert', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ userId, filterIds }),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`Failed to upsert user filters: ${response.statusText}`);
    //         }
    
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error during API call:', error);
    //         throw error;
    //     }
    // };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(() => {
            // upsertUserFilters(user.id, data)
            updateProfanityFilters(user, data)
            .then((res) => {
                toast.success(`Filter change was successfull`)
                setSelectedFilters(res)
                if(res.length === 0){
                    updateProfanityStatus(user, false);
                }
            })
            .catch((err) => {toast.error(`Filter change was unsuccessfull`) 
                console.log(err)})
        });
    }  

    return (
        <Card className="bg-background 
            p-6 
            border-2 
            border-primary 
            w-full 
            max-w-md 
            min-h-[450px] 
            rounded-lg shadow-lg">
    <CardHeader>
        <CardTitle>
            Select the AI Filters
        </CardTitle>
    </CardHeader>
    <CardContent>
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="w-full flex flex-col space-y-40 justify-between h-full">
                <div className="space-y-6">
                    <FormField 
                        control={form.control}
                        name="frameworks"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="w-full">
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={OPTIONS}
                                        value={SELECTEDOPTIONS}
                                        hidePlaceholderWhenSelected={true}
                                        placeholder="Select your filters..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-muted-foreground">
                                                No results found.
                                            </p>
                                        }
                                        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-center mt-64">
                    <LoadingButton 
                        loading={isPending} 
                        type="submit"
                        className="
                            w-full 
                            max-w-xs 
                            bg-primary 
                            hover:bg-primary-dark 
                            py-2 px-4 
                            rounded-md"
                            >
                        Submit
                    </LoadingButton>
                </div>
            </form>
        </Form>
    </CardContent>
</Card>


      );
}
export const AIFilterSelectCardSkeleton = () => {

}