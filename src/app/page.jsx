"use client"

import { useState } from "react"
import { useExpenses } from "@/hooks/use-expenses"
import ExpenseForm from "@/components/expense-form"
import ExpenseList from "@/components/expense-list"
import InsightsDashboard from "@/components/insights-dashboard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, BarChart3, List, TrendingUp } from "lucide-react"

export default function Home() {
  const { expenses, loading, addExpense, deleteExpense } = useExpenses()
  const [showForm, setShowForm] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Expense Tracker</h1>
          <p className="text-gray-600">Smart expense tracking with AI-powered categorization</p>
        </header>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>

            {showForm && (
              <div className="mb-6">
                <ExpenseForm
                  onSubmit={(expenseData) => {
                    addExpense(expenseData)
                    setShowForm(false)
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            <InsightsDashboard />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">All Expenses</h2>
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>

            {showForm && (
              <div className="mb-6">
                <ExpenseForm
                  onSubmit={(expenseData) => {
                    addExpense(expenseData)
                    setShowForm(false)
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-2xl font-semibold">Spending Insights</h2>
            <InsightsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
