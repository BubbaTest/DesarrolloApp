var mes_text = ["enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var dia_text = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"];

var Semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6"];

var opciones = ["Anual", "Mensual", "Semanal", "Semestral", "Trimestral"/*, "Avanzado"*/];

var Semestres = ["Semestre 1", "Semestre 2"];

var Trimestres = ["Trimestre 1", "Trimestre 2", "Trimestre 3", "Trimestre 4"];

var BtnAtras = document.getElementById("BtnAtras");

var OpcSelect = document.getElementById("OpcionSeleccionado");

var ContainerSeleccion = document.getElementById("Container-Sel");


var anoglobal = "";

var opcionGlobal = "";

var opcionpag = "";

var nivel = 0;
var semanas = [];
var ListaSemanas = [];


var ObjSemanaArray = new Object();
var ListaObjetoSemana = [];
var ParmFechas = new Object();

var JsonArraySemanas = [];


var cont = 0;

var anomin = 2017;
var anomax = 2026;


let sem1 = [];
let sem2 = [];
let sem3 = [];
let sem4 = [];
let sem5 = [];
let sem6 = [];

var PanelGeneral = document.getElementById("body-calendar-csj-all");

var PeriodoSeleccionado = "";
var anoSeleccionado = "";
var MesSeleccionado = "";
var FechaInicialSel = "";
var FechaFinalalSel = "";

var ListaSemanasCheck = [];




function diasEnUnMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}


function diasEnUnaño(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}




function fnAtrasCalendar() {

    // debugger
    nivel = nivel - 1;




    if (nivel == 0 || nivel == 1 || opcionGlobal == "Avanzado") {



        ContainerSeleccion.removeChild(ContainerSeleccion.childNodes[5]);
        CreateOpciones(anoglobal);

    }




    if (nivel == 2) {




        if (opcionGlobal == "Mensual" || opcionGlobal == "Semanal" || opcionGlobal == "Semestral" || opcionGlobal == "Trimestral") {

            if (opcionGlobal == "Mensual") {




            }

            ContainerSeleccion.removeChild(ContainerSeleccion.childNodes[6]);
            createanos(anomin, anomax);
        } else {
            CreateOpciones(anoglobal);


        }

    }


    if (nivel == 3) {
      
       
        createMeses(anoglobal, opcionpag);

    }







}


// const conSem = document.getElementById("body-calendar");


const createanos = (anomin, anomax) => {
    nivel = 1;

    BtnAtras = document.getElementById("BtnAtras");

    if (BtnAtras == undefined) {




    } else {

        BtnAtras.style.visibility = "visible";


    }





    if (PanelGeneral == null) {




    } else {

        PanelGeneral.innerHTML = '';

    }

    PanelGeneral = document.getElementById("body-calendar-csj-all");


    const containerano = document.createElement('div')
    containerano.className = "container-anos";
    containerano.id = "body-ano";

    PanelGeneral.appendChild(containerano);


    let n = anomin;
    ano = anomin;


    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione un Año";

    for (let index = anomin; index <= anomax; index++) {


        const ItemAno = document.createElement('div')
        ItemAno.className = "item-ano";
        ItemAno.onclick = function () {

            // CreateOpciones(this);
            anoglobal = this.textContent;
            opcionSiguiente(this);

        };

        const LabelAño = document.createElement('label')
        LabelAño.className = "label-ano";
        LabelAño.textContent = ano;
        // itemSemTitle.textContent = e.nombreDiaSemana;

        containerano.appendChild(ItemAno);
        ItemAno.appendChild(LabelAño);

        ano = ano + 1;



    }








}





const SeleccionarAno = (anomin, anomax) => {
    nivel = 0;

    BtnAtras = document.getElementById("BtnAtras");

    if (BtnAtras == undefined) {




    } else {

        BtnAtras.style.visibility = "hidden";


    }





    if (PanelGeneral == null) {




    } else {

        PanelGeneral.innerHTML = '';

    }

    PanelGeneral = document.getElementById("body-calendar-csj-all");


    const containerano = document.createElement('div')
    containerano.className = "container-anos";
    containerano.id = "body-ano";

    PanelGeneral.appendChild(containerano);


    let n = anomin;
    ano = anomin;




    for (let index = anomin; index <= anomax; index++) {


        const ItemAno = document.createElement('div')
        ItemAno.className = "item-ano";
        ItemAno.onclick = function () {

            // CreateOpciones(this);
            anoglobal = this.textContent;
            this.classList.add('item-seleccionado');

            createAno(ano1, valor);

        };

        const LabelAño = document.createElement('label')
        LabelAño.className = "label-ano";
        LabelAño.textContent = ano;
        // itemSemTitle.textContent = e.nombreDiaSemana;

        containerano.appendChild(ItemAno);
        ItemAno.appendChild(LabelAño);

        ano = ano + 1;



    }








}



// createanos(anomin,anomax);



