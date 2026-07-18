const screen = document.querySelector('#screen');
const b0 = document.querySelector('#b0');
const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');
const b3 = document.querySelector('#b3');
const b4 = document.querySelector('#b4');
const b5 = document.querySelector('#b5');
const b6 = document.querySelector('#b6');
const b7 = document.querySelector('#b7');
const b8 = document.querySelector('#b8');
const b9 = document.querySelector('#b9');
const bplus = document.querySelector('#bplus');
const bminus = document.querySelector('#bminus');
const bmultiply = document.querySelector('#bmultiply');
const bdivide = document.querySelector('#bdivide');
const be = document.querySelector('#be');
const bpi = document.querySelector('#bpi');
const bdeg = document.querySelector('#bdeg');
const beq = document.querySelector('#beq');
const bp = document.querySelector('#bp');
const bac = document.querySelector('#b-allclear');
const bdel = document.querySelector('#bdelete');
const bpar1 = document.querySelector('#bpar1');
const bpar2 = document.querySelector('#bpar2');
const bcomma = document.querySelector('#bcomma');
const bpercent = document.querySelector('#bpercent');
const bfactorial = document.querySelector('#bfactorial');
const bxy = document.querySelector('#bxy');
const b2x = document.querySelector('#b2x');
const b10x = document.querySelector('#b10x');
const bex = document.querySelector('#bex');
const bln = document.querySelector('#bln');
const blog = document.querySelector('#blog');
const blg = document.querySelector('#blg');
const bsqrt = document.querySelector('#bsqrt');
const bcbrt = document.querySelector('#bcbrt');
const bnrt = document.querySelector('#bnrt');
const bsin = document.querySelector('#bsin');
const bcos = document.querySelector('#bcos');
const btg = document.querySelector('#btg');
const bctg = document.querySelector('#bctg');
const bprime = document.querySelector('#bprime');
const bfibo = document.querySelector('#bfibo');
const bpal = document.querySelector('#bpal');
const babs = document.querySelector('#babs');
const bgcd = document.querySelector('#bgcd');
const blcm = document.querySelector('#blcm');
const history = document.querySelector('#history');
const fh = document.querySelector('#full-history');
const ch = document.querySelector('#clear-history');
const dc = document.querySelector('#delete-calculus');
const btoggle = document.querySelector('#btoggle');
let exp = '';
let okdel = 1;
let okfh = 0;
let delMode = 0;
let oktoggle = false;

function clean(x) {
    if (Math.abs(x) < 1e-10) return 0;
    return Math.round(x * 1e10) / 1e10;
}

function isValid(x) {
    try {
        eval(x);
        return true;
    } 
    catch(err) {
        return false;
    }
}

function factorial(x) {
    if(!(x >= 0 && Number.isInteger(x))) throw new Error(`Error`);
    else {
        let p=1;
        for(let i=1; i<=x; i++) p*=i;
        return p;
    }
}

function log(base, number) {
    return Math.log(number)/Math.log(base);
}

function lg(x) {
    return Math.log(x)/Math.log(10);
}

function nrt(n,x) {
    if(n < 2) throw new Error(`Error`);
    else {
        if(n%2 === 0) {
            if(x < 0) throw new Error(`Undefined`);
            else return clean(Math.pow(x,1/n));
        }
        else return clean(Math.pow(x,1/n));
    }
}

function pow(x,y) {
    if(x === 0 && y === 0) throw new Error(`Undefined`);
    else return Math.pow(x,y);
}

function tg(x) {
    return clean(Math.sin(x))/clean(Math.cos(x));
}

function ctg(x) {
    return clean(Math.cos(x))/clean(Math.sin(x));
}

function deg(x) {
    return x*Math.PI/180;
}

function prime(x) {
    if(!(x >= 0 && Number.isInteger(x))) throw new Error(`Error`);
    else {
        if((x%2 === 0 && x!=2) || x<2) return 0;
        for(let d=3; d*d<=x; d+=2)
        if(x%d === 0) return 0;
        return 1;
    }
}

function fibo(x) {
    if(!(x >= 0 && Number.isInteger(x))) throw new Error(`Error`);
    else {
        if(x === 0 || x === 1) return 1;
        else {
            let f1=0;
            let f2=1;
            let f3;
            do {
                f3=f1+f2;
                f1=f2;
                f2=f3;
            }while(f3<x);
            if(f3 === x) return 1;
            else return 0;
        }
    }
}

function pal(x) {
    if(!(x >= 0 && Number.isInteger(x))) throw new Error(`Error`);
    else {
        let og=0;
        let c=x;
        while(c > 0) {
            og=og*10+c%10;
            c = Math.floor(c / 10);
        }
        if(og === x) return 1;
        else return 0;
    }
}

