(()=>{let e,t=[];function n(){let e=t.reduce(((e,t)=>e+parseInt(t.value)),0);document.querySelector("#total").textContent=e}function o(){let e=document.querySelector("#tbody");e.innerHTML="",t.forEach((t=>{let n=document.createElement("tr");n.innerHTML=`\n      <td>${t.name}</td>\n      <td>${t.value}</td>\n    `,e.appendChild(n)}))}function a(){let n=t.slice().reverse(),o=0,a=n.map((e=>{let t=new Date(e.date);return`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()}`})),r=n.map((e=>(o+=parseInt(e.value),o)));e&&e.destroy();let l=document.getElementById("myChart").getContext("2d");e=new Chart(l,{type:"line",data:{labels:a,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:r}]}})}function r(e){let r=document.querySelector("#t-name"),l=document.querySelector("#t-amount"),c=document.querySelector(".form .error");if(""===r.value||""===l.value)return void(c.textContent="Missing Information");c.textContent="";let u={name:r.value,value:l.value,date:(new Date).toISOString()};e||(u.value*=-1),t.unshift(u),a(),o(),n(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(u),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{e.errors?c.textContent="Missing Information":(r.value="",l.value="")})).catch((e=>{var t;e&&console.log(e),t=u,console.log("transaction",t),(void 0).transaction(["transaction"],"readwrite").objectStore("transaction").add({name:t.name,value:t.value,date:t.date}),r.value="",l.value=""}))}fetch("/api/transaction").then((e=>e.json())).then((e=>{t=e,n(),o(),a()})).catch((e=>{console.log(e)}));const l=window.indexedDB.open("BudgetDB",1);l.onerror=e=>console.log(e.target.errorCode),l.onupgradeneeded=e=>{e.target.result.createObjectStore("transaction",{keyPath:"id",autoIncrement:!0})},document.querySelector("#add-btn").onclick=function(){r(!0)},document.querySelector("#sub-btn").onclick=function(){r(!1)}})();