const CreateOpciones = (ano) => {
    nivel = 1;

    BtnAtras = document.getElementById("BtnAtras");
    // debugger
    BtnAtras.style.visibility = "hidden";

    // var ano1= ano.textContent;

    // if(ano1==undefined||ano1==""){

    //     ano1=anoglobal;

    // }

    // anoglobal=ano1;
    PanelGeneral = document.getElementById("body-calendar-csj-all");
    PanelGeneral.innerHTML = '';

    const containeropcion = document.createElement('div')
    containeropcion.className = "container-opciones";
    containeropcion.id = "body-opcion";

    PanelGeneral.appendChild(containeropcion);


    var headerCSj = document.getElementById('header-calendar-csj');


    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione una Opcion";

    for (let index = 0; index < opciones.length; index++) {


        const ItemOpcion = document.createElement('div')
        ItemOpcion.className = "item-opcion";
        ItemOpcion.onclick = function () {

            fnbuscarOpcion(this);

        };

        const LabelOpcion = document.createElement('label')
        LabelOpcion.className = "label-opcion";
        LabelOpcion.textContent = opciones[index];
        // itemSemTitle.textContent = e.nombreDiaSemana;

        containeropcion.appendChild(ItemOpcion);
        ItemOpcion.appendChild(LabelOpcion);



    }




}


//    CreateOpciones();

const CreateSemestre = (ano, valor) => {
    nivel = 3;
    var ano1 = ano.textContent;


    const OpcionSelec = document.createElement('div');
    OpcionSelec.className = "item-seleccionado";
    OpcionSelec.id = "MesSeleccionado";

    ContainerSeleccion.appendChild(OpcionSelec);


    const labelName = document.createElement('label');
    labelName.textContent = "Año:";

    OpcionSelec.appendChild(labelName);


    const Opc = document.createElement('label');
    Opc.textContent = anoglobal;

    OpcionSelec.appendChild(Opc);


    PanelGeneral.innerHTML = '';

    const containerSemestre = document.createElement('div')
    containerSemestre.className = "container-semestres";
    containerSemestre.id = "body-semestre";

    PanelGeneral.appendChild(containerSemestre);


    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione un Semestre";

    for (let index = 0; index < Semestres.length; index++) {


        const ItemSemestre = document.createElement('div')
        ItemSemestre.className = "item-semestre";
        ItemSemestre.onclick = function () {




            var itemSemestres = document.getElementsByClassName('item-semestre item-seleccionado');


            for (let index = 0; index < itemSemestres.length; index++) {

                itemSemestres[index].classList.remove('item-seleccionado');

            }


            this.classList.add('item-seleccionado');



            var g = this.getElementsByClassName('label-Semestre');

            var Semestre = g[0].innerText;
            var CodSemestre;
            var periodo = valor;


            if (Semestre == "Semestre 1") {

                CodSemestre = "SEM006";

            }


            if (Semestre == "Semestre 2") {

                CodSemestre = "SEM007";

            }



            PeriodoSeleccionado = CodSemestre;
            anoSeleccionado = ano;
            MesSeleccionado = "";
            FechaInicialSel = "";
            FechaFinalalSel = "";



            console.log("***********************");
            console.log(PeriodoSeleccionado);
            console.log(anoSeleccionado);
            console.log(MesSeleccionado);
            console.log(FechaInicialSel);
            console.log(FechaFinalalSel);
            console.log("***********************");






        };

        const LabelSemestre = document.createElement('label')
        LabelSemestre.className = "label-Semestre";
        LabelSemestre.textContent = Semestres[index];
        // itemSemTitle.textContent = e.nombreDiaSemana;

        containerSemestre.appendChild(ItemSemestre);
        ItemSemestre.appendChild(LabelSemestre);



    }




}





const CreateTrimestre = (ano, valor) => {
    nivel = 3;
    var ano1 = ano.textContent;


    const OpcionSelec = document.createElement('div');
    OpcionSelec.className = "item-seleccionado";
    OpcionSelec.id = "MesSeleccionado";

    ContainerSeleccion.appendChild(OpcionSelec);


    const labelName = document.createElement('label');
    labelName.textContent = "Año:";

    OpcionSelec.appendChild(labelName);


    const Opc = document.createElement('label');
    Opc.textContent = anoglobal;

    OpcionSelec.appendChild(Opc);



    PanelGeneral.innerHTML = '';

    const containerTrimestre = document.createElement('div')
    containerTrimestre.className = "container-trimestres";
    containerTrimestre.id = "body-trimestre";

    PanelGeneral.appendChild(containerTrimestre);


    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione un Trimestre";

    for (let index = 0; index < Trimestres.length; index++) {


        const ItemTrimestre = document.createElement('div')
        ItemTrimestre.className = "item-trimestre";
        ItemTrimestre.onclick = function () {


            var g = this.getElementsByClassName('label-trimestre');

            var trimestre = g[0].innerText;
            var Codtrimestre;
            var periodo = valor;


            var itemTrimestre = document.getElementsByClassName('item-trimestre');


            for (let index = 0; index < itemTrimestre.length; index++) {

                itemTrimestre[index].classList.remove('item-seleccionado');

            }


            this.classList.add('item-seleccionado');





            if (trimestre == "Trimestre 1") {

                Codtrimestre = "TRI002";

            }


            if (trimestre == "Trimestre 2") {

                Codtrimestre = "TRI003";

            }

            if (trimestre == "Trimestre 3") {

                Codtrimestre = "TRI004";

            }

            if (trimestre == "Trimestre 4") {

                Codtrimestre = "TRI005";

            }

            PeriodoSeleccionado = Codtrimestre;
            anoSeleccionado = ano;
            MesSeleccionado = "";
            FechaInicialSel = "";
            FechaFinalalSel = "";



            console.log("***********************");
            console.log(PeriodoSeleccionado);
            console.log(anoSeleccionado);
            console.log(MesSeleccionado);
            console.log(FechaInicialSel);
            console.log(FechaFinalalSel);
            console.log("***********************");








        };

        const LabelTrimestre = document.createElement('label')
        LabelTrimestre.className = "label-trimestre";
        LabelTrimestre.textContent = Trimestres[index];
        // itemSemTitle.textContent = e.nombreDiaSemana;

        containerTrimestre.appendChild(ItemTrimestre);
        ItemTrimestre.appendChild(LabelTrimestre);



    }




}

