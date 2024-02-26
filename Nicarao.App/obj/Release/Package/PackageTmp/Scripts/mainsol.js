function isValidDate(dateString) {

    // convertir los numeros a enteros
    var parts = dateString.split("/");
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var strYear = String(parts[2]);

    var ArrayYear = strYear.split(" ");
    var year = parseInt(ArrayYear[0]);
    // Revisar los rangos de año y mes
    if ((year < 1000) || (year > 3000) || (month === 0) || (month > 12))
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Ajustar para los años bisiestos
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    // Revisar el rango del dia
    return day > 0 && day <= monthLength[month - 1];
}


function ValidarRangoFecha(fecha1, fecha2) {

    var arrayFechaI = fecha1.split('/');
    var arrayFechaF = fecha2.split('/');

    var FechaInicial = new Date(arrayFechaI[1] + "/" + arrayFechaI[0] + "/" + arrayFechaI[2]);
    var FechaFinal = new Date(arrayFechaF[1] + "/" + arrayFechaF[0] + "/" + arrayFechaF[2]);

    //if (parseInt(arrayFechaI[2]) !== parseInt(arrayFechaF[2])) {
    //    alertify.alert().destroy();
    //    alertify.alert("Advertencia", "Solo se permiten fecha que esten en el mismo año.");
    //    return false;
    //}

    if (FechaInicial.getTime() > FechaFinal.getTime()) {
        alertify.alert().destroy();
        alertify.alert("Advertencia", "La fecha inicial no puede ser mayor a la fecha final.");
        return false;
    }
    //else if (FechaInicial.getTime() === FechaFinal.getTime()) {
    //    alertify.alert().destroy();
    //    alertify.alert("Advertencia", "La fecha inicial y fecha final no pueden ser iguales.");
    //    return false;
    //}
    return true;
}


function ShowMessageValidacion(obj, contenido) {
    var content = "Campo Requerido";
    if (contenido !== undefined) {
        content = contenido;
    }

    $(obj).addClass("alertaInputVacio");
    $("#lbl" + $(obj).attr("name")).text(content);
    $("#lbl" + $(obj).attr("name")).attr("style", "color:red; display:block;");
    return false;
}

function fnNoExisteObjeto(array, Name) {
    var NoExiste = true;
    $.each(array, function (index, value) {
        if (value === Name) {
            NoExiste = false;
            return false;
        }
    });
    return NoExiste;
}

function fnValidarControlerPublic(objs) {

    var strValidacion = "CampoRequerido";
    var json = "{";
    var isValido = true;
    var arrayObj = [];

    var input = $(objs).find("input");
    var select = $(objs).find("select");
    var textarea = $(objs).find("textarea");

    $.each(input.add(select.add(textarea)), function (index, value) {

        if ($(value).attr("required")) {

            if ($.trim($(value).val()) === "") {
                isValido = ShowMessageValidacion(value);
            }
            else {
                $("#lbl" + $(value).attr("name")).css("color", "transparent");
                $(value).removeClass("alertaInputVacio");
            }
            isValido = fnInputmask(value, isValido);

        }
        else if ($(value).attr("data-RequiredIfFull") && $.trim($(value).val()) !== "") {
            isValido = fnInputmask(value, isValido);
        }

        if ($(value).prop("tagName") === "TEXTAREA") {

            if (typeof CKEDITOR !== "undefined") {
                var ckEditor = CKEDITOR.instances[$(value).attr("id")];

                if (ckEditor !== undefined) {
                    if ($.trim(ckEditor.getData()) === "") {

                        isValido = ShowMessageValidacion(value);
                        alertify.alert().destroy();
                        alertify.defaults.theme.ok = "btn btn-danger";
                        alertify.alert("Advertencia", "Es obligatorio ingresar una descripción de la solicitud.");
                        $("body").removeAttr("tabindex");

                    }
                }
            }
        }

        if (!$(value).attr("data-ignore")) {
            if ($(value).attr("type") === "radio") {
                if (fnNoExisteObjeto(arrayObj, $(value).attr("name"))) {
                    json = json + "\"" + $(value).attr("name") + "\":\"" + $("input[name=" + $(value).attr("name") + "]:checked").val() + "\",";
                    arrayObj.push($(value).attr("name"));
                }
            }
            else if ($(value).attr("type") === "checkbox") {
                json = json + "\"" + $(value).attr("name") + "\":\"" + $("input[name=" + $(value).attr("name") + "]").is(":checked") + "\",";
            }
            else if ($(value).prop("tagName") === "TEXTAREA") {

                var isCkEditor = false;
                if (typeof CKEDITOR !== "undefined") {
                    var cheditor = CKEDITOR.instances[$(value).attr("id")];
                    if (cheditor !== undefined) {
                        json += "\"" + $(value).attr("name") + "\":\"" + Base64.encode(cheditor.getData().replace(/"/g, "\\\"")) + "\",";
                        isCkEditor = true;
                    }

                }

                if (!isCkEditor) {
                    console.log("Llegue aqui con el textarea de direccion.");
                    json = json + "\"" + $(value).attr("name") + "\":\"" + ($.trim($(value).val()) !== "" ? $(value).val() : "NULL") + "\",";
                }

            }
            else {
                json = json + "\"" + $(value).attr("name") + "\":\"" + ($.trim($(value).val()) !== "" ? $(value).val() : "NULL") + "\",";
            }
        }
    });

    json = json.substr(0, json.length - 1);
    json = json + "}";

    return {
        "isValido": isValido,
        "json": json
    };
}

