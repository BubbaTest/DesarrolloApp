var isPressEnter = false;
$(document).ready(main);

function main() {
    $.fn.select2.defaults.set('language', 'es');

    if ($('#dgRolPorUsuario').length > 0) {
        $('#dgRolPorUsuario').data('dialog').open();
    }

    /*
     * Función para mostrar mensaje de espera propio 
     */
    if (!alertify.alertwaiting) {
        //define a new dialog
        alertify.dialog('alertwaiting', function () {
            return {
                main: function (message) {
                    this.message = message;
                },
                setup: function () {
                    return {
                        options: { closable: 'false' }
                    };
                },
                prepare: function () {
                    this.setContent(this.message);
                }
            };
        });
    }
};

if (!alertify.AutorizacionAntecedente) {

    alertify.dialog('AutorizacionAntecedente', function factory() {

    }, false, 'confirm');
}

function fnValidarCaracter(tecla) {
    if (tecla.charCode === 37) { return false; }
}


function fnvalidarrayform(elmarr, form) {
    var value = true;
    var invmsg = "* Campo Requerido *";


    if (jQuery.isEmptyObject(elmarr) === false) {
        $.each(elmarr, function (i, item) {
            if ($(item).inputmask("hasMaskedValue")) {
                if (!$(item).inputmask("isComplete")) {
                    value = false;
                    $(item).addClass("is-invalid");
                    $(item).css('border-color', '#dc3545');
                    $($(item).parent()).children().remove("div.valid-feedback");
                    $($(item).parent()).children().remove("div.invalid-feedback");
                    $(item).parent().append('<div class="invalid-feedback">* Campo incompleto *</div>');
                } else {
                    $(item).removeClass("is-invalid");
                    $(item).css('border-color', '#28a745');
                    $($(item).parent()).children().remove("div.valid-feedback");
                    $($(item).parent()).children().remove("div.invalid-feedback");
                }
            } else {
                if (item.value.trim() === "" || item.value === null) {
                    value = false;
                    $(item).addClass("is-invalid");
                    $(item).css('border-color', '#dc3545');
                    $($(item).parent()).children().remove("div.valid-feedback");
                    $($(item).parent()).children().remove("div.invalid-feedback");
                    $(item).parent().append('<div class="invalid-feedback">' + invmsg + '</div>');
                } else {
                    $(item).removeClass("is-invalid");
                    $(item).css('border-color', '#28a745');
                    $($(item).parent()).children().remove("div.valid-feedback");
                    $($(item).parent()).children().remove("div.invalid-feedback");
                }
            }
        });
    } else {



        value = true;
    }

    $(form).addClass('was-validated');

    return value;
}

function matchCustom(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') { return data; }

    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined') { return null; }

    // `params.term` is the user's search term
    // `data.id` should be checked against
    // `data.text` should be checked against
    var q = params.term.toLowerCase();
    var cdn = new Array();
    var valor = true;

    cdn = q.split(" ");
    $.each(cdn, function (i, item) {
        if (valor !== false) {
            if ($.trim(item) !== '') {
                if (data.text.toLowerCase().indexOf(item) > -1 || data.id.toLowerCase().indexOf(item) > -1) {
                    valor = true;
                } else {
                    valor = false;
                }
            }
        }
    });

    if (valor === true) {
        return $.extend({}, data, true);
    }

    // Return `null` if the term should not be displayed
    return null;
}


function armarJson2(ArrayDatos) {    
    var jsonData = "";
    if (jQuery.isEmptyObject(ArrayDatos) === false) {
        var Max = ArrayDatos.length;

        $.each(ArrayDatos, function (i, item) {
            if ((i + 1) < Max) {
                jsonData = jsonData + "\"" + item.name + "\"" + ": " + "\"" + item.value + "\"" + ", ";
            } else if ((i + 1) === Max) {
                jsonData = jsonData + "\"" + item.name + "\"" + ": " + "\"" + item.value + "\"";
            }
        });

        jsonData = "{ " + jsonData + " }";

        return jsonData;
    }
}

function setExpediente(expediente) {
    localStorage.setItem("Expediente", expediente);
}

function formatFechaHoras(dates) { //dia, mes, año, tiempo
    var date = new Date(dates);
    var day = date.getDate();
    var twoDigitDay = day < 10 ? '0' + day : '' + day;
    var twoDigitMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return twoDigitDay + "/" + twoDigitMonth + "/" + date.getFullYear() + "  " + strTime;
}