function gcd(...arr) {
    if(arr.length === 0) throw new Error(`Error`);
    else return arr.reduce((a, b) => {
        while (b !== 0) {
            let r=a%b;
            a = b;
            b = r;
        }
        return Math.abs(a);
    });
}

function lcm(...arr) {
    if(arr.length === 0) throw new Error(`Error`);
    else {
        let value = arr[0];
        for(let i=1; i<arr.length; i++) value=value*arr[i]/gcd(value,arr[i]);
        return value;
    }
}

Object.assign(window, {
    factorial,
    log,
    lg,
    nrt,
    pow,
    tg,
    ctg,
    deg,
    prime,
    fibo,
    pal,
    gcd,
    lcm
});

function addToHistory(expression) {
    const calculus = document.createElement('li');
    calculus.classList.add('calculus');
    calculus.textContent = expression;
    history.appendChild(calculus);
}

function deleteFromHistory(arr, index) {
    if(index < 0 || index >= arr.length) return arr;
    else {
        arr.splice(index, 1);
        return arr;
    }
}

function updateHistoryUI() {
    const items = history.querySelectorAll('li');

    items.forEach(li => {
        li.style.color = delMode ? '#ef4444' : 'white';
        li.style.cursor = delMode ? 'pointer' : 'text';
    });
}

function renderHistory(full = false) {
    const results = JSON.parse(localStorage.getItem("history")) || [];
    history.textContent = '';
    if(full) {
        results.forEach(addToHistory);
    }
    else {
        results.slice(-5).forEach(addToHistory);
    }
}

function getHistory() {
    return JSON.parse(localStorage.getItem("history")) || [];
}

function setHistory(data) {
    localStorage.setItem("history", JSON.stringify(data));
}

function updateToggle() {
    const symbols = document.querySelector('.symbols');
    const functions = document.querySelector('.functions');
    if(window.matchMedia('(min-width: 992px)').matches) {
        functions.style.display = 'block';
        symbols.style.display = 'block';
        oktoggle = 0;
    }
    else {
        if(!oktoggle) {
            functions.style.display = 'none';
            symbols.style.display = 'block';
            btoggle.textContent = 'Functions';
        }
        else {
            functions.style.display = 'block';
            symbols.style.display = 'none';
            btoggle.textContent = 'Symbols';  
        }
    }
}

b0.addEventListener('click', () => {
    screen.textContent += `0`;
    exp += `0`;
});

b1.addEventListener('click', () => {
    screen.textContent += `1`;
    exp += `1`;
});

b2.addEventListener('click', () => {
    screen.textContent += `2`;
    exp += `2`;
});

b3.addEventListener('click', () => {
    screen.textContent += `3`;
    exp += `3`;
});

b4.addEventListener('click', () => {
    screen.textContent += `4`;
    exp += `4`;
});

b5.addEventListener('click', () => {
    screen.textContent += `5`;
    exp += `5`;
});

b6.addEventListener('click', () => {
    screen.textContent += `6`;
    exp += `6`;
});

b7.addEventListener('click', () => {
    screen.textContent += `7`;
    exp += `7`;
});

b8.addEventListener('click', () => {
    screen.textContent += `8`;
    exp += `8`;
});

b9.addEventListener('click', () => {
    screen.textContent += `9`;
    exp += `9`;
});

be.addEventListener('click', () => {
    screen.textContent += `e`;
    exp += `${Math.E}`;
});

bpi.addEventListener('click', () => {
    screen.textContent += `π`;
    exp += `${Math.PI}`;
});

bdeg.addEventListener('click', () => {
    screen.textContent += `deg(`;
    exp += `deg(`;
});

bplus.addEventListener('click', () => {
    screen.textContent += `+`;
    exp += `+`;
});

bminus.addEventListener('click', () => {
    screen.textContent += `-`;
    exp += `-`;
});

bmultiply.addEventListener('click', () => {
    screen.textContent += `*`;
    exp += `*`;
});

bdivide.addEventListener('click', () => {
    screen.textContent += `/`;
    exp += `/`;
});

bp.addEventListener('click', () => {
    screen.textContent += `.`;
    exp += `.`;
});

bac.addEventListener('click', () => {
    screen.textContent = ``;
    exp = ``;
    okdel = 1;
});

bdel.addEventListener('click', () => {
    if(okdel === 1) {
        screen.textContent = screen.textContent.slice(0, -1);
        exp = exp.slice(0, -1); 
    }
});

bpar1.addEventListener('click', () => {
    screen.textContent += `(`;
    exp += '(';
});

bpar2.addEventListener('click', () => {
    screen.textContent += `)`;
    exp += ')';
});

