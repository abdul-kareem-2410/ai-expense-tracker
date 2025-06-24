// Simple AI categorization based on keywords
const categoryKeywords = {
    "Food & Dining": [
      "restaurant",
      "food",
      "lunch",
      "dinner",
      "breakfast",
      "coffee",
      "pizza",
      "burger",
      "grocery",
      "supermarket",
      "cafe",
      "bar",
      "pub",
      "takeout",
      "delivery",
      "uber eats",
      "doordash",
      "grubhub",
      "starbucks",
      "mcdonald",
      "kfc",
      "subway",
      "domino",
      "taco bell",
    ],
    Transportation: [
      "gas",
      "fuel",
      "uber",
      "lyft",
      "taxi",
      "bus",
      "train",
      "metro",
      "parking",
      "car",
      "vehicle",
      "maintenance",
      "repair",
      "oil change",
      "tire",
      "insurance",
      "toll",
    ],
    Shopping: [
      "amazon",
      "store",
      "mall",
      "clothes",
      "clothing",
      "shoes",
      "electronics",
      "target",
      "walmart",
      "costco",
      "online",
      "purchase",
      "buy",
      "shopping",
      "ebay",
      "etsy",
    ],
    Entertainment: [
      "movie",
      "cinema",
      "netflix",
      "spotify",
      "game",
      "concert",
      "show",
      "theater",
      "streaming",
      "subscription",
      "youtube",
      "disney",
      "hulu",
      "entertainment",
      "ticket",
    ],
    "Bills & Utilities": [
      "electric",
      "electricity",
      "water",
      "gas bill",
      "internet",
      "phone",
      "rent",
      "mortgage",
      "insurance",
      "utility",
      "bill",
      "payment",
      "subscription",
      "cable",
    ],
    Healthcare: [
      "doctor",
      "hospital",
      "pharmacy",
      "medicine",
      "medical",
      "health",
      "dental",
      "prescription",
      "clinic",
      "checkup",
      "treatment",
      "therapy",
      "dentist",
    ],
    Travel: [
      "hotel",
      "flight",
      "airline",
      "booking",
      "vacation",
      "trip",
      "travel",
      "airbnb",
      "expedia",
      "booking.com",
      "rental car",
      "luggage",
      "passport",
    ],
    Education: [
      "school",
      "university",
      "course",
      "book",
      "tuition",
      "education",
      "learning",
      "training",
      "certification",
      "udemy",
      "coursera",
      "textbook",
      "student",
    ],
    Business: [
      "office",
      "supplies",
      "meeting",
      "conference",
      "business",
      "work",
      "professional",
      "software",
      "tools",
      "equipment",
      "service",
      "client",
    ],
    Other: [],
  }
  
  export function categorizeExpense(description) {
    const desc = description.toLowerCase()
    const scores = {}
  
    // Calculate scores for each category
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      let score = 0
      keywords.forEach((keyword) => {
        if (desc.includes(keyword.toLowerCase())) {
          score += keyword.length // Longer keywords get higher scores
        }
      })
      scores[category] = score
    })
  
    // Sort categories by score
    const sortedCategories = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([category]) => category)
  
    const topScore = scores[sortedCategories[0]]
    const confidence = topScore > 0 ? Math.min(topScore / 10, 0.95) : 0.1
  
    return {
      category: topScore > 0 ? sortedCategories[0] : "Other",
      confidence,
      suggestions: sortedCategories.slice(0, 3),
    }
  }
  
  export function generateInsights(expenses) {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
  
    // Calculate category totals
    const categoryTotals = {}
    let totalAmount = 0
  
    expenses.forEach((expense) => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
      totalAmount += expense.amount
    })
  
    const topCategories = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
  
    // Calculate monthly trend (last 6 months)
    const monthlyTotals = {}
  
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1)
      const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      monthlyTotals[monthKey] = 0
    }
  
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date)
      const monthKey = expenseDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      if (monthlyTotals.hasOwnProperty(monthKey)) {
        monthlyTotals[monthKey] += expense.amount
      }
    })
  
    const monthlyTrend = Object.entries(monthlyTotals).map(([month, amount]) => ({
      month,
      amount,
    }))
  
    // Calculate this month's total
    const thisMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })
  
    const totalThisMonth = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const averageDaily = totalThisMonth / now.getDate()
  
    return {
      topCategories,
      monthlyTrend,
      averageDaily,
      totalThisMonth,
    }
  }
  