function PreventKeyEnterOnAlertify() {
    $(document).on('keyup keydown', 'input, textarea, .select2-search__field', function (ev) {
        isPressEnter = false;
        var me = $(this);
        if (ev.which === 13) { return (isPressEnter = true); }
        if (me.data('listening') !== 1) {
            me.data('listening', 1).keydown(function (ev) {
                if ((ev.keyCode ? ev.keyCode : ev.which) === 13) { return (isPressEnter = true); }
            });
        }
    });
}

function errorajax(xhr, status, error)
{console.log(xhr, status, error)
    closealertify();
}

function obtenerURL(sUrl) {
    var path_name = "";
    if (sUrl.length <= 0) {
        console.log("obtenerURL: la URL es un parametro requerido");
        return;
    } //Agregar slash en caso de que la url no lo contenga 
    if (sUrl.substr(0, 1) !== "/") {
        sUrl = "/" + sUrl;
    }
    // Cuando el sitio este alojado en una ruta distinta al nodo raiz 
    if (window.location.pathname !== "/") {
        path_name = window.location.pathname;
    }
    return (path_name + sUrl);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function showalertify() {
    //if (alertify.alert().isOpen())
    //{ alertify.alert().close(); }

    //var dialog = '<div id="dialogPreloader"><div data-role="preloader" data-type="square" data-style="color" class="preloader-square color-style"><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div></div>Por favor, espere un momento...</div>';
    //alertify.alert().destroy();
    //alertify.alert().set('basic', true).setting({ 'closable': false }).setContent(dialog).show();
    //var dialog = '<div id="dialogPreloader"><div data-role="preloader" data-type="square" data-style="color" class="preloader-square color-style"><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div></div>Por favor, espere un momento...</div>';
    //alertify.alert().destroy();
    //alertify.alert().set('basic', true).setting({ 'closable': false }).setContent(dialog).show();
}

function closealertify() {
    if (alertify.alert().isOpen())
    { alertify.alert().close(); }
}

function armarJsoninput(ArrayDatos) {    
    var jsonData = "";
    if (jQuery.isEmptyObject(ArrayDatos) === false) {
        var Max = ArrayDatos.length;

        $.each(ArrayDatos, function (i, item) {
            if ((i + 1) < Max) {
                jsonData = jsonData + "\"" + item.name + "\"" + ": " + "\"" + fnjsonCaracter(item.value) + "\"" + ", ";
            } else if ((i + 1) === Max) {
                jsonData = jsonData + "\"" + item.name + "\"" + ": " + "\"" + fnjsonCaracter(item.value) + "\"";
            }
        });

        jsonData = "[{ " + jsonData + " }]";

        return jsonData;
    }
}

function vControles(ArrayControles) {
    var valor = true;

    if (jQuery.isEmptyObject(ArrayControles) === false) {
        $.each(ArrayControles, function (i, item) {

            if (item.value.trim() === "" || item.value === null) {
                $("#lbl" + item.name).show();

                valor = false;
            } else {
                $("#lbl" + item.name).hide();
            }
        });

        return valor;
    } else {
        return true;
    }
}

function removerButtons(tableButtonsId) {
    var buttons = [];

    if ($("#" + tableButtonsId).DataTable().buttons()[0] !== undefined) {
        $.each($("#" + tableButtonsId).DataTable().buttons()[0].inst.s.buttons, function () {
            buttons.push(this);
        });

        $.each(buttons, function () {
            $("#" + tableButtonsId).DataTable().buttons()[0].inst.remove(this.node);
        });
    }
}

function cargarSelect2(url, Select2Id) {
    $.ajax({
        url: obtenerURL(url),
        type: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (jsonData) {
            $("#" + Select2Id + " option").each(function () { $(this).remove(); });
            $("#" + Select2Id).append($('<option/>', { value: "", text: "" }));

            $.each(JSON.parse(jsonData), function (key, value) {
                $("#" + Select2Id).append($('<option/>', {
                    value: value.CodigoId,
                    text: value.Descripcion
                }));
            });
        },
        error: function (result) { alertify.alert("Advertencia", "Error llenado: #" + Select2Id); }
    });
}

function fnjsonCaracter(valueString) {
    if (typeof valueString != 'string') throw new TypeError('parametro ‘value’ no es un string');

    if (valueString == null || valueString == "") { return valueString; }

    const unicodeString = valueString.replace(
        /[\u0008\u0009\u000A\u000B\u000C\u000D\u0022\u0027\u005C\u00A0\u2028\u2029\uFEFF]/g, ' ')

    return unicodeString;
}

function fnCaracterEspecial(str) {
    var array = ["\u0022", "\u0027"];
    var arrayhtml = ["&quot;", "&apos;"];
    var orgtext = str;

    if (typeof str != 'string') throw new TypeError('parametro ‘value’ no es un string');
    if (str === null || str === "") { return str; }

    $.each(array, function (i, item) {
        var rege = new RegExp(item, 'g');
        if (item != "") {
            orgtext = orgtext.replace(rege, function ($1) {
                return arrayhtml[i];
            });
        }

        return orgtext;
    });

    return orgtext;
}

function camelCaseToTitleCase(camelCase) {
    if (camelCase == null || camelCase == "") {
        return camelCase;
    }

    camelCase = camelCase.trim();
    var newText = "";
    for (var i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i])
            && i != 0
            && /[a-z]/.test(camelCase[i - 1])) {
            newText += " ";
        }
        if (i == 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toUpperCase();
        } else {
            newText += camelCase[i];
        }
    }

    return newText;
}