bpercent.addEventListener('click', () => {
    screen.textContent += `%`;
    exp += '%';
});

bcomma.addEventListener('click', () => {
    screen.textContent += `,`;
    exp += ',';
});

bfactorial.addEventListener('click', () => {
    screen.textContent += `factorial(`;
    exp += `factorial(`;
});

bxy.addEventListener('click', () => {
    screen.textContent += `pow(`;
    exp += `pow(`;
});

b2x.addEventListener('click', () => {
    screen.textContent += `pow(2,`;
    exp += `Math.pow(2,`;
});

b10x.addEventListener('click', () => {
    screen.textContent += `pow(10,`;
    exp += `Math.pow(10,`;
});

bex.addEventListener('click', () => {
    screen.textContent += `pow(e,`;
    exp += `Math.pow(${Math.E},`;
});

bln.addEventListener('click', () => {
    screen.textContent += `ln(`;
    exp += `Math.log(`; 
});

blog.addEventListener('click', () => {
    screen.textContent += `log(`;
    exp += `log(`; 
});

blg.addEventListener('click', () => {
    screen.textContent += `lg(`;
    exp += `lg(`; 
});

bsqrt.addEventListener('click', () => {
    screen.textContent += `sqrt(`;
    exp += `Math.sqrt(`; 
});

bcbrt.addEventListener('click', () => {
    screen.textContent += `cbrt(`;
    exp += `Math.cbrt(`; 
});

bnrt.addEventListener('click', () => {
    screen.textContent += `nrt(`;
    exp += `nrt(`; 
});

bsin.addEventListener('click', () => {
    screen.textContent += `sin(`;
    exp += `Math.sin(`;
});

bcos.addEventListener('click', () => {
    screen.textContent += `cos(`;
    exp += `Math.cos(`;
});

btg.addEventListener('click', () => {
    screen.textContent += `tg(`;
    exp += `tg(`;
});

bctg.addEventListener('click', () => {
    screen.textContent += `ctg(`;
    exp += `ctg(`;
});

bprime.addEventListener('click', () => {
    screen.textContent += `prime(`;
    exp += `prime(`;
});

bfibo.addEventListener('click', () => {
    screen.textContent += `fibo(`;
    exp += `fibo(`;
});

bpal.addEventListener('click', () => {
    screen.textContent += `pal(`;
    exp += `pal(`;
});

babs.addEventListener('click', () => {
    screen.textContent += `abs(`;
    exp += `Math.abs(`;
});

bgcd.addEventListener('click', () => {
    screen.textContent += `gcd(`;
    exp += `gcd(`;
});

blcm.addEventListener('click', () => {
    screen.textContent += `lcm(`;
    exp += `lcm(`;
});

beq.addEventListener('click', () => {
    let expression = screen.textContent;
    try {
        
        let result = eval(exp);

        if (!isFinite(result)) {
            throw new Error(`Undefined`);
        }

        if(!isValid(result)) {
            throw new Error(`Error`);
        }
        
        result = clean(result);

        screen.textContent = result;
        exp = result.toString();
        expression = expression + '=' + result;

    } catch (err) {
        if(err.message === `Undefined`) screen.textContent = err.message;
        else screen.textContent = `Error`;
        expression = expression + '=' + screen.textContent;
        okdel = 0;
    }
    addToHistory(expression);

    let data = getHistory();
    data.push(expression);
    setHistory(data);

    renderHistory(okfh);

});

window.addEventListener('load', () => {
    renderHistory(false);
    updateHistoryUI();
});

fh.addEventListener('click', () => {
    okfh = !okfh
    fh.textContent = okfh ? 'Short history' : 'Full history';
    renderHistory(okfh);

});

ch.addEventListener('click', () => {
    localStorage.removeItem("history");
    let data = [];
    renderHistory(okfh);
});



dc.addEventListener('click', () => {
    delMode = !delMode;
    dc.textContent = delMode ? 'Stop deleting calculus' : 'Delete calculus';
    renderHistory(okfh);
    updateHistoryUI();
});

history.addEventListener('click', (e) => {

    if (!delMode) return;
    const li = e.target.closest('li');
    if (!li) return;
    const index = [...history.children].indexOf(li);
    if(index === -1) return;
    let data = getHistory();
    data = deleteFromHistory(data, index);
    localStorage.setItem("history", JSON.stringify(data));
    renderHistory(delMode || okfh);
    updateHistoryUI();
});

btoggle.addEventListener('click', () => {
    if(window.matchMedia('(max-width: 991px)').matches) {
        oktoggle = !oktoggle;
        console.log(oktoggle);
        updateToggle();
    }
});

window.addEventListener('load', updateToggle);

window.addEventListener('resize', updateToggle);










