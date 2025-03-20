

function capital() {
  const t=document.getElementById("taux").value/100;
  const n=document.getElementById("duree").value;
  const M=document.getElementById("capital").value;
  const m = ((M*t/12))/(1-Math.pow(1+(t/12),-n));
  document.getElementById('mensu').value=Math.round(m);
  document.getElementById('cout').value=Math.round(m*n-M);
}



document.getElementById("bouton").addEventListener("mouseup",capital);
