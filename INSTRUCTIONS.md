# Aptitude MCQ Test App

A React-based Multiple Choice Question (MCQ) test application for aptitude practice, featuring questions from R.S. Aggarwal's Quantitative Aptitude book.

## Features

- ✅ Interactive MCQ interface
- ⏱️ Built-in timer to track completion time
- 📊 Instant score calculation with grade
- 📝 Detailed explanations for each answer
- 🎯 Progress tracking
- 📱 Responsive design for all devices
- 🔄 Ability to review and change answers

## Getting Started

### Installation

The app is already set up! To start the development server:

```bash
cd aptitude-mcq-app
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Adding Questions from Your Book

You have the R.S. Aggarwal Quantitative Aptitude PDF. Here's how to add questions to the app:

### Question Format

All questions are stored in `src/data/questions.json`. Each question follows this structure:

```json
{
  "id": 1,
  "category": "Arithmetic",
  "topic": "Percentages",
  "question": "What is 25% of 80?",
  "options": ["15", "20", "25", "30"],
  "correctAnswer": 1,
  "explanation": "25% of 80 = (25/100) × 80 = 20"
}
```

### Field Descriptions:

- **id**: Unique number for each question (increment for each new question)
- **category**: Main category (e.g., "Arithmetic", "Algebra", "Geometry", "Data Interpretation")
- **topic**: Specific topic (e.g., "Percentages", "Simple Interest", "Time and Work")
- **question**: The question text
- **options**: Array of 4 answer choices
- **correctAnswer**: Index of correct answer (0-3, where 0 is the first option)
- **explanation**: Step-by-step solution

### Common Categories from R.S. Aggarwal:

1. **Arithmetic**
   - Percentages
   - Profit and Loss
   - Simple Interest
   - Compound Interest
   - Time and Work
   - Time and Distance
   - Ratio and Proportion
   - Averages

2. **Algebra**
   - Linear Equations
   - Quadratic Equations
   - Progressions

3. **Geometry**
   - Areas
   - Volumes
   - Triangles

4. **Data Interpretation**
   - Tables
   - Graphs
   - Charts

### Example: Adding a New Question

Open `src/data/questions.json` and add to the array:

```json
{
  "id": 6,
  "category": "Arithmetic",
  "topic": "Profit and Loss",
  "question": "A shopkeeper sells an item at 20% profit. If he had bought it at 10% less and sold it for Rs. 5 more, he would have gained 25%. What is the cost price?",
  "options": ["Rs. 100", "Rs. 150", "Rs. 200", "Rs. 250"],
  "correctAnswer": 2,
  "explanation": "Let CP = x. Selling at 20% profit: SP = 1.2x. New CP = 0.9x, New SP = 0.9x × 1.25 = 1.125x. Given: 1.125x = 1.2x + 5. Solving: x = 200"
}
```

## Tips for Adding Questions:

1. **Start with easier topics** like Percentages, Averages
2. **Keep explanations clear** - break down the solution step by step
3. **Verify your answers** before adding them
4. **Group similar topics** together for better organization
5. **Use consistent formatting** for mathematical expressions

## App Structure

```
src/
├── components/
│   ├── Question.jsx         # Question display component
│   ├── Question.css         # Question styling
│   ├── Navigation.jsx       # Navigation controls
│   ├── Navigation.css       # Navigation styling
│   ├── ScoreCard.jsx        # Results and score display
│   └── ScoreCard.css        # Score card styling
├── data/
│   └── questions.json       # All questions data
├── App.jsx                  # Main app component
├── App.css                  # Main app styling
└── index.css                # Global styles
```

## Customization

### Change App Colors

Edit the gradient in `App.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Features

Some ideas:
- Add a countdown timer
- Category-wise filtering
- Difficulty levels
- Save progress to localStorage
- Export results as PDF

## Sample Questions Included

The app comes with 5 sample questions covering:
- Percentages
- Simple Interest
- Averages
- Ratio and Proportion
- Time and Work

You can use these as templates for adding more questions from your book.

## Technologies Used

- React 18
- Vite
- CSS3

## Contributing

Feel free to add more questions and improve the app!

---

**Happy Learning! 📚**
