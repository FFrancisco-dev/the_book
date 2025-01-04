const dominio = "https://b433-62-82-151-251.ngrok-free.app";

               const fetchData = async () => {
                  try{
                     const res = await fetch(`${dominio}/cover`);
                     if (!res.ok){
                           throw new Error('Nope');
                     }
                          const data = await res.json()
                          cover(data);
                  } catch (error){
                     console.error("error");
                  }
                }               
               
                  fetchData();

               function cover(data) {
                  const url = [];
                  const titulo = [];
                  const lin=[];
                  const des=[];
                  const aut=[];
                  const cov_id=[];
   
                  for (let i = 0; i < data.length; i++) {
                          url.push(data[i].cover_url);
                          titulo.push(data[i].title);
                          lin.push(data[i].book_url);
                          aut.push(data[i].autor);
                          des.push(data[i].descripcin);
                          cov_id.push(data[i].cover_id)
                 


                const main = document.querySelector("main");
                const div = document.createElement("div");
                const a = document.createElement("a");
                const p = document.createElement("p");
                const h3 = document.createElement("h3");
                const descr = document.createTextNode(des[i]);
                const autr = document.createTextNode(aut[i]);
                  const article = document.createElement("article");
                  const title = document.createTextNode(titulo[i]);
                  const aText = document.createTextNode("link de descarga");
                  const h2 = document.createElement("h2");
                  const imag = document.createElement("img");
                  const btu = document.createElement("buttom");
                      main.appendChild(article);
                      div.appendChild(a);
                      div.appendChild(btu);
                      div.appendChild(btu);
                      h2.appendChild(title);
                      h3.appendChild(autr);
                      p.appendChild(descr);
                      article.appendChild(h2);
                      article.appendChild(imag);
                      imag.src =`./images/${url[i]}`;
                      article.appendChild(p);
                      article.appendChild(h3);
                      a.appendChild(aText);
                      btu.appendChild(aText);
                      a.href=`${lin[i]}`; 
                      imag.setAttribute("id", `${cov_id[i]}`)
                      article.appendChild(div);
               
     
    btu.addEventListener(type ="click", function send_id(event){
      event.preventDefault();
        
           location.href = `${dominio}/book?id=${cov_id[i]}`;
       }               
      

      
  
 
)
}}