function opcionSiguiente(element) {


    // debugger

    if (opcionGlobal == "Mensual") {




        createMesesSinSemanas(anoglobal, opcionGlobal);
    }

    if (opcionGlobal == "Semestral") {

        CreateSemestre(anoglobal, opcionGlobal);


    }


    if (opcionGlobal == "Trimestral") {


        CreateTrimestre(anoglobal, opcionGlobal);


    }

    if (opcionGlobal == "Semanal") {

        createMeses(anoglobal, opcionGlobal);

    }


    if (opcionGlobal == "Anual") {




        var ListAnos = document.getElementsByClassName("item-ano");


        for (let index = 0; index < ListAnos.length; index++) {

            ListAnos[index].classList.remove('item-seleccionado');


        }

        element.classList.add('item-seleccionado');

        createAno(anoglobal, this);

    }


}

function fnbuscarOpcion(evt, ano1) {


    ContainerSeleccion = document.getElementById("Container-Sel");
    // debugger
    nivel = 2;

    //     alert(valor);
    //    alert(ano1);

    ano1 = "";
    var valor = evt.textContent;

    opcionGlobal = valor;




    const OpcionSel = document.createElement('div');
    OpcionSel.className = "item-seleccionado";
    OpcionSel.id = "OpcionSeleccionado";

    ContainerSeleccion.appendChild(OpcionSel);


    const labelName = document.createElement('label');
    labelName.textContent = "Opcion:";

    OpcionSel.appendChild(labelName);


    const Opc = document.createElement('label');
    Opc.textContent = opcionGlobal;

    OpcionSel.appendChild(Opc);






    if (valor == "Avanzado") {

        createAvanzado(ano1, valor);

    } else {

        createanos(anomin, anomax);
    }


    //     if(ano1==undefined || ano1==""){


    //         ano1=anoglobal;
    //     }

    //     if(valor=="Anual"){

    // evt.classList.add('item-seleccionado');

    //         createAno(ano1,valor);
    //     }





    // if(valor=="Mensual"){

    //     createMesesSinSemanas(ano1,valor);
    // }

    // if(valor=="Semestral"){

    //     CreateSemestre(ano1,valor);


    // }


    // if(valor=="Trimestral"){


    //   CreateTrimestre(ano1,valor);


    // }

    // if(valor=="Semanal"){

    //     createMeses(ano1,valor);

    // }

    // if(valor=="Avanzado"){

    //     createAvanzado(ano1,valor);

    // }




}


function fnbuscarmes(evt) {

    var ano = evt.textContent;

    createMeses(ano);


}


function fnbuscarmesporano(ano1) {



    createMeses(ano1);


}





function Mensua() {


}




/***********************************************************************meses */


function diasEnUnMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}


function diasEnUnaño(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}



function createAno(ano1, ele) {

    nivel = 1;



    var valor = "ANU008";




    PeriodoSeleccionado = valor;
    anoSeleccionado = ano1;
    MesSeleccionado = "";
    FechaInicialSel = "";
    FechaFinalalSel = "";



    console.log(PeriodoSeleccionado)

    console.log(anoSeleccionado);

}


//Avanzado 


