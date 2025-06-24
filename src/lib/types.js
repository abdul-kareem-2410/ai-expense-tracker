import { z } from "zod"

export const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Business",
  "Other",
]

export const ExpenseSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  amount: z.number().min(0.01, "Amount must be positive"),
  category: z.string(),
  date: z.string(),
  createdAt: z.string(),
  aiSuggested: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
})

export const CreateExpenseSchema = ExpenseSchema.omit({
  id: true,
  createdAt: true,
  aiSuggested: true,
})
