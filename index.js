document.addEventListener('DOMContentLoaded', () => {
    let lastChar;
    let givenAnswer = false
    let ans;
    let shownEquation = ''
    let equation = ''
    let screen = document.getElementById('screen')
    let Ans = document.getElementById('ans')
    const oper = ['+', '-', 'x', '/', '%', '*', '**', '**2', '%', '/100*', 'd', '(', '^', '·']
    const operations = ['+', '-', 'x', '/', '%', '*', '**', '**2', 'ANS', 'Math.sqrt(', 'Math.PI', 'Math.E', 'mod', '·']

    document.querySelectorAll('button').forEach(occurence => {
        let id = occurence.getAttribute('id');
        occurence.addEventListener('click', function() {
            if (givenAnswer) {
                if (!operations.includes(id)) {
                    shownEquation = ''
                    equation = ''
                    givenAnswer = false
                } else {
                    shownEquation = shownEquation.toString()
                    equation = shownEquation.toString()
                    givenAnswer = false
                }
            }

            if (id == '=') {
                if (equation.includes("(")) {
                    var brackets = 0
                    for (i = 0; i < equation.length; i++) {
                        if (equation[i] == '(') {
                            brackets++
                        }
                        if (equation[i] == ')') {
                            brackets--
                        }
                    }
                    if (brackets > 0) {
                        for (i = 0; i < brackets; i++) {
                            equation = equation + (')')
                        }
                    }
                }

                if (equation.length == 0) {
                    equation = 0
                }
                try {
                    equation = eval(equation)
                    ans = equation
                } catch (e) {
                    console.log('test')
                    equation = 'Syntax Error'
                }
                shownEquation = equation
                givenAnswer = true
                Ans.innerHTML = `Ans = ${ans}`
                console.log(ans)
            } else if (id == '/100*') {
                equation = equation + id
                shownEquation = shownEquation + '%'
            } else if (id == '*') {
                equation = equation + id
                shownEquation = shownEquation + '·'
            } else if (id == 'backspace') {
                shownEquation = shownEquation.toString();
                equation = equation.toString()
                var deletedChar = shownEquation[shownEquation.length - 1]
                shownEquation = shownEquation.slice(0, -1);
                if (deletedChar == '%') {
                    equation = equation.slice(0, -5);
                } else if (deletedChar == '√') {
                    equation = equation.slice(0, -9);
                } else if (deletedChar == '^') {
                    equation = equation.slice(0, -2);
                } else if (deletedChar == 's') {
                    equation = equation.slice(0, -ans.toString().length);
                    shownEquation = shownEquation.slice(0, -2);
                } else if (deletedChar == 'd') {
                    equation = equation.slice(0, -1);
                    shownEquation = shownEquation.slice(0, -2);
                } else if (deletedChar == 'e') {
                    equation = equation.slice(0, -8);
                } else if (deletedChar == 'π') {
                    equation = equation.slice(0, -9);
                } else if (equation) {
                    equation = equation.slice(0, -1);
                }
            } else if (id == 'Math.sqrt(') {
                if (oper.includes(shownEquation[shownEquation.length - 1]) || !shownEquation[shownEquation.length - 1]) {
                    equation = equation + id
                    shownEquation = shownEquation + ('√(')
                } else {
                    equation = equation + ('*Math.sqrt(')
                    shownEquation = shownEquation + ('·√(')
                }
            } else if (id == '(') {
                if (oper.includes(shownEquation[shownEquation.length - 1]) || !shownEquation[shownEquation.length - 1]) {
                    equation = equation + id
                    shownEquation = shownEquation + ('(')
                } else {
                    equation = equation + ('*(')
                    shownEquation = shownEquation + ('·(')
                }
            } else if (id == '**') {
                equation = equation + id
                shownEquation = shownEquation + ('^')
            } else if (id == '**2') {
                equation = equation + id
                shownEquation = shownEquation + ('^2')
            } else if (id == 'ANS') {
                if (!ans) { ans = 0 }
                if (oper.includes(shownEquation[shownEquation.length - 1]) || !shownEquation[shownEquation.length - 1]) {
                    equation = equation + ans
                    shownEquation = shownEquation + 'Ans'
                } else {
                    equation = equation + (`*${ans}`)
                    shownEquation = shownEquation + '·Ans'
                }
            } else if (id == '%') {
                shownEquation = shownEquation + 'mod'
                equation = equation + id
            } else if (id == 'Math.PI') {
                if (oper.includes(shownEquation[shownEquation.length - 1]) || !shownEquation[shownEquation.length - 1]) {
                    equation = equation + `(${id})`
                    shownEquation = shownEquation + 'π'
                } else {
                    equation = equation + `*(${id})`
                    shownEquation = shownEquation + '·π'
                }
            } else if (id == 'Math.E') {
                if (oper.includes(shownEquation[shownEquation.length - 1]) || !shownEquation[shownEquation.length - 1]) {
                    equation = equation + `(${id})`
                    shownEquation = shownEquation + 'e'
                } else {
                    equation = equation + `*(${id})`
                    shownEquation = shownEquation + '·e'
                }
            } else {
                if ((lastChar == ')' || lastChar == 'e' || lastChar == 's' || lastChar == 'π') && (!(id == ')') && !(id == '%') && !(id == '**') && !(id == '**2'))) {
                    equation = equation + `*${id}`
                    shownEquation = shownEquation + `·${id}`
                } else {
                    equation = equation + id
                    shownEquation = shownEquation + id
                }
            }
            screen.innerHTML = shownEquation
            lastChar = shownEquation[shownEquation.length - 1]
            if (id == 'clear') {
                equation = ''
                shownEquation = ''
            }
            if (shownEquation.length == 0) {
                screen.innerHTML = '0'
            }
            console.log(equation)
        })
    });
})