const createAvanzado = (año, valor) => {

    BtnAtras.style.visibility = "visible";
    nivel = 3;

    var PanelGeneral = document.getElementById("body-calendar-csj-all");

    PanelGeneral.innerHTML = '';

    const containerAvanzado = document.createElement('div')
    containerAvanzado.className = "container-rangoAv";
    containerAvanzado.id = "body-meses";

    PanelGeneral.appendChild(containerAvanzado);


    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Ingrese las Fechas";

    const ItemContainerInput = document.createElement('div')
    ItemContainerInput.className = "item-mes";
    // ItemContainerInput.onclick=function(){

    //     var itemMeses= document.getElementsByClassName('item-mes');


    //      itemMeses[index].classList.remove('item-calendar-select');




    //     this.classList.add('item-calendar-select');




    //  fnbuscarsemanas(año,index,valor);

    // }



    const ItemTituloInput = document.createElement('div')
    ItemTituloInput.className = "item-label-fecha";
    ItemTituloInput.textContent = "Fecha Inicial";



    const InptFechaIncial = document.createElement('input')
    InptFechaIncial.className = "input-csj";
    InptFechaIncial.id = "InputFechaIncial";
    InptFechaIncial.setAttribute("maxlength", "10");

    const ItemTituloInput2 = document.createElement('div')
    ItemTituloInput2.className = "item-label-fecha";
    ItemTituloInput2.textContent = "Fecha Final";



    const InptFechaFinal = document.createElement('input')
    InptFechaFinal.className = "input-csj";
    InptFechaFinal.id = "InputFechaFinal";
    InptFechaFinal.setAttribute("maxlength", "10");


    const ContainerBtnFecha = document.createElement('div')
    ContainerBtnFecha.className = "container-btnfecha";

    const ContainerBtnFecha2 = document.createElement('div')
    ContainerBtnFecha2.className = "container-btnfecha2";



    const BtnAceptar = document.createElement('button')
    BtnAceptar.textContent = "Aceptar";
    BtnAceptar.className = "BtnAceptar";
    BtnAceptar.onclick = function () {

        var a;
        var b;


        var InputFechaIncial = document.getElementById("InputFechaIncial");
        a = InputFechaIncial.value;
        validarFecha(a, "inicial");

        var InptFechaFinal = document.getElementById("InputFechaFinal");
        b = InptFechaFinal.value;
        validarFecha(b, "final");


        console.log("****************************");
        console.log(a);
        console.log(b);
        console.log("****************************");


    }




    const BtnLimpiar = document.createElement('button')
    BtnLimpiar.textContent = "Limpiar";
    BtnLimpiar.className = "BtnLimpiar";
    BtnLimpiar.onclick = function () {



        var InputFechaIncial = document.getElementById("InputFechaIncial");
        InputFechaIncial.value = "";


        var InptFechaFinal = document.getElementById("InputFechaFinal");
        InptFechaFinal.value = "";





    }





    containerAvanzado.appendChild(ItemTituloInput);
    containerAvanzado.appendChild(InptFechaIncial);



    containerAvanzado.appendChild(ItemTituloInput2);
    containerAvanzado.appendChild(InptFechaFinal);


    containerAvanzado.appendChild(ContainerBtnFecha);
    ContainerBtnFecha.appendChild(BtnAceptar);
    containerAvanzado.appendChild(ContainerBtnFecha2);
    ContainerBtnFecha2.appendChild(BtnLimpiar);






    var input = document.querySelectorAll('.input-csj');
    dateInputMask(input[0]);
    dateInputMask(input[1]);



}





var dateInputMask = function dateInputMask(elm) {


    elm.addEventListener('keypress', function (e) {

        if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
        }

        var len = elm.value.length;

        if (len == 2 && elm.value > 31) {

            var e = elm.value;

            e.substring(1);


        }

        // If we're at a particular place, let the user type the slash
        // i.e., 12/12/1212
        if (len !== 1 || len !== 3) {
            if (e.keyCode == 47) {
                e.preventDefault();
            }
        }

        // If they don't add the slash, do it for them...
        if (len === 2) {
            elm.value += '/';
        }

        // If they don't add the slash, do it for them...
        if (len === 5) {
            elm.value += '/';
        }
    });
};



var validarFecha = function (fecha, flag) {

    //Funcion validarFecha 
    //Escrita por Buzu feb 18 2010. (FELIZ CUMPLE BUZU!!!
    //valida fecha en formato aaaa-mm-dd
    var fechaArr = fecha.split('/');
    var aho = fechaArr[0];
    var mes = fechaArr[1];
    var dia = fechaArr[2];

    var plantilla = new Date(dia, mes - 1, aho);//mes empieza de cero Enero = 0

    if (!plantilla || plantilla.getFullYear() == dia && plantilla.getMonth() == mes - 1 && plantilla.getDate() == aho) {
        return true;
    } else {
        if (flag == "inicial") {

            alert("La Fecha Inicial no existe o esta mal escrita.");

        } else {


            alert("La Fecha Final no existe o esta mal escrita.");

        }

        return false;
    }
}

// const conSem = document.getElementById("body-calendar");


const createMeses = (año, valor) => {

    nivel = 3;
   
    JsonArraySemanas = [];
    ListaObjetoSemana = [];
    

    var prueba = document.getElementById("MesSeleccionado");

    // debugger

    if (prueba == undefined || prueba == null) {

        const OpcionSelec = document.createElement('div');
        OpcionSelec.className = "item-seleccionado";
        OpcionSelec.id = "MesSeleccionado";

        ContainerSeleccion.appendChild(OpcionSelec);


        const labelName = document.createElement('label');
        labelName.textContent = "Año:";

        OpcionSelec.appendChild(labelName);


        const Opc = document.createElement('label');
        Opc.textContent = anoglobal;

        OpcionSelec.appendChild(Opc);

    } else {

        ContainerSeleccion.removeChild(ContainerSeleccion.childNodes[7]);

    }





    var PanelGeneral = document.getElementById("body-calendar-csj-all");

    PanelGeneral.innerHTML = '';

    const containerMensual = document.createElement('div')
    containerMensual.className = "container-meses";
    containerMensual.id = "body-meses";

    PanelGeneral.appendChild(containerMensual);



    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione un Mes";

    for (let index = 0; index < mes_text.length; index++) {


        const ItemMes = document.createElement('div')
        ItemMes.className = "item-mes";
        ItemMes.onclick = function () {

            var itemMeses = document.getElementsByClassName('item-mes');


            for (let index = 0; index < itemMeses.length; index++) {

                itemMeses[index].classList.remove('item-calendar-select');

            }


            this.classList.add('item-calendar-select');




            fnbuscarsemanas(año, index, valor);

        }

        const itemSemTitle = document.createElement('div')
        itemSemTitle.className = "item-semana-title";
        // itemSemTitle.textContent = e.nombreDiaSemana;

        const ItemNombreMes = document.createElement('div')
        ItemNombreMes.className = "item-nombre-mes";
        ItemNombreMes.textContent = mes_text[index];

        const itemNumbermes = document.createElement('div')
        itemNumbermes.className = "item-number-mes";
        itemNumbermes.textContent = diasEnUnMes(index + 1, año) + " días";

        containerMensual.appendChild(ItemMes);
        ItemMes.appendChild(ItemNombreMes);


        ItemMes.appendChild(itemNumbermes);


    }




}



