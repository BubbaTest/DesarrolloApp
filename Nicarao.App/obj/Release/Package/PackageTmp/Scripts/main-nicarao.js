function fnaddexpediente(_req){
    alertify.defaults.theme.ok = "btn alert-success";

    alertify.alert().destroy();
    var modal = alertify.alert().setHeader('Agregar expediente al archivo')
        .set({
            label: "Cerrar",
            closable: false,
            resizable: true,
            onok: function () {

            }
        }).resizeTo(850, 550).setContent(_req).show();

    fntableloaddataagregar("0");
}

function fntableloaddataagregar(_expid){
    if ($.fn.DataTable.isDataTable("#tblExpedienteArchivoAgregar")) { $("#tblExpedienteArchivoAgregar").DataTable().destroy(); }

    $("#tblExpedienteArchivoAgregar").DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: obtenerURL("InventarioArchivo/BuscarExpedienteArchivo?arcid=" + $('#txtsArchivoId').val() + "&expid=" + _expid),
            type: "post",
            dataType: "json",
            beforeSend: function () { var oaw = new AlertWaiting(); oaw.show(); },
            complete: function () { var oaw = new AlertWaiting(); oaw.close(); }
        },
        columns: [
            {
                data: "ExpedienteId",
                render: function (data, row, dd) {
                    var jextendido = (dd.CampoExtendido !== undefined ? dd.CampoExtendido.replace(/\n/g, '').replace(/\t/g, '').replace(/"/g, "'") : "[]");
                    var _form = `<form action="InventarioArchivo/UbicacionDetalle" class="needs-validation" data-ajax="true" data-ajax-failure="fnerror" data-ajax-method="post" data-ajax-mode="replace" data-ajax-update="#cell-content" id="${dd.Id}" method="post">
                                        <input name="__RequestVerificationToken" type="hidden" value="gVyA2caZhcuhP7mjb8celPCb6ADRW22mwjhgHXdpGy87dYOSvndvS24Yj2lc03LCVqmhjAIkPCAz6S2cWe_6djRbhV0tu-O8culpiWt5u1Q1">
                                        <input name="ExpedienteId" type="hidden" value="${dd.ExpedienteId}">
                                        <input name="ArchivoId" type="hidden" value="${dd.ArchivoId}">
                                        <input name="UbicacionActualId" type="hidden" value="0">
                                        <input name="Migrado" type="hidden" value="true">
                                        <input name="Folio" type="hidden" value="${dd.Folio}">
                                        <input name="JsonExtendido" type="hidden" value="${jextendido}">
                                        <button type="submit" class="iris-btneditar btn btn-circle btn-xl" data-toggle="tooltip" data-placement="top" title="Agregar ubicación">
                                            <i class="fa fa-download"></i> 
                                        </button>
                                    </form>`;

                    return _form;
                }
            },
            { data: "ExpedienteId" },
            { data: "Folio" },
            {
                data: "Observacion",
                render: function (data, a, b, c) {
                    var _obser = data;

                    if (data !== undefined) {
                        if (data.length > 50) {
                            _obser = data.substring(0, 50) +
                                `<button onclick="fnverdata('${data}', 'cnt${c.row}')" type="button" class="btn btn-link btn-xl">
                                        Ver más
                                    </button>`;
                        }
                    } else { _obser = ''; }

                    return `<p id="cnt${c.row}">
                                    ${_obser}
                                </p>`;
                }
            }],
        language: { url: obtenerURL("/Json/Spanish.json") },
        lengthMenu: [10], bLengthChange: false, searching: false,
        dom: 'rtip'
    });
}

fnverdata = (_dta, _prow) => {
    $('#' + _prow).html(_dta);
}

