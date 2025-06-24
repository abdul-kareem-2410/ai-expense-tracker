"use client"

import { useState, useEffect } from "react"
import { ExpenseSchema } from "@/lib/types"
import { categorizeExpense, generateInsights } from "@/lib/ai-categorizer"

export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses)
        setExpenses(parsedExpenses)
      } catch (error) {
        console.error("Error loading expenses:", error)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("expenses", JSON.stringify(expenses))
    }
  }, [expenses, loading])

  const addExpense = (expenseData) => {
    // Use AI to suggest category if not provided or if category is "Other"
    let finalCategory = expenseData.category
    let aiSuggested = false

    if (!expenseData.category || expenseData.category === "Other") {
      const aiResult = categorizeExpense(expenseData.description)
      if (aiResult.confidence > 0.3) {
        finalCategory = aiResult.category
        aiSuggested = true
      }
    }

    const newExpense = {
      ...expenseData,
      category: finalCategory || "Other",
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      aiSuggested,
      tags: expenseData.tags || [],
    }

    const validatedExpense = ExpenseSchema.parse(newExpense)
    setExpenses((prev) => [validatedExpense, ...prev])
    return validatedExpense
  }

  const updateExpense = (id, updates) => {
    setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...updates } : expense)))
  }

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  const getInsights = () => {
    return generateInsights(expenses)
  }

  const getExpensesByCategory = (category) => {
    return expenses.filter((expense) => expense.category === category)
  }

  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
    })
  }

  return {
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    getInsights,
    getExpensesByCategory,
    getExpensesByDateRange,
  }
}
