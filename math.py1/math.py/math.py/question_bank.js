// Question Bank with Difficulty Levels
// Each topic has 75 questions (25 Easy, 25 Medium, 25 Hard)
// Questions are selected randomly from each difficulty to form a 15-question test

const questionBankWithDifficulty = {
  algebra: {
    easy: [
      { question: "Solve: x + 5 = 12", options: ["5", "7", "8", "6"], correct: 1, subtopic: "Linear Equations", solution: "x = 12 - 5 = 7" },
      { question: "What is 3x when x = 4?", options: ["7", "12", "10", "15"], correct: 1, subtopic: "Substitution", solution: "3 × 4 = 12" },
      { question: "Simplify: 2a + 3a", options: ["5a", "6a", "5a²", "6"], correct: 0, subtopic: "Like Terms", solution: "2 + 3 = 5, so 5a" },
      { question: "Solve: 2x = 10", options: ["2", "5", "8", "20"], correct: 1, subtopic: "Linear Equations", solution: "x = 10/2 = 5" },
      { question: "Solve: x - 8 = 15", options: ["7", "23", "8", "22"], correct: 1, subtopic: "Linear Equations", solution: "x = 15 + 8 = 23" },
      { question: "Find 5y if y = 3", options: ["8", "15", "12", "2"], correct: 1, subtopic: "Substitution", solution: "5 × 3 = 15" },
      { question: "Simplify: 7b - 2b", options: ["5b", "9b", "5", "14b"], correct: 0, subtopic: "Like Terms", solution: "7 - 2 = 5, so 5b" },
      { question: "Solve: x/4 = 3", options: ["12", "7", "1", "0.75"], correct: 0, subtopic: "Linear Equations", solution: "x = 3 × 4 = 12" },
      { question: "What is 2x + 3 when x = 5?", options: ["10", "13", "16", "8"], correct: 1, subtopic: "Substitution", solution: "2(5) + 3 = 13" },
      { question: "Solve: 3x = 21", options: ["7", "18", "24", "63"], correct: 0, subtopic: "Linear Equations", solution: "x = 21/3 = 7" },
      { question: "Simplify: 4m + 2m - m", options: ["5m", "7m", "6m", "3m"], correct: 0, subtopic: "Like Terms", solution: "4 + 2 - 1 = 5m" },
      { question: "Solve: x + 12 = 20", options: ["8", "32", "12", "-8"], correct: 0, subtopic: "Linear Equations", solution: "x = 20 - 12 = 8" },
      { question: "What is x² when x = 5?", options: ["10", "25", "125", "5"], correct: 1, subtopic: "Exponents", solution: "5² = 25" },
      { question: "Solve: x - 3 = 7", options: ["4", "10", "-4", "21"], correct: 1, subtopic: "Linear Equations", solution: "x = 7 + 3 = 10" },
      { question: "Find 4a if a = 8", options: ["12", "2", "32", "48"], correct: 2, subtopic: "Substitution", solution: "4 × 8 = 32" },
      { question: "Simplify: 9x - 9x", options: ["0", "18x", "x", "1"], correct: 0, subtopic: "Like Terms", solution: "9x - 9x = 0" },
      { question: "Solve: 6x = 42", options: ["7", "36", "48", "252"], correct: 0, subtopic: "Linear Equations", solution: "x = 42/6 = 7" },
      { question: "What is x/2 when x = 16?", options: ["32", "8", "14", "4"], correct: 1, subtopic: "Division", solution: "16/2 = 8" },
      { question: "Solve: 2x + 4 = 12", options: ["4", "8", "16", "6"], correct: 0, subtopic: "Linear Equations", solution: "2x = 8, x = 4" },
      { question: "Find 3x - 2 when x = 4", options: ["10", "14", "6", "12"], correct: 0, subtopic: "Substitution", solution: "3(4) - 2 = 10" },
      { question: "Simplify: x + x + x", options: ["3x", "x³", "3", "xxx"], correct: 0, subtopic: "Like Terms", solution: "1x + 1x + 1x = 3x" },
      { question: "Solve: 5x = 35", options: ["7", "30", "40", "175"], correct: 0, subtopic: "Linear Equations", solution: "x = 35/5 = 7" },
      { question: "What is (x)(x) when x = 6?", options: ["12", "36", "6", "66"], correct: 1, subtopic: "Multiplication", solution: "6 × 6 = 36" },
      { question: "Solve: x + 7 = 12", options: ["4", "5", "6", "7"], correct: 1, subtopic: "Linear Equations", solution: "x = 12 - 7 = 5" },
      { question: "Simplify: 5x - 3x + 2x", options: ["2x", "3x", "4x", "5x"], correct: 2, subtopic: "Like Terms", solution: "(5 - 3 + 2)x = 4x" }
    ],
    medium: [
      { question: "Solve: 3x + 7 = 22", options: ["3", "5", "7", "15"], correct: 1, subtopic: "Linear Equations", solution: "3x = 15, x = 5" },
      { question: "Factorize: x² + 5x + 6", options: ["(x+2)(x+3)", "(x+1)(x+6)", "(x-2)(x-3)", "(x+5)(x+1)"], correct: 0, subtopic: "Factoring", solution: "Factors of 6 that add to 5: 2,3" },
      { question: "Solve: 2(x - 3) = 8", options: ["7", "5.5", "4", "11"], correct: 0, subtopic: "Linear Equations", solution: "2x - 6 = 8, x = 7" },
      { question: "What is the slope of y = 3x + 5?", options: ["5", "3", "8", "15"], correct: 1, subtopic: "Linear Functions", solution: "m = 3 in y = mx + b" },
      { question: "Simplify: (x²)(x³)", options: ["x⁵", "x⁶", "2x⁵", "x⁸"], correct: 0, subtopic: "Exponents", solution: "2 + 3 = 5, so x⁵" },
      { question: "Solve: 4x - 9 = 15", options: ["6", "3", "24", "1"], correct: 0, subtopic: "Linear Equations", solution: "4x = 24, x = 6" },
      { question: "Factorize: x² - 9", options: ["(x+3)(x-3)", "(x+9)(x-1)", "(x-9)(x+1)", "(x+3)²"], correct: 0, subtopic: "Difference of Squares", solution: "x² - 9 = (x+3)(x-3)" },
      { question: "Find y-intercept of y = 2x - 7", options: ["-7", "2", "7", "0"], correct: 0, subtopic: "Linear Functions", solution: "Y-intercept is -7" },
      { question: "Solve: 3(2x + 1) = 21", options: ["3", "7", "4", "6"], correct: 0, subtopic: "Linear Equations", solution: "6x + 3 = 21, x = 3" },
      { question: "Simplify: x⁴ / x²", options: ["x²", "x⁶", "x", "1"], correct: 0, subtopic: "Exponents", solution: "4 - 2 = 2, so x²" },
      { question: "Solve: 5x + 3 = 2x + 15", options: ["4", "6", "3", "5"], correct: 0, subtopic: "Linear Equations", solution: "3x = 12, x = 4" },
      { question: "Factorize: 2x² + 4x", options: ["2x(x+2)", "2(x²+4x)", "x(2x+4)", "4x(x+1)"], correct: 0, subtopic: "Common Factor", solution: "Factor out 2x" },
      { question: "Find slope between (1,2) and (3,8)", options: ["3", "2", "6", "4"], correct: 0, subtopic: "Slope", solution: "(8-2)/(3-1) = 3" },
      { question: "Solve: x² = 49", options: ["±7", "7", "24.5", "98"], correct: 0, subtopic: "Square Roots", solution: "x = ±7" },
      { question: "Simplify: (a²b)(ab³)", options: ["a³b⁴", "a²b⁴", "a³b³", "ab⁵"], correct: 0, subtopic: "Exponents", solution: "a^(2+1)b^(1+3) = a³b⁴" },
      { question: "Solve: 2(3x - 4) = 10", options: ["3", "7", "1", "9"], correct: 0, subtopic: "Linear Equations", solution: "6x - 8 = 10, x = 3" },
      { question: "Factorize: x² - 16", options: ["(x+4)(x-4)", "(x-8)(x+2)", "(x+16)(x-1)", "(x-4)²"], correct: 0, subtopic: "Difference of Squares", solution: "x² - 16 = (x+4)(x-4)" },
      { question: "Find x-intercept of y = 2x - 6", options: ["3", "-6", "2", "-3"], correct: 0, subtopic: "Linear Functions", solution: "0 = 2x - 6, x = 3" },
      { question: "Solve: x/3 + 2 = 5", options: ["9", "1", "21", "7"], correct: 0, subtopic: "Linear Equations", solution: "x/3 = 3, x = 9" },
      { question: "Simplify: (3x²)²", options: ["9x⁴", "6x⁴", "9x²", "3x⁴"], correct: 0, subtopic: "Exponents", solution: "3² = 9, (x²)² = x⁴" },
      { question: "Solve: 4x - 5 = 3x + 2", options: ["7", "-3", "3", "1"], correct: 0, subtopic: "Linear Equations", solution: "x = 7" },
      { question: "Factorize: x² + 7x + 12", options: ["(x+3)(x+4)", "(x+2)(x+6)", "(x+1)(x+12)", "(x+7)(x+5)"], correct: 0, subtopic: "Factoring", solution: "3 and 4 add to 7" },
      { question: "Find midpoint of (0,0) and (6,8)", options: ["(3,4)", "(6,8)", "(2,3)", "(4,5)"], correct: 0, subtopic: "Coordinate Geometry", solution: "((0+6)/2, (0+8)/2)" },
      { question: "Solve: x² - 25 = 0", options: ["±5", "5", "25", "±25"], correct: 0, subtopic: "Square Roots", solution: "x = ±5" },
      { question: "Simplify: x⁵ × x⁻²", options: ["x³", "x⁷", "x⁻¹⁰", "1/x³"], correct: 0, subtopic: "Exponents", solution: "5 + (-2) = 3" }
    ],
    hard: [
      { question: "Solve: x² - 5x + 6 = 0", options: ["x=2,3", "x=1,6", "x=-2,-3", "x=2,-3"], correct: 0, subtopic: "Quadratic Equations", solution: "(x-2)(x-3)=0" },
      { question: "If f(x) = x² + 2x, find f(3)", options: ["9", "12", "15", "18"], correct: 2, subtopic: "Functions", solution: "9 + 6 = 15" },
      { question: "Solve: |2x - 4| = 6", options: ["x=5,-1", "x=5,1", "x=-5,1", "x=-1,-5"], correct: 0, subtopic: "Absolute Value", solution: "2x-4=6 or 2x-4=-6" },
      { question: "Find x: log₂(x) = 3", options: ["6", "8", "9", "3"], correct: 1, subtopic: "Logarithms", solution: "2³ = 8" },
      { question: "Simplify: (2x³y²)²", options: ["4x⁶y⁴", "2x⁶y⁴", "4x⁵y⁴", "4x⁶y²"], correct: 0, subtopic: "Exponents", solution: "4x⁶y⁴" },
      { question: "Solve using quadratic formula: x² + 4x - 5 = 0", options: ["x=1,-5", "x=-1,5", "x=5,-1", "x=2,-2"], correct: 0, subtopic: "Quadratic Formula", solution: "x = 1 or x = -5" },
      { question: "Find domain of f(x) = 1/(x-3)", options: ["x≠3", "x>3", "x<3", "All real"], correct: 0, subtopic: "Functions", solution: "x ≠ 3" },
      { question: "Solve: 2^(x+1) = 16", options: ["3", "4", "2", "5"], correct: 0, subtopic: "Exponential Equations", solution: "x + 1 = 4" },
      { question: "If f(x)=x² and g(x)=x+1, find f(g(2))", options: ["9", "5", "4", "8"], correct: 0, subtopic: "Composite Functions", solution: "g(2)=3, f(3)=9" },
      { question: "Solve: √(x+5) = 4", options: ["11", "9", "16", "21"], correct: 0, subtopic: "Radical Equations", solution: "x + 5 = 16" },
      { question: "Solve: x² - 4x - 12 = 0", options: ["x=6,-2", "x=-6,2", "x=4,-3", "x=3,-4"], correct: 0, subtopic: "Quadratic Equations", solution: "(x-6)(x+2)=0" },
      { question: "Find vertex of y = x² - 6x + 5", options: ["(3,-4)", "(3,4)", "(-3,-4)", "(6,5)"], correct: 0, subtopic: "Parabolas", solution: "x = 3, y = -4" },
      { question: "Solve: 3^x = 81", options: ["4", "3", "27", "81"], correct: 0, subtopic: "Exponential Equations", solution: "3⁴ = 81" },
      { question: "If f(x) = 2x - 1, find f⁻¹(x)", options: ["(x+1)/2", "2x+1", "(x-1)/2", "1/(2x-1)"], correct: 0, subtopic: "Inverse Functions", solution: "y = (x+1)/2" },
      { question: "Solve: x³ = 27", options: ["3", "9", "27", "81"], correct: 0, subtopic: "Cube Roots", solution: "∛27 = 3" },
      { question: "Solve: 2x² - 8x = 0", options: ["x=0,4", "x=0,2", "x=4,-4", "x=2,-2"], correct: 0, subtopic: "Quadratic Equations", solution: "2x(x-4)=0" },
      { question: "Find range of f(x) = x² + 1", options: ["y≥1", "y≥0", "All real", "y>1"], correct: 0, subtopic: "Functions", solution: "Min at y=1" },
      { question: "Solve: log₁₀(x) = 2", options: ["100", "20", "10", "1000"], correct: 0, subtopic: "Logarithms", solution: "10² = 100" },
      { question: "Find sum of roots: x² + 7x + 10 = 0", options: ["-7", "7", "10", "-10"], correct: 0, subtopic: "Vieta's Formulas", solution: "-b/a = -7" },
      { question: "Solve: |x + 3| = 7", options: ["x=4,-10", "x=4,10", "x=-4,10", "x=-4,-10"], correct: 0, subtopic: "Absolute Value", solution: "x = 4 or x = -10" },
      { question: "Solve: x² + x - 6 = 0", options: ["x=2,-3", "x=-2,3", "x=1,-6", "x=6,-1"], correct: 0, subtopic: "Quadratic Equations", solution: "(x+3)(x-2)=0" },
      { question: "Find asymptote of f(x) = 1/x", options: ["x=0, y=0", "x=1", "y=1", "None"], correct: 0, subtopic: "Rational Functions", solution: "x=0, y=0" },
      { question: "Solve: 5^(2x) = 125", options: ["1.5", "3", "2", "25"], correct: 0, subtopic: "Exponential Equations", solution: "2x = 3" },
      { question: "If f(x) = x + 2 and g(x) = x², find g(f(1))", options: ["9", "3", "5", "4"], correct: 0, subtopic: "Composite Functions", solution: "f(1)=3, g(3)=9" },
      { question: "Find discriminant of x² + 2x + 5 = 0", options: ["-16", "16", "0", "4"], correct: 0, subtopic: "Quadratic Formula", solution: "4 - 20 = -16" }
    ]
  },
  geometry: {
    easy: [
      { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1, subtopic: "Polygons", solution: "Hexa = 6" },
      { question: "Area of square with side 5?", options: ["10", "20", "25", "15"], correct: 2, subtopic: "Area", solution: "5² = 25" },
      { question: "Sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1, subtopic: "Angles", solution: "Always 180°" },
      { question: "Perimeter of rectangle 4×6?", options: ["10", "20", "24", "48"], correct: 1, subtopic: "Perimeter", solution: "2(4+6) = 20" },
      { question: "How many vertices does a triangle have?", options: ["2", "3", "4", "5"], correct: 1, subtopic: "Triangles", solution: "3 vertices" },
      { question: "What is diameter if radius is 6?", options: ["3", "6", "12", "36"], correct: 2, subtopic: "Circles", solution: "d = 2r = 12" }
    ],
    medium: [
      { question: "Find hypotenuse with legs 3 and 4", options: ["5", "7", "12", "25"], correct: 0, subtopic: "Pythagorean", solution: "√(9+16) = 5" },
      { question: "Area of triangle base 8, height 6?", options: ["48", "24", "14", "28"], correct: 1, subtopic: "Area", solution: "½×8×6 = 24" },
      { question: "Volume of cube with side 4?", options: ["16", "64", "12", "256"], correct: 1, subtopic: "Volume", solution: "4³ = 64" },
      { question: "Circumference of circle radius 7? (π=22/7)", options: ["44", "22", "154", "88"], correct: 0, subtopic: "Circles", solution: "2πr = 44" },
      { question: "Interior angle of regular hexagon?", options: ["90°", "108°", "120°", "135°"], correct: 2, subtopic: "Polygons", solution: "(n-2)×180/n = 120°" },
      { question: "Distance between (0,0) and (3,4)?", options: ["5", "7", "25", "12"], correct: 0, subtopic: "Coordinate", solution: "√(9+16) = 5" }
    ],
    hard: [
      { question: "Surface area of cube with side 4?", options: ["64", "96", "24", "48"], correct: 1, subtopic: "3D Geometry", solution: "6×16 = 96" },
      { question: "Volume of sphere radius 3? (use π)", options: ["36π", "27π", "108π", "12π"], correct: 0, subtopic: "Volume", solution: "(4/3)πr³ = 36π" },
      { question: "Diagonal of square with side 6?", options: ["6√2", "12", "36", "6"], correct: 0, subtopic: "Diagonals", solution: "s√2 = 6√2" },
      { question: "Area of sector with r=8, angle=90°?", options: ["16π", "64π", "8π", "32π"], correct: 0, subtopic: "Circles", solution: "(90/360)×64π = 16π" },
      { question: "Volume of cone r=3, h=4?", options: ["12π", "36π", "9π", "48π"], correct: 0, subtopic: "Volume", solution: "(1/3)πr²h = 12π" },
      { question: "Height of equilateral triangle with side 6?", options: ["3√3", "6√3", "3", "9"], correct: 0, subtopic: "Triangles", solution: "(s√3)/2 = 3√3" }
    ]
  },
  calculus: {
    easy: [
      { question: "Derivative of x²?", options: ["x", "2x", "x²", "2"], correct: 1, subtopic: "Derivatives", solution: "nxⁿ⁻¹ = 2x" },
      { question: "Derivative of 5?", options: ["5", "1", "0", "x"], correct: 2, subtopic: "Derivatives", solution: "Constant = 0" },
      { question: "Derivative of 3x?", options: ["3", "x", "3x", "0"], correct: 0, subtopic: "Derivatives", solution: "d/dx(3x) = 3" },
      { question: "Integral of 1?", options: ["0", "1", "x + C", "x"], correct: 2, subtopic: "Integrals", solution: "∫1dx = x + C" },
      { question: "Limit of 2x as x→3?", options: ["2", "3", "6", "9"], correct: 2, subtopic: "Limits", solution: "2×3 = 6" },
      { question: "Derivative of x⁴?", options: ["4x³", "4x", "x³", "4"], correct: 0, subtopic: "Derivatives", solution: "4x³" }
    ],
    medium: [
      { question: "Derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "sin(x)", "tan(x)"], correct: 0, subtopic: "Trig Derivatives", solution: "d/dx(sin x) = cos x" },
      { question: "Integral of 2x?", options: ["x²", "x² + C", "2x² + C", "x + C"], correct: 1, subtopic: "Integrals", solution: "x² + C" },
      { question: "Derivative of eˣ?", options: ["eˣ", "xeˣ", "1", "e"], correct: 0, subtopic: "Derivatives", solution: "eˣ" },
      { question: "Integral of cos(x)?", options: ["sin(x)+C", "-sin(x)+C", "cos(x)+C", "tan(x)+C"], correct: 0, subtopic: "Integrals", solution: "sin(x) + C" },
      { question: "Derivative of ln(x)?", options: ["1/x", "x", "ln(x)", "eˣ"], correct: 0, subtopic: "Derivatives", solution: "1/x" },
      { question: "Second derivative of x³?", options: ["3x", "6x", "9x", "3x²"], correct: 1, subtopic: "Derivatives", solution: "First: 3x², Second: 6x" }
    ],
    hard: [
      { question: "Limit of (x²-1)/(x-1) as x→1?", options: ["0", "1", "2", "∞"], correct: 2, subtopic: "Limits", solution: "Factor: (x+1) = 2" },
      { question: "Limit of sin(x)/x as x→0?", options: ["0", "1", "∞", "-1"], correct: 1, subtopic: "Limits", solution: "Fundamental limit = 1" },
      { question: "Critical point of x²-4x?", options: ["0", "2", "4", "-2"], correct: 1, subtopic: "Applications", solution: "f'=2x-4=0, x=2" },
      { question: "Integral of x²?", options: ["x³/3+C", "x³+C", "2x+C", "x+C"], correct: 0, subtopic: "Integrals", solution: "x³/3 + C" },
      { question: "Derivative of cos(x)?", options: ["sin(x)", "-sin(x)", "cos(x)", "tan(x)"], correct: 1, subtopic: "Derivatives", solution: "-sin(x)" },
      { question: "Integral of eˣ?", options: ["eˣ+C", "xeˣ+C", "1+C", "e+C"], correct: 0, subtopic: "Integrals", solution: "eˣ + C" }
    ]
  },
  probability: {
    easy: [
      { question: "P(rolling 3 on die)?", options: ["1/6", "1/3", "1/2", "1/4"], correct: 0, subtopic: "Basic", solution: "1 out of 6 = 1/6" },
      { question: "P(heads on coin)?", options: ["1/4", "1/3", "1/2", "2/3"], correct: 2, subtopic: "Basic", solution: "1 out of 2 = 1/2" },
      { question: "Sum of all probabilities?", options: ["0", "0.5", "1", "∞"], correct: 2, subtopic: "Basic", solution: "Always = 1" },
      { question: "If P(A)=0.6, P(not A)?", options: ["0.4", "0.6", "0.3", "0.7"], correct: 0, subtopic: "Complement", solution: "1 - 0.6 = 0.4" },
      { question: "P(red card from deck)?", options: ["1/4", "1/2", "1/3", "2/3"], correct: 1, subtopic: "Cards", solution: "26/52 = 1/2" },
      { question: "P(even on die)?", options: ["1/6", "1/3", "1/2", "2/3"], correct: 2, subtopic: "Basic", solution: "3/6 = 1/2" }
    ],
    medium: [
      { question: "P(ace from deck)?", options: ["1/13", "1/26", "4/52", "1/52"], correct: 2, subtopic: "Cards", solution: "4/52" },
      { question: "P(two 6s on two dice)?", options: ["1/6", "1/12", "1/36", "1/18"], correct: 2, subtopic: "Independent", solution: "1/6 × 1/6 = 1/36" },
      { question: "Arrange 3 items?", options: ["3", "6", "9", "12"], correct: 1, subtopic: "Permutations", solution: "3! = 6" },
      { question: "Combinations of 2 from 4?", options: ["4", "6", "8", "12"], correct: 1, subtopic: "Combinations", solution: "C(4,2) = 6" },
      { question: "P(sum=7 on two dice)?", options: ["1/6", "1/12", "1/36", "1/8"], correct: 0, subtopic: "Compound", solution: "6/36 = 1/6" },
      { question: "Expected value of fair die?", options: ["2.5", "3", "3.5", "4"], correct: 2, subtopic: "Expected Value", solution: "(1+2+3+4+5+6)/6 = 3.5" }
    ],
    hard: [
      { question: "P(A∩B) if independent, P(A)=0.3, P(B)=0.4?", options: ["0.12", "0.7", "0.3", "0.4"], correct: 0, subtopic: "Independent", solution: "0.3 × 0.4 = 0.12" },
      { question: "P(A∪B) if P(A)=0.3, P(B)=0.4, P(A∩B)=0.1?", options: ["0.6", "0.7", "0.5", "0.4"], correct: 0, subtopic: "Addition Rule", solution: "0.3 + 0.4 - 0.1 = 0.6" },
      { question: "P(at least 1 head in 2 flips)?", options: ["1/4", "1/2", "3/4", "1"], correct: 2, subtopic: "Compound", solution: "1 - 1/4 = 3/4" },
      { question: "P(A|B)=0.5, P(B)=0.4, P(A∩B)?", options: ["0.2", "0.5", "0.4", "0.9"], correct: 0, subtopic: "Conditional", solution: "P(A|B)×P(B) = 0.2" },
      { question: "4P2?", options: ["6", "8", "12", "16"], correct: 2, subtopic: "Permutations", solution: "4!/(4-2)! = 12" },
      { question: "P(exactly 2 heads in 3 flips)?", options: ["1/8", "1/4", "3/8", "1/2"], correct: 2, subtopic: "Binomial", solution: "C(3,2)×(1/2)³ = 3/8" }
    ]
  },
  trigonometry: {
    easy: [
      { question: "sin(90°)?", options: ["0", "1/2", "√3/2", "1"], correct: 3, subtopic: "Values", solution: "sin 90° = 1" },
      { question: "cos(0°)?", options: ["0", "1/2", "√3/2", "1"], correct: 3, subtopic: "Values", solution: "cos 0° = 1" },
      { question: "tan(45°)?", options: ["0", "1/2", "1", "√3"], correct: 2, subtopic: "Values", solution: "tan 45° = 1" },
      { question: "sin(30°)?", options: ["1/2", "√3/2", "1", "0"], correct: 0, subtopic: "Values", solution: "sin 30° = 1/2" },
      { question: "cos(60°)?", options: ["1/2", "√3/2", "1", "0"], correct: 0, subtopic: "Values", solution: "cos 60° = 1/2" },
      { question: "sin(0°)?", options: ["0", "1/2", "√3/2", "1"], correct: 0, subtopic: "Values", solution: "sin 0° = 0" }
    ],
    medium: [
      { question: "sin²θ + cos²θ = ?", options: ["0", "1", "2", "sin2θ"], correct: 1, subtopic: "Identities", solution: "Pythagorean identity = 1" },
      { question: "tan(60°)?", options: ["1", "√3", "1/√3", "2"], correct: 1, subtopic: "Values", solution: "tan 60° = √3" },
      { question: "sec(0°)?", options: ["0", "1", "∞", "-1"], correct: 1, subtopic: "Values", solution: "1/cos 0° = 1" },
      { question: "Period of sin(x)?", options: ["π", "2π", "π/2", "4π"], correct: 1, subtopic: "Properties", solution: "Period = 2π" },
      { question: "cos(90°)?", options: ["0", "1", "-1", "1/2"], correct: 0, subtopic: "Values", solution: "cos 90° = 0" },
      { question: "If sinθ = 3/5, find cosθ (0<θ<90°)?", options: ["4/5", "3/4", "5/3", "5/4"], correct: 0, subtopic: "Identities", solution: "cos = 4/5" }
    ],
    hard: [
      { question: "sin(2θ) = ?", options: ["2sinθ", "2sinθcosθ", "sin²θ", "cos2θ"], correct: 1, subtopic: "Double Angle", solution: "2sinθcosθ" },
      { question: "cos(A+B) = ?", options: ["cosAcosB - sinAsinB", "cosAcosB + sinAsinB", "sinAcosB", "cosA + cosB"], correct: 0, subtopic: "Sum Formula", solution: "cosAcosB - sinAsinB" },
      { question: "Range of sin(x)?", options: ["[0,1]", "[-1,1]", "[0,∞)", "(-∞,∞)"], correct: 1, subtopic: "Properties", solution: "[-1, 1]" },
      { question: "tan²θ + 1 = ?", options: ["sec²θ", "csc²θ", "cot²θ", "sin²θ"], correct: 0, subtopic: "Identities", solution: "sec²θ" },
      { question: "sin(180° - θ) = ?", options: ["sinθ", "-sinθ", "cosθ", "-cosθ"], correct: 0, subtopic: "Properties", solution: "sinθ" },
      { question: "cos(2θ) = ?", options: ["cos²θ - sin²θ", "2cos²θ", "2sin²θ", "sinθcosθ"], correct: 0, subtopic: "Double Angle", solution: "cos²θ - sin²θ" }
    ]
  }
};

// Export for use
if (typeof module !== 'undefined') module.exports = questionBankWithDifficulty;