fnonsuccess = (req) => {
    let jj = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fnopenconfirm("Ingresar expediente", req, 700, 300, true));
        });
    });

    jj.then(() => {
        if ($("#cntNumeroExpediente").html() !== undefined) {
            $("#txtlAnioId").inputmask("y");
            $("#txtlCarnetId").inputmask("Regex", { regex: "([0-9]|[aA-zZ])*" });

            $('input[name="tipoArchivo"]').on("change", function () {
                if ($("#rdoArchivoIndice").is(":checked")) {
                    $("#cntNumeroExpediente").empty().append(`<div class="col-md-4">
                                                                <label class="has-float-label" data-toggle="tooltip" data-placement="top" title="Número de carnet">
                                                                    <input class="form-control" id="txtlCarnetId" name="CarnetId" placeholder="Ingrese el nùmero de carnet" type="text" required>
                                                                    <span class="has_float">Número de Carnet:</span>
                                                                </label>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label class="has-float-label" data-toggle="tooltip" data-placement="top" title="Año del libro">
                                                                    <input class="form-control" id="txtlAnioId" name="AnioId" placeholder="Ingrese el año" type="text" required>
                                                                    <span class="has_float">Año:</span>
                                                                </label>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <label class="has-float-label" data-toggle="tooltip" data-placement="top" title="Tipo de libro">
                                                                    <select class="form-control" id="ddllTipoLibroId" name="TipoLibroId" placeholder="Seleccióne el tipo de libro" required>
                                                                        <option value="">Seleccióne el tipo de libro</option>
                                                                    </select>
                                                                    <span class="has_float">Tipo de Libro:</span>
                                                                </label>
                                                            </div>`);

                    $("#txtlAnioId").inputmask("y");
                    $("#txtlCarnetId").inputmask("Regex", { regex: "([0-9]|[aA-zZ])*" });

                    $.getJSON(obtenerURL("InventarioArchivo/LibroTipoObtener?id=0&acc=0"), (_req) => {
                        $("#ddllTipoLibroId").empty();
                        $("#ddllTipoLibroId").select2({ data: _req, placeholder: "Seleccione el tipo de libro" });
                    });
                } else if ($("#rdoArchivoSello").is(":checked")) {
                    $("#cntNumeroExpediente").empty().append(`<div class="col-md-4">
                                                            <label class="has-float-label" data-toggle="tooltip" data-placement="top" title="Número de carnet">
                                                                <input class="form-control" id="txtsCarnetId" name="CarnetId" placeholder="Ingrese el nùmero de carnet" required type="text">
                                                                <span class="has_float">Número de Carnet:</span>
                                                            </label>
                                                        </div>
                                                        <div class="col-md-5">
                                                            <label class="has-float-label" data-toggle="tooltip" data-placement="top" title="Número de sello">
                                                                <input class="form-control" id="txtsSelloId" name="SelloId" placeholder="Ingrese el sello" type="text" required>
                                                                <span class="has_float">Número de Sello:</span>
                                                            </label>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <label class="has-float-label" data-toggle="tooltip" data-placement="top" title="Nomenclatura para el sello">
                                                                <input class="form-control" id="txtsNoSelloId" name="NoSelloId" placeholder="Ingrese el sello" type="text" value="SELL" disabled required>
                                                                <span class="has_float">:</span>
                                                            </label>
                                                        </div>`);

                    $("#txtsNoSelloId").inputmask("AAAA");
                    $("#txtsSelloId").inputmask("Regex", { regex: "[0-9]*" });
                    $("#txtsCarnetId").inputmask("Regex", { regex: "([0-9]|[aA-zZ])*" });
                }
            });

            $.getJSON(obtenerURL("InventarioArchivo/LibroTipoObtener?id=0&acc=0"), (_req) => {
                $("#ddllTipoLibroId").empty();
                $("#ddllTipoLibroId").select2({ data: _req, placeholder: "Seleccione el tipo de libro" });
            });

            $("#frmAgregarExpediente").submit((e) => {
                var _exp = '';

                if ($("#rdoArchivoIndice").is(":checked")) {
                    _exp = $("#txtlCarnetId").val() + '-' + $("#txtlAnioId").val() + '-' + $("#ddllTipoLibroId").val();
                } else if ($("#rdoArchivoSello").is(":checked")) {
                    _exp = $("#txtsCarnetId").val() + '-' + $("#txtsSelloId").val() + '-' + $("#txtsNoSelloId").val();
                }

                $("#txtnuevoExpedienteId").val(_exp);
                if (_exp === '') { e.preventDefault(); return false; }

                return true;
            });
        }
    });  
}

function fnaddobserv(_mid, _acc, _array, _title) {
    _title = (_title !== undefined ? _title : 'Observaciones');

    $.get(obtenerURL('Movimiento/ModalMovimientoEditar'), { mid: _mid, acc: _acc, model: _array }, (_req) => {
        fnopenconfirm(_title, _req, 600, 550, true, '$("#txtcntFolio").inputmask("Regex", { regex: "[0-9]*"}); fnubicacion();');

        $("#frmmovObservaciones").submit(function () {
            var _input = $('#frmmovObservaciones input[extendido="true"]');
            var _select = $('#frmmovObservaciones select[extendido="true"]');
            var _json = armarJsoninput(_select.add(_input));

            $("#txtcntFolio").removeAttr("disabled");
            $("#txtmduvCampoExtendido").val(_json);
        });
    });
}

function fnsuccessmov(_req) {
    alertify.alert().destroy();

    if (_req.Retorno !== 0) {
        alertify.alert("Advertencia", _req.Mensaje);
        if ($("#txtaccModalId").val() === '0') { $("#txtcntFolio").attr("disabled", "true"); }
    } else {
        alertify.alert("Correcto", _req.Mensaje, function () {
            alertify.confirm().close();
            $('a.active[data-toggle="tab"]').click();
        });
    }
}

function fnnow() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');

    return dd + mm + yyyy;
}

function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;
}

fnubicacion = () => {
    $("#txtudUbicacionId").select2({
        ajax: {
            url: obtenerURL("InventarioArchivo/UbicacionObtener"),
            dataType: 'json',
            delay: 800,
            data: function (params) {
                var consulta = {
                    search: params.term,
                    archid: $("#txtmudArchivoId").val()
                };

                return consulta;
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        },
        placeholder: 'Ingrese la ubicación',
        minimumInputLength: 5
    });
}

function fnobtenerubicacion(_req) {
    $("#cell-content").empty().append(_req);
    alertify.confirm().close();
}