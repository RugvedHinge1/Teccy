// Question Bank Part 2 - Geometry, Calculus, Probability, Trigonometry

// Add to questionBank object
questionBank.geometry = [
    // Batch 1
    {
        easy: [
            { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1, subtopic: "Polygons", solution: "Hexa means 6" },
            { question: "What is the area of a square with side 5?", options: ["10", "20", "25", "15"], correct: 2, subtopic: "Area", solution: "Area = side² = 5² = 25" },
            { question: "What is the perimeter of a rectangle 4×6?", options: ["10", "20", "24", "48"], correct: 1, subtopic: "Perimeter", solution: "P = 2(4+6) = 20" },
            { question: "Sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1, subtopic: "Triangles", solution: "Sum of interior angles = 180°" },
            { question: "What shape has 4 equal sides and 4 right angles?", options: ["Rectangle", "Square", "Rhombus", "Trapezoid"], correct: 1, subtopic: "Quadrilaterals", solution: "Square has all sides equal and all angles 90°" }
        ],
        medium: [
            { question: "Find area of triangle with base 8 and height 6", options: ["48", "24", "14", "28"], correct: 1, subtopic: "Area", solution: "Area = (1/2)×8×6 = 24" },
            { question: "Find circumference of circle with radius 7 (use π=22/7)", options: ["44", "22", "154", "88"], correct: 0, subtopic: "Circles", solution: "C = 2πr = 2×(22/7)×7 = 44" },
            { question: "What is the area of a circle with radius 5? (use π=3.14)", options: ["31.4", "78.5", "15.7", "25"], correct: 1, subtopic: "Circles", solution: "A = πr² = 3.14×25 = 78.5" },
            { question: "Find the hypotenuse of a right triangle with legs 3 and 4", options: ["5", "7", "12", "25"], correct: 0, subtopic: "Pythagorean Theorem", solution: "c² = 3²+4² = 25, c = 5" },
            { question: "Each interior angle of a regular hexagon?", options: ["90°", "108°", "120°", "135°"], correct: 2, subtopic: "Polygons", solution: "((n-2)×180)/n = (4×180)/6 = 120°" }
        ],
        hard: [
            { question: "Volume of a sphere with radius 3? (use π=3.14)", options: ["113.04", "56.52", "28.26", "37.68"], correct: 0, subtopic: "3D Geometry", solution: "V = (4/3)πr³ = (4/3)×3.14×27 = 113.04" },
            { question: "Surface area of a cube with side 4?", options: ["64", "96", "24", "48"], correct: 1, subtopic: "3D Geometry", solution: "SA = 6×side² = 6×16 = 96" },
            { question: "Find the diagonal of a square with side 6", options: ["6√2", "12", "36", "6"], correct: 0, subtopic: "Diagonals", solution: "d = s√2 = 6√2" },
            { question: "Area of trapezoid with parallel sides 5,9 and height 4", options: ["28", "36", "56", "20"], correct: 0, subtopic: "Area", solution: "A = (1/2)(5+9)×4 = 28" },
            { question: "Volume of cone with radius 3 and height 4?", options: ["12π", "36π", "9π", "48π"], correct: 0, subtopic: "3D Geometry", solution: "V = (1/3)πr²h = (1/3)π×9×4 = 12π" }
        ]
    },
    // Batch 2
    {
        easy: [
            { question: "How many vertices does a triangle have?", options: ["2", "3", "4", "5"], correct: 1, subtopic: "Triangles", solution: "A triangle has 3 vertices" },
            { question: "What is the diameter if radius is 6?", options: ["3", "6", "12", "36"], correct: 2, subtopic: "Circles", solution: "Diameter = 2 × radius = 12" },
            { question: "Area of rectangle with length 7 and width 3?", options: ["10", "20", "21", "24"], correct: 2, subtopic: "Area", solution: "A = 7 × 3 = 21" },
            { question: "What angle is 90 degrees?", options: ["Acute", "Right", "Obtuse", "Straight"], correct: 1, subtopic: "Angles", solution: "A right angle is exactly 90°" },
            { question: "Perimeter of square with side 9?", options: ["18", "36", "81", "27"], correct: 1, subtopic: "Perimeter", solution: "P = 4 × 9 = 36" }
        ],
        medium: [
            { question: "Find area of parallelogram with base 10 and height 5", options: ["15", "30", "50", "25"], correct: 2, subtopic: "Area", solution: "A = base × height = 50" },
            { question: "What is the arc length if central angle is 60° and radius is 6?", options: ["2π", "π", "6π", "3π"], correct: 0, subtopic: "Circles", solution: "Arc = (θ/360)×2πr = (60/360)×12π = 2π" },
            { question: "Find missing angle if two angles of triangle are 45° and 75°", options: ["60°", "70°", "50°", "65°"], correct: 0, subtopic: "Triangles", solution: "180 - 45 - 75 = 60°" },
            { question: "Volume of rectangular prism 3×4×5?", options: ["12", "60", "47", "35"], correct: 1, subtopic: "3D Geometry", solution: "V = 3×4×5 = 60" },
            { question: "What is the exterior angle of a regular pentagon?", options: ["72°", "108°", "60°", "90°"], correct: 0, subtopic: "Polygons", solution: "Exterior angle = 360/n = 360/5 = 72°" }
        ],
        hard: [
            { question: "Find area of sector with radius 8 and central angle 90°", options: ["16π", "64π", "8π", "32π"], correct: 0, subtopic: "Circles", solution: "A = (θ/360)×πr² = (90/360)×64π = 16π" },
            { question: "Surface area of cylinder with r=3 and h=5?", options: ["48π", "30π", "45π", "60π"], correct: 0, subtopic: "3D Geometry", solution: "SA = 2πr² + 2πrh = 18π + 30π = 48π" },
            { question: "Distance between (1,2) and (4,6)?", options: ["5", "7", "25", "3"], correct: 0, subtopic: "Coordinate Geometry", solution: "d = √((4-1)²+(6-2)²) = √(9+16) = 5" },
            { question: "Find the height of an equilateral triangle with side 6", options: ["3√3", "6√3", "3", "9"], correct: 0, subtopic: "Triangles", solution: "h = (s√3)/2 = 3√3" },
            { question: "Volume of pyramid with square base 6×6 and height 8?", options: ["96", "288", "144", "48"], correct: 0, subtopic: "3D Geometry", solution: "V = (1/3)×36×8 = 96" }
        ]
    },
    // Batch 3-5 abbreviated for space
    {
        easy: [
            { question: "How many degrees in a straight angle?", options: ["90°", "180°", "270°", "360°"], correct: 1, subtopic: "Angles", solution: "Straight angle = 180°" },
            { question: "What is radius if diameter is 10?", options: ["5", "10", "20", "15"], correct: 0, subtopic: "Circles", solution: "Radius = diameter/2 = 5" },
            { question: "How many sides in an octagon?", options: ["6", "7", "8", "9"], correct: 2, subtopic: "Polygons", solution: "Octa means 8" },
            { question: "Perimeter of equilateral triangle with side 7?", options: ["14", "21", "49", "28"], correct: 1, subtopic: "Perimeter", solution: "P = 3 × 7 = 21" },
            { question: "Area of square with side 9?", options: ["18", "36", "81", "72"], correct: 2, subtopic: "Area", solution: "A = 9² = 81" }
        ],
        medium: [
            { question: "Find hypotenuse with legs 5 and 12", options: ["13", "17", "169", "7"], correct: 0, subtopic: "Pythagorean Theorem", solution: "c² = 25+144 = 169, c = 13" },
            { question: "Area of rhombus with diagonals 6 and 8?", options: ["24", "48", "14", "28"], correct: 0, subtopic: "Area", solution: "A = (1/2)×d1×d2 = 24" },
            { question: "Volume of cube with edge 5?", options: ["25", "125", "15", "625"], correct: 1, subtopic: "3D Geometry", solution: "V = 5³ = 125" },
            { question: "Radius of circle with circumference 44? (π=22/7)", options: ["7", "14", "22", "11"], correct: 0, subtopic: "Circles", solution: "C = 2πr, 44 = 2×(22/7)×r, r = 7" },
            { question: "Sum of interior angles of pentagon?", options: ["360°", "540°", "720°", "900°"], correct: 1, subtopic: "Polygons", solution: "(n-2)×180 = 3×180 = 540°" }
        ],
        hard: [
            { question: "Find the length of tangent from point 13 units from center if radius is 5", options: ["12", "8", "18", "10"], correct: 0, subtopic: "Circles", solution: "tangent² + 5² = 13², tangent = 12" },
            { question: "Volume of hemisphere with radius 6?", options: ["144π", "288π", "72π", "36π"], correct: 0, subtopic: "3D Geometry", solution: "V = (2/3)πr³ = (2/3)π×216 = 144π" },
            { question: "Find area of a segment if radius=10, central angle=60°", options: ["50π/3 - 25√3", "100π/3", "25π", "50π/3"], correct: 0, subtopic: "Circles", solution: "Sector area - Triangle area" },
            { question: "Diagonal of rectangular prism 3×4×12?", options: ["13", "19", "169", "5"], correct: 0, subtopic: "3D Geometry", solution: "d = √(9+16+144) = √169 = 13" },
            { question: "Surface area of sphere with radius 7?", options: ["196π", "343π", "49π", "392π"], correct: 0, subtopic: "3D Geometry", solution: "SA = 4πr² = 4π×49 = 196π" }
        ]
    },
    {
        easy: [
            { question: "What type of triangle has all sides equal?", options: ["Scalene", "Isosceles", "Equilateral", "Right"], correct: 2, subtopic: "Triangles", solution: "Equilateral = all sides equal" },
            { question: "How many right angles in a rectangle?", options: ["2", "3", "4", "1"], correct: 2, subtopic: "Quadrilaterals", solution: "Rectangle has 4 right angles" },
            { question: "Find perimeter of rectangle 8×5", options: ["13", "26", "40", "80"], correct: 1, subtopic: "Perimeter", solution: "P = 2(8+5) = 26" },
            { question: "What is 360° ÷ 4?", options: ["60°", "90°", "120°", "180°"], correct: 1, subtopic: "Angles", solution: "360/4 = 90°" },
            { question: "Area of triangle with base 10, height 8?", options: ["80", "40", "18", "36"], correct: 1, subtopic: "Area", solution: "A = (1/2)×10×8 = 40" }
        ],
        medium: [
            { question: "Find missing leg if hypotenuse=10, other leg=6", options: ["8", "4", "14", "16"], correct: 0, subtopic: "Pythagorean Theorem", solution: "leg² + 36 = 100, leg = 8" },
            { question: "Area of circle with diameter 14? (π=22/7)", options: ["154", "44", "616", "308"], correct: 0, subtopic: "Circles", solution: "r=7, A = (22/7)×49 = 154" },
            { question: "Lateral surface area of cylinder r=4, h=7?", options: ["56π", "112π", "28π", "49π"], correct: 0, subtopic: "3D Geometry", solution: "LSA = 2πrh = 56π" },
            { question: "Find the third angle if two angles are supplementary to 130°", options: ["50°", "130°", "180°", "230°"], correct: 0, subtopic: "Angles", solution: "Supplementary = 180-130 = 50°" },
            { question: "Perimeter of regular hexagon with side 5?", options: ["25", "30", "35", "60"], correct: 1, subtopic: "Polygons", solution: "P = 6×5 = 30" }
        ],
        hard: [
            { question: "Find inradius of triangle with area 30 and perimeter 30", options: ["2", "1", "3", "5"], correct: 0, subtopic: "Triangles", solution: "Area = r×s, r = 30/15 = 2" },
            { question: "Volume of torus with R=5 and r=2?", options: ["40π²", "20π²", "100π²", "80π²"], correct: 0, subtopic: "3D Geometry", solution: "V = 2π²Rr² = 2π²×5×4 = 40π²" },
            { question: "Find area of triangle with vertices (0,0), (4,0), (0,3)", options: ["6", "12", "7", "24"], correct: 0, subtopic: "Coordinate Geometry", solution: "A = (1/2)|x1(y2-y3)+...| = 6" },
            { question: "Slant height of cone with r=6 and h=8?", options: ["10", "14", "48", "100"], correct: 0, subtopic: "3D Geometry", solution: "l = √(36+64) = 10" },
            { question: "Find angle between diagonals of a rhombus if sides are 5 and diagonals are 6,8", options: ["90°", "60°", "120°", "45°"], correct: 0, subtopic: "Quadrilaterals", solution: "Diagonals of rhombus bisect at 90°" }
        ]
    },
    {
        easy: [
            { question: "What is a 4-sided polygon called?", options: ["Triangle", "Pentagon", "Quadrilateral", "Hexagon"], correct: 2, subtopic: "Polygons", solution: "Quad = 4" },
            { question: "Complementary angle to 30°?", options: ["60°", "150°", "90°", "30°"], correct: 0, subtopic: "Angles", solution: "90 - 30 = 60°" },
            { question: "Area of square with perimeter 20?", options: ["25", "100", "20", "5"], correct: 0, subtopic: "Area", solution: "Side = 20/4 = 5, Area = 25" },
            { question: "How many faces does a cube have?", options: ["4", "6", "8", "12"], correct: 1, subtopic: "3D Geometry", solution: "Cube has 6 faces" },
            { question: "Supplementary angle to 110°?", options: ["70°", "250°", "20°", "180°"], correct: 0, subtopic: "Angles", solution: "180 - 110 = 70°" }
        ],
        medium: [
            { question: "Volume of sphere with radius 3? (π≈3)", options: ["108", "36", "27", "81"], correct: 0, subtopic: "3D Geometry", solution: "V ≈ (4/3)×3×27 = 108" },
            { question: "Area of regular hexagon with side 4?", options: ["24√3", "48√3", "16√3", "96√3"], correct: 0, subtopic: "Polygons", solution: "A = (3√3/2)×s² = 24√3" },
            { question: "Find the apothem of regular hexagon with side 6", options: ["3√3", "6√3", "3", "6"], correct: 0, subtopic: "Polygons", solution: "a = (s√3)/2 = 3√3" },
            { question: "Diagonal of rectangle 8×6?", options: ["10", "14", "7", "48"], correct: 0, subtopic: "Diagonals", solution: "d = √(64+36) = 10" },
            { question: "Area of annulus with R=5, r=3?", options: ["16π", "8π", "25π", "34π"], correct: 0, subtopic: "Circles", solution: "A = π(R²-r²) = π(25-9) = 16π" }
        ],
        hard: [
            { question: "Find the number of diagonals in a decagon", options: ["35", "45", "20", "10"], correct: 0, subtopic: "Polygons", solution: "n(n-3)/2 = 10×7/2 = 35" },
            { question: "Volume of frustum with r=3, R=6, h=4?", options: ["84π", "36π", "108π", "63π"], correct: 0, subtopic: "3D Geometry", solution: "V = (πh/3)(R²+Rr+r²) = (4π/3)(36+18+9) = 84π" },
            { question: "Find centroid of triangle with vertices (0,0),(6,0),(0,9)", options: ["(2,3)", "(3,3)", "(3,2)", "(2,4.5)"], correct: 0, subtopic: "Coordinate Geometry", solution: "Centroid = ((0+6+0)/3, (0+0+9)/3) = (2,3)" },
            { question: "Surface area of cone with r=5, l=13?", options: ["90π", "65π", "25π", "130π"], correct: 0, subtopic: "3D Geometry", solution: "SA = πr(r+l) = 5π(18) = 90π" },
            { question: "Find circumradius of equilateral triangle with side 6", options: ["2√3", "3√3", "6", "4√3"], correct: 0, subtopic: "Triangles", solution: "R = a/√3 = 6/√3 = 2√3" }
        ]
    }
];