/* Llegada a la busqueda solo por mes */



const createMesesSinSemanas = (año, periodo) => {

    nivel = 3;

    // debugger

    const OpcionSelec = document.createElement('div');
    OpcionSelec.className = "item-seleccionado";
    OpcionSelec.id = "AnoSeleccionado";

    ContainerSeleccion.appendChild(OpcionSelec);


    const labelName = document.createElement('label');
    labelName.textContent = "Año:";

    OpcionSelec.appendChild(labelName);


    const Opc = document.createElement('label');
    Opc.textContent = anoglobal;

    OpcionSelec.appendChild(Opc);




    var PanelGeneral = document.getElementById("body-calendar-csj-all");

    PanelGeneral.innerHTML = '';

    const containerMensual = document.createElement('div')
    containerMensual.className = "container-meses";
    containerMensual.id = "body-meses";

    PanelGeneral.appendChild(containerMensual);


    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione un Mes";

    for (let index = 0; index < mes_text.length; index++) {


        const ItemMes = document.createElement('div')
        ItemMes.className = "item-mes";
        ItemMes.onclick = function () {


            var itemMeses = document.getElementsByClassName('item-mes');


            for (let index = 0; index < itemMeses.length; index++) {

                itemMeses[index].classList.remove('item-calendar-select');

            }


            this.classList.add('item-calendar-select');


            var g = this.getElementsByClassName('item-nombre-mes');

            var mes = g[0].innerText;
            var parametromes;





            for (let index = 0; index < mes_text.length; index++) {

                if (mes == mes_text[index]) {

                    parametromes = index;


                }

            }


            if (periodo == "Mensual") {


                periodo = "MEN001"

            }


            PeriodoSeleccionado = periodo;
            anoSeleccionado = año;
            MesSeleccionado = parametromes + 1;
            FechaInicialSel = "";
            FechaFinalalSel = "";

            console.log("***********************");
            console.log(PeriodoSeleccionado);
            console.log(anoSeleccionado);
            console.log(MesSeleccionado);
            console.log(FechaInicialSel);
            console.log(FechaFinalalSel);
            console.log("***********************");



        }

        const itemSemTitle = document.createElement('div')
        itemSemTitle.className = "item-semana-title";
        // itemSemTitle.textContent = e.nombreDiaSemana;

        const ItemNombreMes = document.createElement('div')
        ItemNombreMes.className = "item-nombre-mes";
        ItemNombreMes.textContent = mes_text[index];

        const itemNumbermes = document.createElement('div')
        itemNumbermes.className = "item-number-mes";
        itemNumbermes.textContent = diasEnUnMes(index + 1, año) + " días";

        containerMensual.appendChild(ItemMes);
        ItemMes.appendChild(ItemNombreMes);


        ItemMes.appendChild(itemNumbermes);


    }




}



function fnbuscarsemanas(año, mes, valor) {

    nivel = 4;


    // debugger

    const OpcionSelec = document.createElement('div');
    OpcionSelec.className = "item-seleccionado";
    OpcionSelec.id = "MesSeleccionado";

    ContainerSeleccion.appendChild(OpcionSelec);


    const labelName = document.createElement('label');
    labelName.textContent = "Mes:";

    OpcionSelec.appendChild(labelName);


    const Opc = document.createElement('label');
    Opc.textContent = mes_text[mes];

    OpcionSelec.appendChild(Opc);



    let Codsemana = "SMN001"

    numerar(año, mes, valor);
    crearSemanas(año, mes, valor, Codsemana);

    var c = document.getElementById('CalendarOpcionTitle');

    c.innerText = "";
    c.innerText = "Seleccione una Semana";





}






/*******************************************Buscar Semanas******************************** */






var mes_text = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var dia_text = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"];

var Semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6"];

var contadorsemanas = 0;



var listadosemanal = [];