function utf8Decode(utf8String) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
        function (c) {  // (note parentheses for precedence)
            var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
            return String.fromCharCode(cc);
        }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
        function (c) {  // (note parentheses for precedence)
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
        }
    );
    return unicodeString;
}

function utf8Encode(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        }
    ).replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
        }
    );
    return utf8String;
}

function fn_formateaFecha(d)
{
    if (d === null) return "";

    var dt = new Date(d);
    var datestring = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear() + " " + ("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2);

    return datestring;
}

function addFechas(Fec, vDias, vMeses, vAnos) {
    Fec.setDate(Fec.getDate() + parseInt(vDias));
    Fec.setMonth(Fec.getMonth() + parseInt(vMeses));
    Fec.setFullYear(Fec.getFullYear() + parseInt(vAnos));
    return Fec.toLocaleDateString('en-GB');
}

function fn_renderSelect2Alert(root) {
    var select = $(root).find("select");

    select.select2().on("select2:open", function (e) {
        var id = e.target.id;
        var div_results = "#select2-" + id + "-results"; //obtener dinamicamente el id del select2
        $(div_results).parents(".select2-container").css({ 'z-index': '3000' }); //buscar el select2 y aplicar un index mayor a los demas controles
    });
}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}

function Select2LoadRemote(root, Select2Id, url, min, placeholder)
{
    var select = $(root).find(Select2Id);

    select.select2().on("select2:open", function (e) {
        var id = e.target.id;
        var div_results = "#select2-" + id + "-results"; //obtener dinamicamente el id del select2
        $(div_results).parents(".select2-container").css({ 'z-index': '3000' }); //buscar el select2 y aplicar un index mayor a los demas controles
    });

    $(Select2Id).select2({
        ajax: {
            url: obtenerURL(url),
            dataType: 'json',
            delay: 250,
            type: "GET",
            data: function (params) {
                console.log(params)
                return { Filtro: params.term }; //Definir el valor y parametro de busqueda (debe estar definido en el webapi)
            },
            processResults: function (data, params) {
                return {
                    results: $.map(data, function (obj) {
                        return { id: obj.CodigoId, text: obj.Descripcion }; //definir cual es el nombre de la propieda id y text que viene el json
                    })
                };
            }
        },
        minimumInputLength: min,
        placeholder: placeholder,
        language: "es",
        //templateResult: function (repo) {
        //    //if (repo.loading) {
        //    console.log(repo)
        //        return repo.text;
        //    //}
        //},
        //templateSelection: function (repo) {
        //    console.log(repo)
        //    //if (repo.loading) {
        //        return repo.text;
        //    //}
        //},
        //escapeMarkup: function (m) { console.log(m); return m; }
    });
}