function fnInputmask(value, isValido, message) {
    var valido = isValido;
    if ($(value).inputmask("hasMaskedValue")) {

        if ($(value).inputmask("isComplete")) {
            var initialValue = $(value).inputmask("getemptymask");

            console.log(initialValue);
            switch (initialValue) {
                case "__/__/____": {
                    if (!isValidDate($(value).val())) {
                        valido = ShowMessageValidacion(value, "Fecha Invalida");
                    }
                    else {
                        $("#lbl" + $(value).attr("name")).hide();
                    }
                    break;
                }
                default: {
                    $("#lbl" + $(value).attr("name")).hide();
                }
            }
        }
        else {
            valido = ShowMessageValidacion(value, message);
        }
    }
    return valido;
}

function AlertReponse_Public(TipoAlert, Mensaje, func) {

    var Titulo = "";
    if (TipoAlert === 0 || TipoAlert === "0") {

        Titulo = "Correcto";
        alertify.alert().destroy();
        alertify.defaults.theme.ok = "btn btn-success";
        var modelSuccess = alertify.alert(Titulo, Mensaje, function () {
            if (func !== null && func !== undefined) {
                func();
            }
        });
    }
    else {
        Titulo = "Advertencia";
        alertify.alert().destroy();
        alertify.defaults.theme.ok = "btn btn-danger";
        alertify.alert(Titulo, Mensaje).set({
            "resizable": false,
            "closable": false,
        }).show();
    }
    $("body").removeAttr("tabindex");
}

function fnSolicitudHTML(Obj) {

    if ($(Obj).val() !== undefined) {
        var input = $(Obj).find("input").not(':file, :hidden, span');
        var select = $(Obj).find("select").not($(".ignore"));

        var observacion = $("#txtsolecDescripcion").val();


        var ContenidoHTML = '<h4 style="text-align:left; color:black;">Datos de la solicitud</h4>';
        //ContenidoHTML += '<p style="color:black;"><strong style="font-weight:bold;">' + $("#span_SolicitudTipo").text() + '</strong> ' + $("#ddlsolecSolicitudTipoId option:selected").text() + '</p>';

        ContenidoHTML += '<table style="width:100%;">';
        ContenidoHTML += '<tbody>';

        var obj = input.add(select);
        const col = 2;
        var row = Math.ceil(obj.length / col, 1);
        var skip = 0;

        for (var i = 0; i < row; i++) {

            ContenidoHTML += '<tr>';

            for (var j = skip; j < (skip + 2 > obj.length ? obj.length : skip + 2); j++) {

                ContenidoHTML += '<td style="width:50%">';
                ContenidoHTML += '<label>';

                if ($(obj[j]).prop("tagName") === "SELECT") {
                    var Id = $(obj[j]).attr("id");

                    ContenidoHTML += '<strong>';
                    ContenidoHTML += $($(obj[j]).parent()).children("span.has_float").text() + " ";
                    ContenidoHTML += '</strong>';
                    ContenidoHTML += $("#" + Id + " option:selected").text();
                }
                else {
                    ContenidoHTML += '<strong>';
                    ContenidoHTML += $(obj[j]).parent().children("span").text() + " ";
                    ContenidoHTML += '</strong>';
                    ContenidoHTML += $(obj[j]).val();
                }

            }

            skip += col;

            ContenidoHTML += '</tr>';
        }

        ContenidoHTML += '</tbody>';
        ContenidoHTML += '</table>';

        ContenidoHTML += '<br/>';
        ContenidoHTML += '<br/>';


        ContenidoHTML += '<div>';
        ContenidoHTML += '<h4 style="text-align:center; color:black;">Observaciones:</h4>';
        ContenidoHTML += '<p>' + observacion + '<p>';
        ContenidoHTML += '</div>';

        return ContenidoHTML;
    }
    return "";
}