function numerar(año, mes, valor) {
    ListaSemanas = [];
    var semanas = [];

    // console.log(valor);
    // console.log(año);
    // console.log(mes);
    // console.log(codPeriodoSemanal);






    var semana = new Object();
    var semana2 = new Object();

    var ObjetoSemana = new Object();
    var ListaDiasSemana = [];

    var semanas22 = [];
    var arraydias = [];

    var semanasola = [];





    let TemplateSemanas;

    let cantidaddias = diasEnUnMes(mes + 1, año);



    let sumadia = 0;
    let suma;





    for (let index = 0; index < mes; index++) {


        suma = diasEnUnMes(index + 1, año);

        sumadia = sumadia + suma;
    }

    let diassinsuma = 0;

    diassinsuma = sumadia;

    let maxrango = diassinsuma + cantidaddias;
    if (sumadia == 0) {

        sumadia = 1;
        maxrango = cantidaddias;
    }




    if (mes == 0) {



    } else {

        sumadia = sumadia + 1;

    }

    for (i = sumadia; i <= maxrango; i++) {

        var semana = new Object();
        var ObjetoSemana = new Object();




        let fecha = fechaPorDia(año, i);
        let mes = fecha.getMonth();
        //let select_tabla = document.getElementsByClassName('tabla_mes')[mes];
        let dia = fecha.getDate()



        let dia_semana = fecha.getDay();


        semana.NumeroDia = dia;
        semana.nombreDiaSemana = dia_text[dia_semana];
        semana.diasemanas = dia_semana;


        semana2.NumeroDia = dia;
        semana2.nombreDiaSemana = dia_text[dia_semana];
        semana2.diasemanas = dia_semana;
        // semana.fecha=fecha;


        if (dia == 1) {

            var sem = 0;




            semana.semana = sem;
            semana.nombreSemana = Semanas[sem];
            ObjetoSemana.NombreSemana = Semanas[sem];
            semana.idSemana = sem;

            semana2.dias = semanas22.push(arraydias);
            semanas22.push(semana2);


        }

        //      select_tabla.children[2].children[sem].children[dia_semana].innerText = dia;


        if (dia_semana == 1) {

            if (semanas.length == 0) {
                ListaSemanas.push(ObjetoSemana);

            } else {
                sem = sem + 1;
                ListaSemanas.push(ObjetoSemana);
            }


            semanas22.push(arraydias);

            var semana2 = new Object();
            arraydias = [];
            semana.semana = sem;
            semana.nombreSemana = Semanas[sem];

            ObjetoSemana.NombreSemana = Semanas[sem];
            semana.idSemana = sem;

            semana2.semana = semana;


        } else {

            if (semanas.length == 0) {
                ListaSemanas.push(ObjetoSemana);

            }

            semana.semana = sem;
            semana.nombreSemana = Semanas[sem];
            ObjetoSemana.NombreSemana = Semanas[sem];
            semana.idSemana = sem;

            arraydias.push(semana);
        }


        semanas.push(semana);


    }


    sem1 = semanas.filter(semana => semana.nombreSemana === "Semana 1");

    sem2 = semanas.filter(semana => semana.nombreSemana === "Semana 2");
    sem3 = semanas.filter(semana => semana.nombreSemana === "Semana 3");
    sem4 = semanas.filter(semana => semana.nombreSemana === "Semana 4");
    sem5 = semanas.filter(semana => semana.nombreSemana === "Semana 5");
    sem6 = semanas.filter(semana => semana.nombreSemana === "Semana 6");

    listadosemanal.push(sem1, sem2, sem3, sem4, sem5, sem6);











}

function fechaPorDia(año, dia) {
    var date = new Date(año, 0);
    return new Date(date.setDate(dia));
}