function loadPdf(pdfbyte) {
    // atob() is used to convert base64 encoded PDF to binary-like data.
    // (See also https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/
    // Base64_encoding_and_decoding.)
    var pdfData = atob(pdfbyte);

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    //pdfjsLib.GlobalWorkerOptions.workerSrc = '~/Scripts/pdf.js/build/pdf.worker.js';
    pdfjsLib.PDFJS.disableWorker = false;
    pdfjsLib.PDFJS.workerSrc = obtenerURL('/Scripts/pdf.js/build/pdf.worker.js');

    // Using DocumentInitParameters object to load binary data.
    var loadingTask = pdfjsLib.getDocument({ data: pdfData });
    loadingTask.promise.then(function (pdf) {
        // Fetch the first page
        var pageNumber = 1;

        pdf.getPage(pageNumber).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            var renderTask = page.render(renderContext);
            renderTask.then(function () { });
        });
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
}

function EnviarDatosArchivo(url, parametorJSON, method) {

    var file = document.createElement("form");
    file.setAttribute("method", method);
    file.setAttribute("action", url);
    file.setAttribute("target", "view");

    for (var key in parametorJSON) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", parametorJSON[key]);
        file.appendChild(input);
    }
    return file;
}

function ViewPDF(url, parametorJSON) {
    var pdf = EnviarDatosArchivo(url, parametorJSON, "post");
    document.body.appendChild(pdf);
    window.open('', 'view');   
    pdf.submit();   
}

function DescargarArchivo(url, parametorJSON) {
    var file = EnviarDatosArchivo(url, parametorJSON, "post");
    document.body.appendChild(file);
    file.submit();
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

function ShowMessageValidacion(obj, contenido) {
    var content = "Campo Requerido";
    if (contenido !== undefined) {
        content = contenido;
    }
    $("#lbl" + $(obj).attr("name")).text(content);
    $("#lbl" + $(obj).attr("name")).show();
    return false;
}

function fnInputmask(value, isValido) {
    var valido = isValido;
    if ($(value).inputmask("hasMaskedValue")) {

        if ($(value).inputmask("isComplete")) {
            var initialValue = $(value).inputmask("getemptymask");

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
            valido = ShowMessageValidacion(value);
        }
    }
    return valido;
}

function fnValidarControler(objs) {
    var strValidacion = "CampoRequerido";
    var json = "[{";
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
                $("#lbl" + $(value).attr("name")).hide();
            }
            isValido = fnInputmask(value, isValido);

        }
        else if ($(value).attr("data-RequiredIfFull") && $.trim($(value).val()) !== "") {
            isValido = fnInputmask(value, isValido);
        }

        if (!$(value).attr("data-ignore")) {
            if ($(value).attr("type") === "radio") {
                if (fnNoExisteObjeto(arrayObj, $(value).attr("name"))) {
                    json = json + "\"" + $(value).attr("name") + "\":\"" + $("input[name=" + $(value).attr("name") + "]:checked").val() + "\",";
                    arrayObj.push($(value).attr("name"));
                }
            }
            else if ($(value).attr("type") === "checkbox") {
                json = json + "\"" + $(value).attr("name") + "\":\"" + ($("input[name=" + $(value).attr("name") + "]").is(":checked") ? "1" : "0") + "\",";
            }
            else {
                json = json + "\"" + $(value).attr("name") + "\":\"" + ($.trim($(value).val()) != "" ? $(value).val() : "NULL") + "\",";
            }
        }
    });

    if (json === "[{") {
        json = "[]";
    }
    else {
        json = json.substr(0, json.length - 1);
        json = json + "}]";
    }
    
    return {
        "isValido": isValido,
        "json": json
    };
}

function ValidarRangoFecha(fecha1, fecha2) {

    var arrayFechaI = fecha1.split('/');
    var arrayFechaF = fecha2.split('/');

    var FechaInicial = new Date(arrayFechaI[1] + "/" + arrayFechaI[0] + "/" + arrayFechaI[2]);
    var FechaFinal = new Date(arrayFechaF[1] + "/" + arrayFechaF[0] + "/" + arrayFechaF[2]);

    if (parseInt(arrayFechaI[2]) !== parseInt(arrayFechaF[2])) {
        alertify.alert().destroy();
        alertify.alert("Advertencia", "Solo se permiten fecha que esten en el mismo año.");
        return false;
    }
    if (FechaInicial.getTime() > FechaFinal.getTime()) {
        alertify.alert().destroy();
        alertify.alert("Advertencia", "La fecha inicial no puede ser mayor a la fecha final.");
        return false;
    }
    else if (FechaInicial.getTime() === FechaFinal.getTime()) {
        alertify.alert().destroy();
        alertify.alert("Advertencia", "La fecha inicial y fecha final no pueden ser iguales.");
        return false;
    }
    return true;
}

