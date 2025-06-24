"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateExpenseSchema, categories } from "@/lib/types"
import { categorizeExpense } from "@/lib/ai-categorizer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, DollarSign } from "lucide-react"

export default function ExpenseForm({ onSubmit, onCancel }) {
  const [aiSuggestion, setAiSuggestion] = useState(null)

  const form = useForm({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
      tags: [],
    },
  })

  const watchDescription = form.watch("description")

  // AI suggestion when description changes
  useEffect(() => {
    if (watchDescription && watchDescription.length > 3) {
      const suggestion = categorizeExpense(watchDescription)
      setAiSuggestion(suggestion)
    } else {
      setAiSuggestion(null)
    }
  }, [watchDescription])

  const handleSubmit = (data) => {
    onSubmit(data)
    form.reset()
    setAiSuggestion(null)
  }

  const applySuggestion = (category) => {
    form.setValue("category", category)
    setAiSuggestion(null)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="What did you spend on? (e.g., Lunch at McDonald's)"
              {...form.register("description")}
              className="text-lg"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>

          {aiSuggestion && aiSuggestion.confidence > 0.3 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI Suggestion</span>
                <Badge variant="secondary" className="text-xs">
                  {Math.round(aiSuggestion.confidence * 100)}% confident
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiSuggestion.suggestions.slice(0, 3).map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => applySuggestion(category)}
                    className="text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                step="0.01"
                placeholder="Amount"
                {...form.register("amount", { valueAsNumber: true })}
              />
              {form.formState.errors.amount && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.amount.message}</p>
              )}
            </div>

            <div>
              <Input type="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.date.message}</p>
              )}
            </div>
          </div>

          <div>
            <Select onValueChange={(value) => form.setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.category.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Add Expense
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
