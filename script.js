class Base 
{
    constructor(base, minutos) 
    {
        this.base = base;
        this.minutos = minutos;
        this.siguiente = null;
        this.before = null;
    }

    getBase() 
    {
        return this.base;
    }

    getMinutos() 
    {
        return this.minutos;
    }

    getInfo() 
    {
        return `Base: ${this.base}, Duración: ${this.minutos} minutos`
    }

    infoTarjeta(hora, minutos) 
    {
        return `<div><p>Base: ${this.getBase()}</p><p>Hora de llegada: ${hora}</p><p>Minutos faltantes: ${minutos}</p></div>`;
    }

}

class Data 
{
    constructor() 
    {
        this.inicio = null;
        this.long = 0;
    }

    agregar(base)
    {
        if(this.inicio === null)
        {
            this.inicio = base;
            base.siguiente = this.inicio;
            base.anterior = this.inicio;
            this.long++;
        } 
        else 
        {
            let last = this.inicio.anterior;
            base.siguiente = this.inicio;
            base.anterior = last;
            last.siguiente = base;
            this.inicio.anterior = base;
            this.long++;
        }
    }

    listar() 
    {
        let listInfo = '';
        let temp = this.inicio;
        if(temp == null) 
        {
            return '<div>La lista está vacía </div>';
        }
        else 
        {
            let temp = this.inicio;
            do 
            {
               listInfo += `<div>${temp.getInfo()}</div></br>`;
                temp = temp.siguiente;
            } 
            while (temp != this.inicio);
            return listInfo;
        }
    }

    borrar(nombre) 
    {
        let delBase;
        let tail;
        let siguiente;
        if(this.inicio == null) 
        {
            return null;
        }

        else if (this.inicio.getBase() == nombre && this.long === 1) 
        {
            delBase = this.inicio;
            this.inicio = null;
            delBase.siguiente = null;
            delBase.anterior = null;
            this.long--;
            return delBase;
        } 

        else if (this.inicio.getBase() == nombre) 
        {
            delBase = this.inicio;
            tail = delBase.anterior;
            siguiente = delBase.siguiente;
            this.inicio = siguiente;
            this.inicio.anterior = last;
            tail.siguiente = this.inicio;
            delBase.anterior = null;
            delBase.siguiente = null;
            this.long--;
            return delBase;
        } 

        else 
        {
            let anterior = this.inicio;
            let actual = this.inicio.siguiente;
            while(actual !== this.inicio) 
            {
                if(actual.getBase() == nombre && actual.siguiente == this.inicio) 
                {
                    delBase = actual;
                    siguiente = delBase.siguiente;
                    anterior.siguiente = siguiente;
                    siguiente.anterior = anterior;
                    delBase.siguiente = null;
                    delBase.before = null;
                    this.long--;
                    return delBase;
                } 
                else
                {
                    anterior.actual;
                    actual.actual.siguiente;
                }
            }
            return null;
        }
    }
    
    crearTarjeta(base, hora, minutos) 
    {
        let tarjeta = '';   
        let horas = 0;
        let buscar = this._buscarBase(base);

        if(!buscar) 
        {
            return null;
        } 
        else 
        {
            while(minutos >= 0) 
            {
                tarjeta += buscar.infoTarjeta(this._horasModificadas(hora, horas), minutos) + '\n' + '////////////////////////////////';               
                horas += buscar.siguiente.getMinutos();
                minutos -= buscar.siguiente.getMinutos();
                buscar = buscar.siguiente;
            }
            return tarjeta;
        }   
    }

    
    _horasModificadas(hora, minutos) 
    {
        let hourMinutes = ((hora * 60) + minutos) / 60;
        let hoursTotal = Math.trunc(hourMinutes);
        let minusMinutes = Math.round((hourMinutes - hoursTotal) * 60);
        if(minusMinutes < 10) {
            return `${hoursTotal}:0${minusMinutes}`;
        } 
        else 
        {
            return `${hoursTotal}:${minusMinutes}`;
        }
    }

    _buscarBase(nombre)
    {
        let nombreBase = this.inicio;
        if(!nombreBase) 
        {
            return null;
        } 
        else 
        {
            do
            {
                if(nombreBase.getBase() == nombre) 
                {
                    return nombreBase;
                } 
                else 
                {
                    nombreBase = nombreBase.siguiente;
                }
            } while(nombreBase !== this.inicio);
            return null;
        }
    }

}

let data01 = new Data();

let details = document.getElementById('details');

const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () =>{
    let nombre = document.getElementById('nameDelInp').value;
    let deleteBase = data01.borrar(nombre);

    if(deleteBase) 
    {
        details.innerHTML = `<div>La base ${nombre} ha sido eliminada con éxito</div>`;
    } 

    else if(!nombre) 

    {
        details.innerHTML = `<div>Ingresa la base a eliminar</div>`;
    } 

    else 
    {
        details.innerHTML = `<div>La base ${nombre} no existe</div>`;
    }
});

const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    let nombre = document.getElementById('nameInp').value;
    let duration = Number(document.getElementById('minutesInp').value);
    let newBase = new Base(nombre, duration);
    data01.agregar(newBase);
    details.innerHTML = `<div>La base ${newBase.getBase()} ha sido creada con éxito</div>`;
});

const btnList = document.getElementById('btnList');
btnList.addEventListener('click', () =>  {
    let listCheck = data01.listar();

    if(!listCheck) 
    {
        details.innerHTML = '<div>La lista está vacía </div>';
    }

    details.innerHTML = `${data01.listar()}`;
});

let btnCrearTarj = document.getElementById('btnCreateCarc');
btnCrearTarj.addEventListener('click', () =>{
    let base = document.getElementById('nameCardInp').value;
    let hora = Number(document.getElementById('hourCardInp').value);
    let minutos = Number(document.getElementById('minutesInp').value); 
    let tarjeta = data01.crearTarjeta(base, hora, minutos);

    if(!data01) 
    {
        details.innerHTML = '<div>La lista está vacía</div>';
    } 

    else if(!tarjeta) 
    {
        details.innerHTML = `<div>La base: ${base} no ha sido creada</div>`;
    } 

    else 
    {
        details.innerHTML = `<div>La ruta empieza en la base: ${base}</div> </br>
        <div>Más información: </div> </br>
        <div>${tarjeta}</div>`;
    }
});