function fnopenconfirm(_title, _cont, _with, _heig, resize, _javas) {
    alertify.confirm().destroy();
    alertify.defaults.theme.ok = "btn alert-success";
    alertify.defaults.theme.cancel = "btn alert-danger";

    var modal = alertify.confirm().setHeader(_title)
        .set({
            labels: { ok: "Guardar", cancel: "Cancelar" },
            modal: true, resizable: resize, closable: false,
            onok: function () {
                var root = modal.elements.root;
                var form = $(root).find("form");

                if (fninvalidform(form) === true) { form.submit(); }

                return false;
            }
        }).resizeTo(_with, _heig).setContent(_cont).show();

    var root = modal.elements.root;

    fn_renderSelect2Alert(root);

    eval(_javas);
}

function fnAgregarMigaja(option) {
    
    var Migaja = '<li><a href="' + option.Mapeo + '" data-clic="data-clic" data-ajax="true" data-ajax-method="GET" data-ajax-mode="replace" data-ajax-update="#' + option.Contenedor + '" data-ajax-begin="showalertify()" data-ajax-complete="closealertify()" style="text-decoration:none;">' + option.Opcion + '</a></li>';
    $("#migajas").append(Migaja);
}

function fnAgregarMigajas(options) {
    $.each(options, function (value, index) {
      
        fnAgregarMigaja(index);
    });
}

function fninvalidform(form) {
    var value = true;
    var invmsg = "* Campo Requerido *";

    $.each($(form).find(":invalid"), function (i, item) {
        value = false;
        if ($(item).attr("inval-mesage") !== undefined) { invmsg = $(item).attr("val-mesage"); }

        $($(item).parent()).children().remove("div.valid-feedback");
        $($(item).parent()).children().remove("div.invalid-feedback");
        $(item).parent().append('<div class="invalid-feedback">' + invmsg + '</div>');
    });

    $.each($(form).find(":valid"), function (i, item) {
        if ($(item).inputmask("hasMaskedValue")) {
            if (!$(item).inputmask("isComplete") && $(item).attr("required") === "required") {
                value = false;
                $(item).addClass("is-invalid");
                $(item).css('border-color', '#dc3545');
                $($(item).parent()).children().remove("div.valid-feedback");
                $($(item).parent()).children().remove("div.invalid-feedback");
                $(item).parent().append('<div class="invalid-feedback">* Campo incompleto *</div>');
            } else {
                $(item).removeClass("is-invalid");
                $(item).css('border-color', '#28a745');
                $($(item).parent()).children().remove("div.valid-feedback");
                $($(item).parent()).children().remove("div.invalid-feedback");
            }
        } else {
            $(item).removeClass("is-invalid");
            $(item).css('border-color', '#28a745');
            $($(item).parent()).children().remove("div.valid-feedback");
            $($(item).parent()).children().remove("div.invalid-feedback");
        }
    });

    $(form).addClass('was-validated');

    return value;
}

function getFormData($form)
{
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};


    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function SeAgreraRadioButton(radiobutton, strRadiobutton) {

    var arrayRadiobutton = radiobutton.split(";");
    $.each(arrayRadiobutton, function (index, value) {
        
        if (value === strRadiobutton) {
            return false;
        }
    });
    return true;
}

function armarJsonSupervision(ArrayDatos) {    
    var jsonData = "";
    var radiobutton = "";

    if (jQuery.isEmptyObject(ArrayDatos) === false) {
        var Max = ArrayDatos.length;

        $.each(ArrayDatos, function (i, item) {

            if ($("#" + item.id).attr("type") !== "radio") {

                jsonData = jsonData + "\"" + item.name + "\"" + ": " + "\"" + fnjsonCaracter(item.value) + "\"" + ",";
            }
            else {

                if ($("input[id='" + item.id + "']").is(":checked")) {
                    jsonData = jsonData + "\"" + item.name + "\"" + ": " + "\"" + fnjsonCaracter(item.value) + "\"" + ",";
                }
            }
        });

        console.log(jsonData);
        jsonData = jsonData.substr(0, jsonData.length - 1);
        jsonData = "[{ " + jsonData + " }]";
        return jsonData;
    }	
}