async function  fnDocumentoPDF() {
    //var obj = $("#Doc_HTML");

    //if (obj !== undefined) { return Base64.encode(obj.html()); }




    var codigosol = localStorage.getItem('SolicitudCodigo');
    var Identificacion = localStorage.getItem('Identificación');
    var Celular = localStorage.getItem('Celular');
    var NTiposolicitud = localStorage.getItem('NTiposolicitud');
    var Correo = localStorage.getItem('Correo');
    var Observacion = localStorage.getItem('Observacion');
    var SolicitanteNombre = localStorage.getItem('SolicitanteNombre');

    var base64data;

    

    var imgData = 'data:image/png;base64,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';
    var doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(70, 30, 'Corte Suprema de Justicia');
    doc.addImage(imgData, 'png', 18, 20, 30, 30);

    doc.setFontSize(15);
    doc.text(95, 45, 'Secretaria CSJ');

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(145, 65, 'Codigo:');

    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(162, 65, codigosol);


    doc.setFontSize(14);
    doc.setFontType('bold');
    doc.text(15, 85, 'Datos Personales');

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(15, 100, 'Identificación:');

    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(44, 100, Identificacion);



    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(15, 110, 'Celular:');


    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(31, 110, Celular);


    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(75, 100, 'Solicitante:');

    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(100, 100, SolicitanteNombre);


    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(75, 110, 'Correo:');

    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(91, 110, Correo);


    doc.setFontSize(14);
    doc.setFontType('bold');
    doc.text(15, 130, 'Datos de la solicitud');

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(15, 145, 'Solicitud:');

    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(35, 145, NTiposolicitud);


    doc.setFontSize(14);
    doc.setFontType('bold');
    doc.text(90, 160, 'Observaciones:');


    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(15, 180, Observacion);


    doc.save(codigosol + '.pdf');

    var blob = doc.output('blob');

 


    var blobToBase64 = function (blob, callback) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    };


    return blobToBase64;
}

//function BlobtoString(blob, callback) {
//    var reader = new FileReader();
//    reader.onload = function () {
//        var dataUrl = reader.result;
//        var base64 = dataUrl.split(',')[1];
//        callback(base64);
//    }
//};

