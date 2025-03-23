function newtonRaphson(f, df, x0, tolerance, maxIterations) {
    let x = x0;
    let iter = 0;
    let error = Number.POSITIVE_INFINITY;

    while (error > tolerance && iter < maxIterations) {
        const fx = f(x);
        const dfx = df(x);
        const xNext = x - fx / dfx;
        //error = Math.abs(xNext - x);
        error = Math.abs(fx);
        x = xNext;
        iter++;
    }

    if (iter === maxIterations) {
        console.warn("Newton-Raphson method did not converge within the maximum number of iterations.");
    }

    return x;
}

function mensu() {
  const t=document.getElementById("taux").value/100;
  const n=document.getElementById("duree").value;
  const M=document.getElementById("capital").value;
  const m = ((M*t/12))/(1-Math.pow(1+(t/12),-n));
  document.getElementById('mensu').value=Math.round(m);
  document.getElementById('cout').value=Math.round(m*n-M);
}

function emprunt() {
  const t=document.getElementById("taux").value/100;
  const n=document.getElementById("duree").value;
  const m = document.getElementById('mensu').value;
  const M = 12*(1-Math.pow(1+(t/12),-n))*m/t;
  document.getElementById('capital').value=Math.round(M);
  document.getElementById('cout').value=Math.round(m*n-M);
}

function duree() {
  const t=document.getElementById("taux").value/100;
  const M=document.getElementById("capital").value;
  const m = document.getElementById('mensu').value;
  const n = -Math.log(1-(M*t/12)/m)/Math.log(1+(t/12));
  document.getElementById('duree').value=Math.ceil(n);
  document.getElementById('cout').value=Math.round(m*n-M);
}
function taux() {
  const M=document.getElementById("capital").value;
  const n=document.getElementById("duree").value;
  const m = document.getElementById('mensu').value;
  const t=newtonRaphson(equation, equation_der, .01, .001, 1000);
  document.getElementById('taux').value=parseFloat((t*100).toFixed(2));
  document.getElementById('cout').value=Math.round(m*n-M);
}

function equation_der(t){
  const M=document.getElementById("capital").value;
  const n=document.getElementById("duree").value;
  return M*12**(-n-1)*(t+12)**(n-1)*(n*t+t+12);

}

function equation(t){
  const M=document.getElementById("capital").value;
  const n=document.getElementById("duree").value;
  const m=document.getElementById('mensu').value;
  return ((M*t/12))/(1-Math.pow(1+(t/12),-n))-m;
}

function changer_calcul() {
    s=document.getElementById('calcul').value;
    switch (s) {
      case '0':
        etat=mensu;
        break;
      case '1':
        etat=emprunt;
        break;
      case '2':
        etat=duree;
        break;
      case '3':
        etat=taux;
        break;
      default:
        console.log("No match found");
    }
}

changer_calcul();

document.getElementById("bouton").addEventListener("mouseup",calcul);
document.getElementById("calcul").addEventListener("mouseup",changer_calcul);

function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => start + i);
}


function calcul() {
  etat();
  const t=document.getElementById("taux").value/100;
  const n=document.getElementById("duree").value;
  const M=document.getElementById("capital").value;
  const m=document.getElementById('mensu').value;
  console.log(M);
  interval=range(0, n);
  var Remboursement = {
    x: interval,
    y: interval.map(a => a * m),
    type: 'lines',
    fill: 'tonexty',
    name: 'Capital remboursé',
  };
  var Capital_remboursé = {
    x: interval,
    y: interval.map(a => a*m-a*((M*t/12))/(1-Math.pow(1+(t/12),-a))+200000),
    type: 'lines',
    fill: 'tonexty',
    name: 'Intérêt',
  };
  var data = [Remboursement,Capital_remboursé];
  Plotly.newPlot('Plot', data);
};