function fnjsonwhere(_elemarr) {
    var _json = "";

    if (jQuery.isEmptyObject(_elemarr) === false) {
        $.each(_elemarr, function (_i, _item) {
            var _filterdata = _item.getAttribute("filterdata");

            if (_item.value !== "") {
                if (_filterdata === "sLike") {
                    
                    _json = (_json === "" ? "" : _json + ", ") + "{ \"" + _item.name + "\": { \"Valor\": \"" + _item.value + "\", \"TipoDdato\": \"" + _filterdata + "\" } }";
                }
                else { _json = (_json === "" ? "" : _json + ", ") + "{ \"" + _item.name + "\": { \"Valor\": \"" + _item.value + "\", \"TipoDdato\": \"" + _filterdata + "\" } }"; }
            }
        });

        _json = "[ " + _json + " ]";

        return JSON.parse(_json);
    } else { return []; }
}

function fnloadselect(_href, _arrparams, _nameselect, _fn) {
    $.get(obtenerURL(_href), _arrparams, function (_rejs) {
        $("#" + _nameselect).empty();
        $("#" + _nameselect).select2({ data: _rejs });
        
        eval(_fn);
    });
}

function fnerror(err) {
    console.log(err);
}

function fnalertifyModal(_url, _title, javas, _wit, _hei) {
    $.ajax({
        url: obtenerURL(_url),
        type: "get",
        dataType: "html",
        success: function (result, status, xhr) {
            alertify.defaults.theme.ok = "btn alert-success";
            alertify.defaults.theme.cancel = "btn alert-danger";

            alertify.confirm().destroy();
            var modal = alertify.confirm().setHeader(_title)
                .set({
                    labels: { ok: "Guardar", cancel: "Cancelar" },
                    modal: true, resizable: true, closable: false,
                    onok: function () {
                        var root = modal.elements.root;
                        var form = $(root).find("form");

                        if (fninvalidform(form) === true) {
                            if ($(form).attr("enctype") === "multipart/form-data") {
                                var frmData = new FormData();
                                var action = $(form).attr("action");
                                var _select = $(root).find("select");
                                var _textarea = $(form).find("textarea");
                                var objfile = document.getElementById("txtfilepng");
                                var _input = $(root).find('input:not([type="file"])');
                                
                                frmData.append('files', objfile.files[0]);
                                frmData.append('form', armarJson(_input.add(_select).add(_textarea)));

                                $.ajax({
                                    url: obtenerURL(action),
                                    data: frmData,
                                    type: "post",
                                    dataType: "json",
                                    contentType: false,
                                    processData: false
                                }).done(function (_json) {
                                    fntcsuccess(_json);
                                });
                            }
                            else { form.submit(); }
                        }

                        return false;
                    }
                }).resizeTo((_wit === undefined ? 500 : _wit), (_hei === undefined ? 500 : _hei)).setContent(result).show();

            var root = modal.elements.root;

            fn_renderSelect2Alert(root);

            eval(javas);
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

        });
    } else {
        alertify.alert("Advertencia", result.Mensaje);
    }
}

function fnmarcasuccess(result) {
    alertify.alert().destroy();
    if (result.Retorno === 0) {
        alertify.alert("Advertencia", result.Mensaje, function () {
            alertify.confirm().close();
            dtcatMarcas();
        });
    } else {
        alertify.alert("Advertencia", result.Mensaje);
    }
}

function cerrarmodal() {
    alertify.confirm().close();
}

//Funcion para cambiar de tab en base al id del frame. Cuando a la tab no se lo coloca la propieda id
function moverTab(obj) {
    var idFrame = obj;
    var tabs = $(idFrame).parent().parent().children('.tabs'); //Obtener todas tabs que contiene el controlTab en el frame seleccionado
    var frames = $(idFrame).parent().children('.frame')          //Obtener los frames del controlTab
    tabs.children('li').removeClass('active');   //Remover la clase active a todas las tabs
    frames.css({ display: "none" });              //Ocultar todos lo frames
    //frames.empty();     //En caso de que las llamadas sean mediante ajax, limpiar los frame para no sobrecargar la pagina, el moverTab tiene que ser antes del load
    var newTab = tabs.children('li:has(a[href="' + idFrame + '"])');    //Obtener el tab que sera seleccionado a partir del id de idFrame
    newTab.addClass('active');
    $(idFrame).css({ display: "block" }); //mostramos el frame del tab seleccionado
}
