var mes_text = ["enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var dia_text = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"];

var Semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5","Semana 6"];

var opciones = ["Anual", "Mensual", "Semanal", "Semestral", "Trimestral"];

var Semestres  = ["Semestre 1", "Semestre 2"];

var Trimestres  = ["Trimestre 1", "Trimestre 2","Trimestre 3", "Trimestre 4"];

var semanas = [];
var ListaSemanas = [];

let sem1 =[];
let sem2 =[];
let sem3 =[];
let sem4 =[];
let sem5 =[];
let sem6 = [];

var PanelGeneral = document.getElementById("body-calendar-csj-all");

var PeriodoSeleccionado= "";
var anoSeleccionado="";
var MesSeleccionado="";
var FechaInicialSel ="";
var FechaFinalalSel ="";




function diasEnUnMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}


function diasEnUnaño(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}




// const conSem = document.getElementById("body-calendar");


const createanos = (anomin, anomax) => {
    
    PanelGeneral = document.getElementById("body-calendar-csj-all");;
        
    
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

                CreateOpciones(this);

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







const CreateOpciones = (ano) =>{

    var ano1= ano.textContent;
          
        
    PanelGeneral.innerHTML='';

    const containeropcion = document.createElement('div')
    containeropcion.className="container-opciones";
    containeropcion.id="body-opcion";

    PanelGeneral.appendChild(containeropcion);

 


     for (let index = 0; index <opciones.length; index++) {
         
      
       const ItemOpcion = document.createElement('div')
       ItemOpcion.className="item-opcion";
       ItemOpcion.onclick= function (){
   
           fnbuscarOpcion(this,ano1);
   
       };
   
       const LabelOpcion = document.createElement('label')
       LabelOpcion.className = "label-opcion";
       LabelOpcion.textContent= opciones[index];
       // itemSemTitle.textContent = e.nombreDiaSemana;
   
       containeropcion.appendChild(ItemOpcion);
       ItemOpcion.appendChild(LabelOpcion);
      
     
         
     }
           
   
   
   
   }
   


   
const CreateSemestre = (ano,valor) =>{

    var ano1= ano.textContent;
          
        
    PanelGeneral.innerHTML='';

    const containerSemestre = document.createElement('div')
    containerSemestre.className="container-semestres";
    containerSemestre.id="body-semestre";

    PanelGeneral.appendChild(containerSemestre);

 


     for (let index = 0; index <Semestres.length; index++) {
         
      
       const ItemSemestre = document.createElement('div')
       ItemSemestre.className="item-semestre";
       ItemSemestre.onclick= function (){
   
        var g = this.getElementsByClassName('label-Semestre');
            
        var Semestre= g[0].innerText;
        var CodSemestre;
        var periodo = valor;


        if( Semestre=="Semestre 1"){

         CodSemestre="SEM006";

        }

        
        if( Semestre=="Semestre 2"){

            CodSemestre="SEM007";
   
           }
           


PeriodoSeleccionado= CodSemestre;
anoSeleccionado= ano;
MesSeleccionado="";
FechaInicialSel ="";
FechaFinalalSel ="";



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
       LabelSemestre.textContent= Semestres[index];
       // itemSemTitle.textContent = e.nombreDiaSemana;
   
       containerSemestre.appendChild(ItemSemestre);
       ItemSemestre.appendChild(LabelSemestre);
      
     
         
     }
           
   
   
   
   }




   
const CreateTrimestre = (ano,valor) =>{

    var ano1= ano.textContent;
          
        
    PanelGeneral.innerHTML='';

    const containerTrimestre = document.createElement('div')
    containerTrimestre.className="container-trimestres";
    containerTrimestre.id="body-trimestre";

    PanelGeneral.appendChild(containerTrimestre);

 


     for (let index = 0; index <Trimestres.length; index++) {
         
      
       const ItemTrimestre = document.createElement('div')
       ItemTrimestre.className="item-trimestre";
       ItemTrimestre.onclick= function (){
   
         
        var g = this.getElementsByClassName('label-trimestre');
            
        var trimestre= g[0].innerText;
        var Codtrimestre;
        var periodo = valor;


        if( trimestre=="Trimestre 1"){

            Codtrimestre="TRI002";

        }

        
        if( trimestre=="Trimestre 2"){

            Codtrimestre="TRI003";
   
           }

           if( trimestre=="Trimestre 3"){

            Codtrimestre="TRI004";
   
           }

           if( trimestre=="Trimestre 4"){

            Codtrimestre="TRI005";
   
           }

PeriodoSeleccionado= Codtrimestre;
anoSeleccionado= ano;
MesSeleccionado="";
FechaInicialSel ="";
FechaFinalalSel ="";



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
       LabelTrimestre.textContent= Trimestres[index];
       // itemSemTitle.textContent = e.nombreDiaSemana;
   
       containerTrimestre.appendChild(ItemTrimestre);
       ItemTrimestre.appendChild(LabelTrimestre);
      
     
         
     }
           
   
   
   
   }
   
function fnbuscarOpcion(evt,ano1){


//     alert(valor);
//    alert(ano1);
    

    var valor= evt.textContent;
    

    if(valor=="Anual"){

        createAno(ano1,valor);
    }

    



if(valor=="Mensual"){

    createMesesSinSemanas(ano1,valor);
}

if(valor=="Semestral"){

    CreateSemestre(ano1,valor);

    
}


if(valor=="Trimestral"){

    
  CreateTrimestre(ano1,valor);

    
}

if(valor=="Semanal"){

    createMeses(ano1,valor);

}




   
    
    }


function fnbuscarmes(evt){

var ano= evt.textContent;

createMeses(ano);


}


function fnbuscarmesporano(ano1){


    
    createMeses(ano1);
    
    
    }





function Mensua(){


}




/***********************************************************************meses */


function diasEnUnMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}


function diasEnUnaño(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}



function createAno (ano1,valor){


    
    var valor="ANU008";




     PeriodoSeleccionado= valor;
     anoSeleccionado= ano1;
     MesSeleccionado="";
     FechaInicialSel ="";
     FechaFinalalSel ="";
    
    

console.log(PeriodoSeleccionado)

console.log(anoSeleccionado);
    
}










// const conSem = document.getElementById("body-calendar");


const createMeses = (año,valor) =>{



    var PanelGeneral = document.getElementById("body-calendar-csj-all");

    PanelGeneral.innerHTML='';

    const containerMensual = document.createElement('div')
    containerMensual.className="container-meses";
    containerMensual.id="body-meses";
    
    PanelGeneral.appendChild(containerMensual);

    for (let index = 0; index < mes_text.length; index++) {
       
        
        const ItemMes = document.createElement('div')
        ItemMes.className="item-mes";
        ItemMes.onclick=function(){

         fnbuscarsemanas(año,index,valor);

        }
    
        const itemSemTitle = document.createElement('div')
        itemSemTitle.className = "item-semana-title";
        // itemSemTitle.textContent = e.nombreDiaSemana;
    
        const ItemNombreMes = document.createElement('div')
        ItemNombreMes.className = "item-nombre-mes";
        ItemNombreMes.textContent=mes_text[index];
    
        const itemNumbermes = document.createElement('div')
        itemNumbermes.className="item-number-mes";
        itemNumbermes.textContent= diasEnUnMes(index +1,año) +" días";
      
        containerMensual.appendChild(ItemMes);
        ItemMes.appendChild(ItemNombreMes);
    
    
        ItemMes.appendChild(itemNumbermes);


    }
    



}



/* Llegada a la busqueda solo por mes */



const createMesesSinSemanas = (año,periodo) =>{



    var PanelGeneral = document.getElementById("body-calendar-csj-all");

    PanelGeneral.innerHTML='';

    const containerMensual = document.createElement('div')
    containerMensual.className="container-meses";
    containerMensual.id="body-meses";
    
    PanelGeneral.appendChild(containerMensual);

    for (let index = 0; index < mes_text.length; index++) {
       
        
        const ItemMes = document.createElement('div')
        ItemMes.className="item-mes";
        ItemMes.onclick=function(){

            var g = this.getElementsByClassName('item-nombre-mes');
            
            var mes= g[0].innerText;
            var parametromes;


            

        
      for (let index = 0; index < mes_text.length; index++) {
         
        if(mes==mes_text[index]){

            parametromes=index;
       

        }
          
      }


if(periodo=="Mensual"){


periodo="MEN001"

}


PeriodoSeleccionado= periodo;
anoSeleccionado= año;
MesSeleccionado=parametromes+1;
FechaInicialSel ="";
FechaFinalalSel ="";

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
        ItemNombreMes.textContent=mes_text[index];
    
        const itemNumbermes = document.createElement('div')
        itemNumbermes.className="item-number-mes";
        itemNumbermes.textContent= diasEnUnMes(index +1,año) +" días";
      
        containerMensual.appendChild(ItemMes);
        ItemMes.appendChild(ItemNombreMes);
    
    
        ItemMes.appendChild(itemNumbermes);


    }
    



}



function fnbuscarsemanas(año,mes,valor){


 
    let Codsemana="SMN001"

    numerar(año,mes,valor);
    crearSemanas(año,mes,valor,Codsemana);
    
   





}






/*******************************************Buscar Semanas******************************** */






var mes_text = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var dia_text = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"];

var Semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5","Semana 6"];

var contadorsemanas=0;



var listadosemanal = [];



function numerar(año,mes,valor) {
    

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

 let cantidaddias=diasEnUnMes(mes+1,año);



let sumadia=0; 
let suma;





for (let index = 0; index < mes; index++) {
   
 
suma = diasEnUnMes(index+1,año);

sumadia=sumadia+suma;
}

let diassinsuma=0;

diassinsuma=sumadia;

let maxrango= diassinsuma+cantidaddias;
if(sumadia==0){

    sumadia=1;
    maxrango=cantidaddias;
}




if(mes==0){

    

}else{

    sumadia= sumadia+1;

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
           
            if(semanas.length==0){
                ListaSemanas.push(ObjetoSemana);
                
            }else{
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

            if(semanas.length==0){
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

     console.log(sem1[0])
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







function crearSemanas(año,mes,valor,Codsemana){   


    PanelGeneral.innerHTML='';
    const containerSemanal = document.createElement('div')
    containerSemanal.className="container-semanas";
    containerSemanal.id="body-calendar";
    
    PanelGeneral.appendChild(containerSemanal);
    
    const conSem = document.getElementById("body-calendar");
 
    
    const createSem = (e) =>{
    
    const Mitemcalendar = document.createElement('div')
    Mitemcalendar.className="marco-item-calendar-semanas";
    
    const itemSemTitle = document.createElement('div')
    itemSemTitle.className = "item-semana-title";
    itemSemTitle.onclick=function(){


        

        var g = this.getElementsByClassName('label-semana');
          
          var labelsemana= g[0].innerText;
  
          console.log(labelsemana);

          var fechaInicia="";
          var fechafinal="";
          var totaldias=0;


if(labelsemana=="Semana 1"){

   
    totaldias= sem1.length -1;

    fechaInicia=sem1[0].NumeroDia;
    fechafinal=sem1[totaldias].NumeroDia;
    
    // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
    // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);
    
    // let dia = fecha.getDate();
    // console.log(dia);
    // console.log(fecha2.toDateString());
  

    var primerdia = new Date(año, mes, fechaInicia);
    var UltimoDia = new Date(año, mes, fechafinal);

    var MesInicial = primerdia.getMonth() + 1;
    var MesFinal = UltimoDia.getMonth() + 1;

 var fechaInicial= primerdia.getDate() + "/"+ MesInicial+ "/" +primerdia.getFullYear();
 var fechaFinal= UltimoDia.getDate() + "/"+ MesFinal+ "/" +primerdia.getFullYear();




    console.log(fechaInicial.toString());
    console.log(fechaFinal.toString());
   




}



if(labelsemana=="Semana 2"){

   
    totaldias= sem2.length -1;

    fechaInicia=sem2[0].NumeroDia;
    fechafinal=sem2[totaldias].NumeroDia;
    
    // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
    // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);
    
    // let dia = fecha.getDate();
    // console.log(dia);
    // console.log(fecha2.toDateString());
  

    var primerdia = new Date(año, mes, fechaInicia);
    var UltimoDia = new Date(año, mes, fechafinal);

    var MesInicial = primerdia.getMonth() + 1;
    var MesFinal = UltimoDia.getMonth() + 1;

 var fechaInicial= primerdia.getDate() + "/"+ MesInicial+ "/" +primerdia.getFullYear();
 var fechaFinal= UltimoDia.getDate() + "/"+ MesFinal+ "/" +primerdia.getFullYear();




    console.log(fechaInicial.toString());
    console.log(fechaFinal.toString());
   




}

if(labelsemana=="Semana 3"){

   
    totaldias= sem3.length -1;

    fechaInicia=sem3[0].NumeroDia;
    fechafinal=sem3[totaldias].NumeroDia;
    
    // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
    // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);
    
    // let dia = fecha.getDate();
    // console.log(dia);
    // console.log(fecha2.toDateString());
  

    var primerdia = new Date(año, mes, fechaInicia);
    var UltimoDia = new Date(año, mes, fechafinal);

    var MesInicial = primerdia.getMonth() + 1;
    var MesFinal = UltimoDia.getMonth() + 1;

 var fechaInicial= primerdia.getDate() + "/"+ MesInicial+ "/" +primerdia.getFullYear();
 var fechaFinal= UltimoDia.getDate() + "/"+ MesFinal+ "/" +primerdia.getFullYear();




    console.log(fechaInicial.toString());
    console.log(fechaFinal.toString());
   




}


if(labelsemana=="Semana 4"){

   
    totaldias= sem4.length -1;

    fechaInicia=sem4[0].NumeroDia;
    fechafinal=sem4[totaldias].NumeroDia;
    
    // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
    // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);
    
    // let dia = fecha.getDate();
    // console.log(dia);
    // console.log(fecha2.toDateString());
  

    var primerdia = new Date(año, mes, fechaInicia);
    var UltimoDia = new Date(año, mes, fechafinal);

    var MesInicial = primerdia.getMonth() + 1;
    var MesFinal = UltimoDia.getMonth() + 1;

 var fechaInicial= primerdia.getDate() + "/"+ MesInicial+ "/" +primerdia.getFullYear();
 var fechaFinal= UltimoDia.getDate() + "/"+ MesFinal+ "/" +primerdia.getFullYear();




    console.log(fechaInicial.toString());
    console.log(fechaFinal.toString());
   




}


if(labelsemana=="Semana 5"){

   
    totaldias= sem5.length -1;

    fechaInicia=sem5[0].NumeroDia;
    fechafinal=sem5[totaldias].NumeroDia;
    
    // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
    // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);
    
    // let dia = fecha.getDate();
    // console.log(dia);
    // console.log(fecha2.toDateString());
  

    var primerdia = new Date(año, mes, fechaInicia);
    var UltimoDia = new Date(año, mes, fechafinal);

    var MesInicial = primerdia.getMonth() + 1;
    var MesFinal = UltimoDia.getMonth() + 1;

 var fechaInicial= primerdia.getDate() + "/"+ MesInicial+ "/" +primerdia.getFullYear();
 var fechaFinal= UltimoDia.getDate() + "/"+ MesFinal+ "/" +primerdia.getFullYear();




    console.log(fechaInicial.toString());
    console.log(fechaFinal.toString());
   




}


if(labelsemana=="Semana 6"){

   
    totaldias= sem6.length -1;

    fechaInicia=sem6[0].NumeroDia;
    fechafinal=sem6[totaldias].NumeroDia;
    
    // let fecha = fechaPorDia(año, fechafinal.NumeroDia);
    // let fecha2 = fechaPorDia(año, fechaInicia.NumeroDia);
    
    // let dia = fecha.getDate();
    // console.log(dia);
    // console.log(fecha2.toDateString());
  

    var primerdia = new Date(año, mes, fechaInicia);
    var UltimoDia = new Date(año, mes, fechafinal);

    var MesInicial = primerdia.getMonth() + 1;
    var MesFinal = UltimoDia.getMonth() + 1;

 var fechaInicial= primerdia.getDate() + "/"+ MesInicial+ "/" +primerdia.getFullYear();
 var fechaFinal= UltimoDia.getDate() + "/"+ MesFinal+ "/" +primerdia.getFullYear();




    console.log(fechaInicial.toString());
    console.log(fechaFinal.toString());
   




}



PeriodoSeleccionado= "SMN001";
anoSeleccionado= año;
MesSeleccionado=mes+1;
FechaInicialSel =fechaInicial;
FechaFinalalSel =fechaFinal;



console.log("***********************");
console.log(PeriodoSeleccionado);
console.log(anoSeleccionado);
console.log(MesSeleccionado);
console.log(FechaInicialSel);
console.log(FechaFinalalSel);
console.log("***********************");

           
   
    

  
      }
    // itemSemTitle.textContent = e.nombreDiaSemana;
    
    const itemSemBody = document.createElement('div')
    itemSemBody.className = "item-semana-body";
    
    
    const itemcontainerdia = document.createElement('div')
    itemcontainerdia.className="container-dias";
    itemcontainerdia.id="container-semana1";
    
    const labelSemTitle = document.createElement('label')
    labelSemTitle.className = "container-check label-semana";
    labelSemTitle.textContent=e.NombreSemana;
    
    
    
    const newCheckBox = document.createElement('input')
    newCheckBox.type = 'radio';
    newCheckBox.name='radio';
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

    
const week11=[];




const insertSem = ()=>{




ListaSemanas.forEach(x => {
    createSem(x)

    
});



}



insertSem();







const conWeek1 = document.getElementsByClassName("container-dias");




var num = 0;







const createDay = (e) =>{

var as = 0;
 
if(e.nombreSemana=="Semana 1"){

as=0;


}

if(e.nombreSemana=="Semana 2"){

as=1;


}

if(e.nombreSemana=="Semana 3"){

    as=2;
    
    
    }
    if(e.nombreSemana=="Semana 4"){

        as=3;
        
        
        }
        if(e.nombreSemana=="Semana 5"){

            as=4;
            
            
            }
            if(e.nombreSemana=="Semana 6"){

                as=5;
                
                
                }


// for (var i = 0; i < conWeek1.length; i++) {

const itemD = document.createElement('div')
itemD.className="item-dia";

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



const week1=[];



const insertDItem = ()=>{




sem1.forEach(x => {
    createDay(x)
});



}


const insertDItem2 = ()=>{




sem2.forEach(x => {
    createDay(x)
});



}


const insertDItem3 = ()=>{




sem3.forEach(x => {
    createDay(x)
});

}



const insertDItem4 = ()=>{




sem4.forEach(x => {
    createDay(x)
});



}



const insertDItem5 = ()=>{



sem5.forEach(x => {
    createDay(x)
});



}



const insertDItem6 = ()=>{




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

