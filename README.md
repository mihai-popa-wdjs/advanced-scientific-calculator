# Advanced Scientific Calculator

A modern scientific calculator developed using **HTML**, **CSS**, and **JavaScript**. The application performs both basic and advanced mathematical operations through an intuitive web interface and stores the calculation history in the browser.

🔗 **Live Demo:** 
[https://mihai-popa-wdjs.github.io/advanced-scientific-calculator/]

## Features

### Basic operations
- Addition
- Subtraction
- Multiplication
- Division
- Modulo
- Parentheses support
- Decimal numbers
- Constants:
  - π (Pi)
  - e (Euler's number)

### Scientific functions
- Power (`x^y`)
- Powers of 2, 10 and e
- Square root
- Cube root
- n-th root
- Natural logarithm (`ln`)
- Base-10 logarithm (`lg`)
- Logarithm with custom base (`log`)
- Factorial
- Trigonometric functions:
  - sin
  - cos
  - tg
  - ctg
- Degree-to-radian conversion
- Absolute value
- Prime number verification
- Fibonacci number verification
- Palindrome verification
- Greatest Common Divisor (GCD)
- Least Common Multiple (LCM)

## History

The application stores every calculation using the browser's **localStorage**.

Available history options:
- View the complete history
- View only the last 5 calculations
- Clear the entire history
- Delete individual calculations

## Error Handling

The calculator distinguishes between two error types:

### Undefined
Displayed when the mathematical expression is syntactically correct but mathematically undefined.

Examples:
- Division by zero
- `0^0`
- Even root of a negative number

### Error
Displayed when the expression is invalid.

Examples:
- Missing parentheses
- Incorrect function parameters
- Invalid mathematical expressions

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API

## Project Structure

```
project/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Download or clone the repository.
2. Open `index.html` in any modern web browser.

Alternatively, you can use **Live Server** in Visual Studio Code during development.

## Author

Developed by **Mihai Popa** as a scientific calculator project using HTML, CSS and JavaScript.