function fnSoloNumero(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla === 8) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function convertString64ToBlob(string64) {

    const byteCharacters = atob(string64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return new Uint8Array(byteNumbers);
}

function ShowAlertWaiting() {
    var oaw = new AlertWaiting();
    oaw.show();
}

function CloseAlertWaiting() {
    var oaw = new AlertWaiting();
    oaw.close();
}

function fnloadsolectipo(solectipoid) {
    $.get(obtenerURL("PresentacionEscrito/SolecTipoObtener"), { "solectipoid": solectipoid }, function (_rejs) {
        $("#ddldgIdentificativoTipo").empty();
        $("#ddldgIdentificativoTipo").select2({ data: _rejs });

        if ($("#ddldgIdentificativoTipo").val() !== "") { _maskload($("#ddldgIdentificativoTipo").val()); }
    });
}

function _maskload(_id) {
    $.ajax({
        url: obtenerURL("PresentacionEscrito/MaskIdentTipoObtener"),
        type: "GET",
        data: { "identipoid": _id },
        //beforeSend: function () { ShowAlertWaiting(); $("body").removeAttr("tabindex"); },
        //error: function () { CloseAlertWaiting(); $("body").removeAttr("tabindex"); },
        success: function (jsonresult) {

            //CloseAlertWaiting();
            $("body").removeAttr("tabindex");

            $("#txtdgIdentificacion").inputmask(jsonresult.Marcara);
        }
    });
}


function fntcsuccess(result) {
    alertify.alert().destroy();
    if (result.Retorno === 0) {
       
        alertify.alert("Advertencia", result.Mensaje, function () {
            alertify.confirm().close();

            if ($("#contentexped").html() !== undefined) { $("#contentexped").empty().load(obtenerURL(result.objeto)); }
            else { $("#contentexpedbo").empty().load(obtenerURL(result.objeto)); }

            if ($("#cell-content22").html() !== undefined) { $("#cell-content22").empty().load(obtenerURL(result.objeto)); }
            else { $("#cell-content22").empty().load(obtenerURL(result.objeto)); }

        });
    } else {
        alertify.alert("Advertencia", result.Mensaje);
    }
}


function fnBuscarTable(_dtname)
{
    var value = $(".dataTables_filter input").val();

    $("#" + _dtname).DataTable().search(value).draw();
}

function fnloadfile() {
    var inputfile = document.querySelector('input[type="file"]');
    FilePond.registerPlugin(FilePondPluginFileValidateType);
    
    var pond = FilePond.create(inputfile, {
        acceptedFileTypes: ['application/pdf'],
        labelFileTypeNotAllowed: 'Tipo de archivo no permitido',
        labelTapToUndo: ' ',
        labelFileProcessing: 'Subiendo documento',
        labelFileProcessingComplete: 'Subida completa',
        labelFileLoading: 'Cargado...',
        labelFileSizeNotAvailable: 'Tamaño maximo exedido',
        labelIdle: '<span class="filepond--label-action">Subir archivo desde el ordenador</span>',
        fileValidateTypeLabelExpectedTypes: 'Se espera un documento PDF',
        fileValidateTypeDetectType: (source, type) => new Promise((resolve, reject) => {

            resolve(type);
        })
    });

    FilePond.setOptions({
        server: {
            process: (fieldName, file, metadata, load, error, progress, abort) => {

                // We ignore the metadata property and only send the file
                const formData = new FormData();
                formData.append(fieldName, file, file.name);
                var _acc = $("#txtaccdocfilepond").val();
                var _url = obtenerURL('/GestionSolec/SolecSubirArchivo?sid=' + $("#txtsolecid").val());

                if (_acc === "1")
                { _url = obtenerURL('/GestionSolec/SolicitudLibroDocumentoIngreso?sid=' + $("#txtsolecid").val()); }

                const request = new XMLHttpRequest();
                request.open('POST', _url);

                request.upload.onprogress = (e) => {
                    progress(e.lengthComputable, e.loaded, e.total);
                };

                request.onload = function (response) {
                    var _json = JSON.parse(request.response);

                    if (_json.Retorno === 0) {
                        //load(_json.Objeto);
                        
                        //myFiles.push(_json.Objeto);
                        if (_acc === "1") {
                            $("#cell-content").empty().load(obtenerURL(_json.Objeto));
                        }
                        else {
                            $("#cntsolecDocAnexo").empty().append(_json.Objeto);
                            $("#txtaccdocfilepond").val("0");
                            fnloadfile();
                        }
                    }
                    else {
                        error('');
                        alertify.alert().destroy();
                        alertify.alert("Advertencia", _json.Mensaje);
                    }
                };

                request.send(formData);
            }
        }
    });
}

//function fnjsonpago(ArrayDatos) {
//    var jsonData = [];

//    if (jQuery.isEmptyObject(ArrayDatos) === false) {
//        $.each(ArrayDatos, function (i, item) {
//            var _json = '';

//            $.each(item.children, function (ii, iitem) {
//                var _name = $($(iitem.children).children()).children().attr("name");
//                var _value = $($(iitem.children).children()).children().val();

//                if ($(iitem).attr("class") === "col-md-3") {
//                    _json = (_json === "" ? "" : _json + ",") + "\"" + _name + "\"" + ": " + "\"" + _value + "\"";
//                }
//            });

//            jsonData.push(JSON.parse("{" + _json + "}"));
//        });

//        return JSON.stringify(jsonData);
//    }
//}

function fnjsonpago(ArrayDatos) {
    var jsonData = [];
    
    if (jQuery.isEmptyObject(ArrayDatos) === false) {
        $.each(ArrayDatos, function (i, item) {
            var _json = '';

            $.each(item.children, function (ii, iitem) {
                
                var _name = $($(iitem.children).children()).children().attr("name");
                var _value = $($(iitem.children).children()).children().val();
                if (_name != undefined) {
                    if ($(iitem).attr("class") === "col-md-3") {
                        _json = (_json === "" ? "" : _json + ",") + "\"" + _name + "\"" + ": " + "\"" + _value + "\"";
                    }
                }

            });

            jsonData.push(JSON.parse("{" + _json + "}"));
        });

        return JSON.stringify(jsonData);
    }
}











function fnaddpago(_id) {
    var _input = $("#cntsolecPago div.row");

    if (fninvalidform($("#cntsolecPago")) === true) {
        var _json = fnjsonpago(_input);

        $.ajax({
            url: obtenerURL("Solicitud/_ModalPago"),
            data: { id: _id, sarray: _json },
            dataType: "html",
            type: "post",
            success: function (_reslt) {
                $("#cntPago").empty().append(_reslt);
            }
        });
    }
}

function fndeletepago(_id) {
    if (_id === "0" && $('input[name="NoVoucher"]').length > 1) { $("#cntsolecPagoNuevo").remove(); }
    else if (_id !== "0") {
        fnaddpago(_id);
    }
}