function crearSemanas(año, mes, valor, Codsemana) {

    PanelGeneral.innerHTML = '';
    const containerSemanal = document.createElement('div')
    containerSemanal.className = "container-semanas";
    containerSemanal.id = "body-calendar";

    PanelGeneral.appendChild(containerSemanal);

    const conSem = document.getElementById("body-calendar");


    const createSem = (e) => {

        const Mitemcalendar = document.createElement('div')
        Mitemcalendar.className = "marco-item-calendar-semanas";

        const itemSemTitle = document.createElement('div')
        itemSemTitle.className = "item-semana-title";


        itemSemTitle.onclick = function () {
            PeriodoSeleccionado = "SMN001";
            cont = cont + 1;

            var g = this.getElementsByClassName('label-semana');


            var labelsemana = g[0].innerText;






            if (cont > 1) {

                cont = 0;

            } else {


                var che = this.getElementsByClassName('container-check');
                if (che[1].checked == true) {

                    console.log(ListaObjetoSemana);

                    for (let index = 0; index < ListaObjetoSemana.length; index++) {
                        if (ListaObjetoSemana[index].nombreSemana == labelsemana) {


                            ListaObjetoSemana.splice(index, 1)


                        }

                    }
                    ObjSemanaArray.ListaSemanas = "";

                    ObjSemanaArray.ListaSemanas = ListaObjetoSemana;

                    JsonArraySemanas = JSON.stringify(ObjSemanaArray);

                    console.log(JsonArraySemanas);

                }
                else {











                    //   console.log(labelsemana);

                    var fechaInicia = "";
                    var fechafinal = "";
                    var totaldias = 0;


                    if (labelsemana == "Semana 1") {




                        totaldias = sem1.length - 1;

                        fechaInicia = sem1[0].NumeroDia;
                        fechafinal = sem1[totaldias].NumeroDia;

                        // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
                        // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);

                        // let dia = fecha.getDate();
                        // console.log(dia);
                        // console.log(fecha2.toDateString());


                        var primerdia = new Date(año, mes, fechaInicia);
                        var UltimoDia = new Date(año, mes, fechafinal);

                        var MesInicial = primerdia.getMonth() + 1;
                        var MesFinal = UltimoDia.getMonth() + 1;

                        var fechaInicial = primerdia.getDate() + "/" + MesInicial + "/" + primerdia.getFullYear();
                        var fechaFinal = UltimoDia.getDate() + "/" + MesFinal + "/" + primerdia.getFullYear();

                        ParmFechas = new Object();


                        ParmFechas.fechaInicial = fechaInicial;
                        ParmFechas.fechaFinal = fechaFinal;
                        ParmFechas.nombreSemana = labelsemana;
                        ListaObjetoSemana.push(ParmFechas);


                        console.log(fechaInicial.toString());
                        console.log(fechaFinal.toString());






                    }



                    if (labelsemana == "Semana 2") {


                        totaldias = sem2.length - 1;

                        fechaInicia = sem2[0].NumeroDia;
                        fechafinal = sem2[totaldias].NumeroDia;

                        // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
                        // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);

                        // let dia = fecha.getDate();
                        // console.log(dia);
                        // console.log(fecha2.toDateString());


                        var primerdia = new Date(año, mes, fechaInicia);
                        var UltimoDia = new Date(año, mes, fechafinal);

                        var MesInicial = primerdia.getMonth() + 1;
                        var MesFinal = UltimoDia.getMonth() + 1;

                        var fechaInicial = primerdia.getDate() + "/" + MesInicial + "/" + primerdia.getFullYear();
                        var fechaFinal = UltimoDia.getDate() + "/" + MesFinal + "/" + primerdia.getFullYear();


                        ParmFechas = new Object();

                        ParmFechas.fechaInicial = fechaInicial;
                        ParmFechas.fechaFinal = fechaFinal;
                        ParmFechas.nombreSemana = labelsemana;
                        ListaObjetoSemana.push(ParmFechas);




                        // console.log(fechaInicial.toString());
                        // console.log(fechaFinal.toString());





                    }

                    if (labelsemana == "Semana 3") {


                        totaldias = sem3.length - 1;

                        fechaInicia = sem3[0].NumeroDia;
                        fechafinal = sem3[totaldias].NumeroDia;

                        // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
                        // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);

                        // let dia = fecha.getDate();
                        // console.log(dia);
                        // console.log(fecha2.toDateString());


                        var primerdia = new Date(año, mes, fechaInicia);
                        var UltimoDia = new Date(año, mes, fechafinal);

                        var MesInicial = primerdia.getMonth() + 1;
                        var MesFinal = UltimoDia.getMonth() + 1;

                        var fechaInicial = primerdia.getDate() + "/" + MesInicial + "/" + primerdia.getFullYear();
                        var fechaFinal = UltimoDia.getDate() + "/" + MesFinal + "/" + primerdia.getFullYear();


                        ParmFechas = new Object();

                        ParmFechas.fechaInicial = fechaInicial;
                        ParmFechas.fechaFinal = fechaFinal;
                        ParmFechas.nombreSemana = labelsemana;

                        ListaObjetoSemana.push(ParmFechas);

                        console.log(fechaInicial.toString());
                        console.log(fechaFinal.toString());





                    }


                    if (labelsemana == "Semana 4") {


                        totaldias = sem4.length - 1;

                        fechaInicia = sem4[0].NumeroDia;
                        fechafinal = sem4[totaldias].NumeroDia;

                        // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
                        // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);

                        // let dia = fecha.getDate();
                        // console.log(dia);
                        // console.log(fecha2.toDateString());


                        var primerdia = new Date(año, mes, fechaInicia);
                        var UltimoDia = new Date(año, mes, fechafinal);

                        var MesInicial = primerdia.getMonth() + 1;
                        var MesFinal = UltimoDia.getMonth() + 1;

                        var fechaInicial = primerdia.getDate() + "/" + MesInicial + "/" + primerdia.getFullYear();
                        var fechaFinal = UltimoDia.getDate() + "/" + MesFinal + "/" + primerdia.getFullYear();


                        ParmFechas = new Object();


                        ParmFechas.fechaInicial = fechaInicial;
                        ParmFechas.fechaFinal = fechaFinal;
                        ParmFechas.nombreSemana = labelsemana;

                        ListaObjetoSemana.push(ParmFechas);

                        console.log(fechaInicial.toString());
                        console.log(fechaFinal.toString());





                    }


                    if (labelsemana == "Semana 5") {


                        totaldias = sem5.length - 1;

                        fechaInicia = sem5[0].NumeroDia;
                        fechafinal = sem5[totaldias].NumeroDia;

                        // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
                        // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);

                        // let dia = fecha.getDate();
                        // console.log(dia);
                        // console.log(fecha2.toDateString());


                        var primerdia = new Date(año, mes, fechaInicia);
                        var UltimoDia = new Date(año, mes, fechafinal);

                        var MesInicial = primerdia.getMonth() + 1;
                        var MesFinal = UltimoDia.getMonth() + 1;

                        var fechaInicial = primerdia.getDate() + "/" + MesInicial + "/" + primerdia.getFullYear();
                        var fechaFinal = UltimoDia.getDate() + "/" + MesFinal + "/" + primerdia.getFullYear();


                        ParmFechas = new Object();


                        ParmFechas.fechaInicial = fechaInicial;
                        ParmFechas.fechaFinal = fechaFinal;
                        ParmFechas.nombreSemana = labelsemana;

                        ListaObjetoSemana.push(ParmFechas);

                        console.log(fechaInicial.toString());
                        console.log(fechaFinal.toString());





                    }


                    if (labelsemana == "Semana 6") {


                        totaldias = sem6.length - 1;

                        fechaInicia = sem6[0].NumeroDia;
                        fechafinal = sem6[totaldias].NumeroDia;

                        // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
                        // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);

                        // let dia = fecha.getDate();
                        // console.log(dia);
                        // console.log(fecha2.toDateString());


                        var primerdia = new Date(año, mes, fechaInicia);
                        var UltimoDia = new Date(año, mes, fechafinal);

                        var MesInicial = primerdia.getMonth() + 1;
                        var MesFinal = UltimoDia.getMonth() + 1;

                        var fechaInicial = primerdia.getDate() + "/" + MesInicial + "/" + primerdia.getFullYear();
                        var fechaFinal = UltimoDia.getDate() + "/" + MesFinal + "/" + primerdia.getFullYear();


                        ParmFechas = new Object();


                        ParmFechas.fechaInicial = fechaInicial;
                        ParmFechas.fechaFinal = fechaFinal;
                        ParmFechas.nombreSemana = labelsemana;

                        ListaObjetoSemana.push(ParmFechas);

                        console.log(fechaInicial.toString());
                        console.log(fechaFinal.toString());





                    }






                    anoSeleccionado = año;
                    MesSeleccionado = mes + 1;
                    FechaInicialSel = fechaInicial;
                    FechaFinalalSel = fechaFinal;


                    ObjSemanaArray.PeriodoSeleccionado = PeriodoSeleccionado;
                    ObjSemanaArray.anoSeleccionado = anoSeleccionado;
                    ObjSemanaArray.MesSeleccionado = MesSeleccionado;











                    console.log("***********************");
                    console.log(PeriodoSeleccionado);
                    console.log(anoSeleccionado);
                    console.log(MesSeleccionado);
                    console.log(FechaInicialSel);
                    console.log(FechaFinalalSel);
                    console.log("***********************");






                    ObjSemanaArray.ListaSemanas = ListaObjetoSemana;
                    JsonArraySemanas = JSON.stringify(ObjSemanaArray);
                    console.log("no esta cheked");

                    console.log(JsonArraySemanas);

                    console.log("no esta cheked");

                }

            }

        }
        // itemSemTitle.textContent = e.nombreDiaSemana;

        const itemSemBody = document.createElement('div')
        itemSemBody.className = "item-semana-body";


        const itemcontainerdia = document.createElement('div')
        itemcontainerdia.className = "container-dias";
        itemcontainerdia.id = "container-semana1";

        const labelSemTitle = document.createElement('label')
        labelSemTitle.className = "container-check label-semana";
        labelSemTitle.textContent = e.NombreSemana;



        const newCheckBox = document.createElement('input')
        newCheckBox.type = 'checkbox';
        newCheckBox.name = '';
        newCheckBox.className = "container-check";


        const spancheck = document.createElement('span')
        spancheck.className = "checkmark";





        conSem.appendChild(Mitemcalendar);


        Mitemcalendar.appendChild(itemSemTitle);



        itemSemTitle.appendChild(labelSemTitle);
        labelSemTitle.appendChild(newCheckBox);
        labelSemTitle.appendChild(spancheck);


        Mitemcalendar.appendChild(itemSemBody);

        itemSemBody.appendChild(itemcontainerdia);



    }


    // const week11=[];




    const insertSem = () => {




        ListaSemanas.forEach(x => {
            createSem(x)


        });



    }



    insertSem();







    const conWeek1 = document.getElementsByClassName("container-dias");




    var num = 0;







    const createDay = (e) => {

        var as = 0;

        if (e.nombreSemana == "Semana 1") {

            as = 0;


        }

        if (e.nombreSemana == "Semana 2") {

            as = 1;


        }

        if (e.nombreSemana == "Semana 3") {

            as = 2;


        }
        if (e.nombreSemana == "Semana 4") {

            as = 3;


        }
        if (e.nombreSemana == "Semana 5") {

            as = 4;


        }
        if (e.nombreSemana == "Semana 6") {

            as = 5;


        }


        // for (var i = 0; i < conWeek1.length; i++) {

        const itemD = document.createElement('div')
        itemD.className = "item-dia";

        const itemNomD = document.createElement('div')
        itemNomD.className = "nombre-dia";
        itemNomD.textContent = e.nombreDiaSemana;

        const itemNumD = document.createElement('div')
        itemNumD.className = "numero-dia";
        itemNumD.textContent = e.NumeroDia;



        // console.log(conWeek1[i]);

        conWeek1[as].appendChild(itemD);
        itemD.appendChild(itemNomD);
        itemD.appendChild(itemNumD);

        //     num++;

        //   }




    }



    const week1 = [];



    const insertDItem = () => {




        sem1.forEach(x => {
            createDay(x)
        });



    }


    const insertDItem2 = () => {




        sem2.forEach(x => {
            createDay(x)
        });



    }


    const insertDItem3 = () => {




        sem3.forEach(x => {
            createDay(x)
        });

    }



    const insertDItem4 = () => {




        sem4.forEach(x => {
            createDay(x)
        });



    }



    const insertDItem5 = () => {



        sem5.forEach(x => {
            createDay(x)
        });



    }



    const insertDItem6 = () => {




        sem6.forEach(x => {
            createDay(x)
        });



    }


    insertDItem();
    insertDItem2();
    insertDItem3();
    insertDItem4();
    insertDItem5();
    insertDItem6();


}

