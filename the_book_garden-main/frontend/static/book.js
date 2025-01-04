const parametros = new URLSearchParams(window.location.search);

const id = parametros.get('id');

const fetchData = async () => {
   try{
      const res = await fetch(`https://b433-62-82-151-251.ngrok-free.app/book_cover?cover_id=${id}`);
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

         const  url    = data[0].cover_url;
         const  titulo = data[0].title;
         const  lin    = data[0].book_url;
         const  aut    = data[0].autor;
         const  des    = data[0].descripcin;
         
         const main    = document.getElementById("main");
         const div     = document.createElement("div");
         const a       = document.createElement("a");
         const p       = document.createElement("p");
         const h3      = document.createElement("h3");
         const descr   = document.createTextNode(des);
         const autr    = document.createTextNode(` autor(es,as): ${aut}`);
         const re      = document.createTextNode("inicio");
         const x       = document.createElement("i");
         const retro   = document.createElement("button");
          
         const article = document.createElement("article");
         const title   = document.createTextNode(titulo);
         const aText   = document.createTextNode("link de descarga");
         const h2      = document.createElement("h2");
         const imag    = document.createElement("img");
              
         main.appendChild(article);
          div.appendChild(a);
           h2.appendChild(title);
           h3.appendChild(autr);
            p.appendChild(descr);
      article.appendChild(h2);
      article.appendChild(imag);
         imag.src =`./images/${url}`;
      article.appendChild(p);
      article.appendChild(h3);
            a.appendChild(aText);
            a.href=`${lin}`; 
      article.appendChild(div);
        retro.appendChild(re);
      article.appendChild(retro); 

      retro.addEventListener(type ="click", function re(event){
         event.preventDefault();
         location.href = `https://b433-62-82-151-251.ngrok-free.app/`
      })
 }  


const comentar = document.getElementById("enviar_comentario");

comentar.addEventListener(type ="click", function sendcomment(event){
   event.preventDefault();
     const comentarioValue = document.getElementById("contenido_comentario").value;
     const updat = {
      title: 'comentario creado',
      body: `${comentarioValue}`,
      userId: 1,
      };
      
      const option = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updat),
      };
      fetch(`https://b433-62-82-151-251.ngrok-free.app/comment?comentario=${comentarioValue}&id=${id}`, option)
      .then(data => {
          if (!data.ok) {
            throw Error(data.status);
           }
           return data.json();
          }).then(updat => {
          console.log(updat)})

          window.location.reload()
    } )   



    const fetchD = async () => {
      try{
         const res = await fetch(`https://b433-62-82-151-251.ngrok-free.app/book_comment?book_id=${id}`);
         if (!res.ok){
               throw new Error('Nope');
         }
              const data = await res.json()
              comments(data);
      } catch (error){
         console.error("error");
      }
    }               
   
      fetchD();

function comments( data ) {

   const b = [];

   for (let index = 0; index < data.length; index++) {
      b.push(data[index].comentario);
      
   }
  
   if( b.length == 0 || b[0] === undefined ){
      
      const div_uno = document.getElementById("comentario_container");
      const p_comment_uno = document.createElement("p");
             const co_uno = document.createTextNode(data);
                       p_comment_uno.appendChild(co_uno);
                             div_uno.appendChild(p_comment_uno); 

   }else{
 

    b.forEach(i => {
      
            const div = document.getElementById("comentario_container");
      const p_comment = document.createElement("p");
             const co = document.createTextNode(i);
                       p_comment.className = "comentarios"; 
                       p_comment.appendChild(co);
                             div.appendChild(p_comment);
                           });    
   }}


  