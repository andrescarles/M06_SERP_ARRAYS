<a name="Game"></a>

## Game
Classe que representa el joc de la serp (snake)

**Kind**: global class  

* [Game](#Game)
    * [new Game(width, height, amount)](#new_Game_new)
    * [.initCanvas(width, height)](#Game+initCanvas)
    * [.start()](#Game+start)
    * [.drawSquare(x, y, color)](#Game+drawSquare)
    * [.drawSnake()](#Game+drawSnake)
    * [.clear()](#Game+clear)
    * [.drawFood()](#Game+drawFood)
    * [.collides(x, y)](#Game+collides) ⇒ <code>boolean</code>
    * [.addFood()](#Game+addFood)
    * [.newTile()](#Game+newTile) ⇒ <code>Array</code>
    * [.step()](#Game+step)
    * [.input(e)](#Game+input)

<a name="new_Game_new"></a>

### new Game(width, height, amount)
Inicialitza els paràmetres del joc i crea el canvas


| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | width del canvas |
| height | <code>number</code> | height del canvas |
| amount | <code>number</code> | nombre de quadrats per fila de la quadrícula |

<a name="Game+initCanvas"></a>

### game.initCanvas(width, height)
Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)

**Kind**: instance method of [<code>Game</code>](#Game)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | width del canvas |
| height | <code>number</code> | height del canvas |

<a name="Game+start"></a>

### game.start()
Inicialitza els paràmetres del joc:
Serp al centre, direcció cap a la dreta, puntuació 0

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+drawSquare"></a>

### game.drawSquare(x, y, color)
Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas

**Kind**: instance method of [<code>Game</code>](#Game)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | posició x de la quadrícula (no del canvas) |
| y | <code>number</code> | posició y de la quadrícula (no del canvas) |
| color | <code>string</code> | color del quadrat |

<a name="Game+drawSnake"></a>

### game.drawSnake()
Dibuixa la serp al canvas

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+clear"></a>

### game.clear()
Neteja el canvas (pinta'l de blanc)

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+drawFood"></a>

### game.drawFood()
Dibuixa la poma al canvas

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+collides"></a>

### game.collides(x, y) ⇒ <code>boolean</code>
La serp xoca amb la posició donada?

**Kind**: instance method of [<code>Game</code>](#Game)  
**Returns**: <code>boolean</code> - - xoca o no  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | posició x a comprovar |
| y | <code>number</code> | posició y a comprovar |

<a name="Game+addFood"></a>

### game.addFood()
Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+newTile"></a>

### game.newTile() ⇒ <code>Array</code>
Calcula una nova posició a partir de la ubicació de la serp

**Kind**: instance method of [<code>Game</code>](#Game)  
**Returns**: <code>Array</code> - - nova posició  
<a name="Game+step"></a>

### game.step()
Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
i ho dibuixa al canvas

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+input"></a>

### game.input(e)
Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)

**Kind**: instance method of [<code>Game</code>](#Game)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | l'event de la tecla premuda |

