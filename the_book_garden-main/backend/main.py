
from fastapi.staticfiles import StaticFiles
from typing import Union, Annotated
from fastapi import FastAPI, Form, Request, Response, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import bcrypt 
from starlette.datastructures import URL

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "https://b433-62-82-151-251.ngrok-free.app",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")
app.mount("/images", StaticFiles(directory="../frontend/static/images"), name="images")
template = Jinja2Templates(directory="../frontend")

@app.get("/", response_class=HTMLResponse)
async def read_root(req: Request):
    return template.TemplateResponse("index.html", {"request":req})
    
@app.get("/book", response_class=HTMLResponse)
async def read_root_lib(req: Request, id):
    print(id)
    return template.TemplateResponse("libro.html", {"request":req})


@app.get("/login")
async def root_login(req: Request):
    return template.TemplateResponse("login.html", {"request":req})

@app.post("/login/userCreate")
async def create_user(request: Request,Nombre_de_usuario:Annotated[str, Form()],Nombre:Annotated[str, Form()],Apellido:Annotated[str, Form()],Email:Annotated[str, Form()],Contraseña:Annotated[str, Form()]):

# converting password to array of bytes 
    bytes = Contraseña.encode('utf-8') 
  
# generating the salt 
    salt = bcrypt.gensalt() 
  
# Hashing the password 
    hash = bcrypt.hashpw(bytes, salt) 
   
    conexion = sqlite3.connect("user.db")
    try:
        conexion.execute("""create table user (
                                                    codigo integer primary key autoincrement,
                                                    Nombre_de_usuario,
                                                    Nombre text,
                                                    Apellido text,
                                                    Email text,
                                                    Contraseña
                                                    )""")
        print("se creo la tabla user")                        
    except sqlite3.OperationalError:
        print("La tabla user ya existe")  
        conexion.execute("insert into user(Nombre_de_usuario,Nombre,Apellido,Email,Contraseña) values (?,?,?,?,?)", (Nombre_de_usuario,Nombre,Apellido,Email,hash))
        conexion.commit()
        cursor=conexion.execute("select * from user")
        for fila in cursor:
            print(fila, "esta es la base de datos")
        conexion.close()


    
    redirect_url = request.url_for("root_login")    
    return RedirectResponse(redirect_url, status_code=status.HTTP_303_SEE_OTHER) 

@app.post("/login/user")
async def login_user(request: Request,Nombre_de_usuario:Annotated[str, Form()],Contraseña:Annotated[str, Form()]):

    
    conexion = sqlite3.connect("user.db")
    conexion.row_factory = sqlite3.Row
    a = conexion.cursor()
    a.execute(f'''SELECT Contraseña FROM user
                     WHERE Nombre_de_usuario == "{Nombre_de_usuario}"''')
    
    user = []
    for r in a.fetchall():
       user.append( dict(r))
    conexion.close() 
    us = user[0]
# encoding user password

    userBytes = Contraseña.encode('utf-8') 
  
# checking password 
    result = bcrypt.checkpw(userBytes, us['Contraseña']) 

    if result is True:
        print("BIEMVENIDO")
        redirect_url = request.url_for("read_root")
        return RedirectResponse(redirect_url, status_code=status.HTTP_303_SEE_OTHER) 
  
    else:
        print("CONTRASE:A INCORRECTA")





@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/cover/post")
async def cover_id(title,url):
    conexion = sqlite3.connect("cover.db")
    try:
        conexion.execute("""create table cover (
                              cover_id integer primary key autoincrement,
                              title text,
                              cover_url text
                        )""")
        print("se creo la tabla cover")                        
    except sqlite3.OperationalError:
        print("La tabla cover ya existe")

    conexion = sqlite3.connect("cover.db")
    conexion.execute("insert into cover(title,cover_url) values (?,?)", (title, url))
    conexion.commit()     

class Item(BaseModel):
    id: str
    title: str | None = None
    url: str | None = None


@app.get("/cover")
async def obtener_cover():
    arr = [] 
    conexion_uno = sqlite3.connect("cover.db")
    conexion_uno.row_factory = sqlite3.Row
    c = conexion_uno.cursor()
    c.execute('SELECT * FROM cover')
    for r in c.fetchall():
        arr.append( dict(r))
    conexion_uno.close()    

    return arr    

@app.get("/book_cover")
async def obtener_book( cover_id  ):
    arra = []
    conexion = sqlite3.connect("cover.db")
    conexion.row_factory = sqlite3.Row
    a = conexion.cursor()
    a.execute(f'''SELECT * FROM cover 
                     WHERE cover_id == {cover_id}''')
    for r in a.fetchall():
        arra.append( dict(r))
    conexion.close()                 

    return arra

@app.post("/comment")
async def post_comment( comentario, id ):
    conexion = sqlite3.connect("comment.db")
    try:
        conexion.execute("""create table comment (
                              comment_id integer primary key autoincrement,
                              comentario text,
                              book_id text
                        )""")
        print("se creo la tabla comment")                        
    except sqlite3.OperationalError:
        print("La tabla comment ya existe")

    conexion = sqlite3.connect("comment.db")
    conexion.execute("insert into comment(comentario,book_id) values (?,?)", (comentario, id))
    conexion.commit()
    return "comentario posteado con exito" + ": " + comentario  

@app.get("/book_comment")
async def obtener_book( book_id  ):
    comments = []
    conexion = sqlite3.connect("comment.db")
    conexion.row_factory = sqlite3.Row
    a = conexion.cursor()
    a.execute(f'''SELECT * FROM comment 
                     WHERE book_id == {book_id}''')
    for r in a.fetchall():
        comments.append( dict(r))
    conexion.close()                 
    if len(comments) <= 0 :
        return "No hay comentarios para este libro, se el primero en comentar "
    else:
        return comments
