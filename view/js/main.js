$("#pesquisar").click(function(){
    var txt = $("#txt-pesquisar").val();
    pesquisar(txt);
});

$("#txt-pesquisar").keypress(function(e) {
    var txt = $(this).val();
    if(e.which == 13)
        pesquisar(txt);
});


$("#grafico1").click(function(){
    $(".popup").fadeIn();
    $(".main-popup").append('<h1 class="titulo-popup"></h1>');
    $(".main-popup").append(' <canvas id="content-popup1" width="" height="150"></canvas>');
    getOSAssistenciaTecnica();
});
$("#grafico2").click(function(){
    $(".popup").fadeIn();
    $(".main-popup").append('<h1 class="titulo-popup"></h1>');
    $(".main-popup").append(' <canvas id="content-popup2" width="" height="150"></canvas>');
    getQtdStatus();
});
$("#grafico3").click(function(){
    $(".popup").fadeIn();
    $(".main-popup").append('<h1 class="titulo-popup"></h1>');
    $(".main-popup").append('<table id="tbl-1" class="table"><thead><tr><th scope="col">Nome</th></tr></thead><tbody></tbody></table>');
    getTipoGarantia();
});
$("#grafico4").click(function(){
    $(".popup").fadeIn();
    $(".main-popup").append('<h1 class="titulo-popup"></h1>');
    $(".main-popup").append(' <canvas id="content-popup3" width="" height="150"></canvas>');
    getOsAbertaGarantia();
});
$("#grafico5").click(function(){
    $(".popup").fadeIn();
    $(".main-popup").append('<h1 class="titulo-popup"></h1>');
    $(".main-popup").append(' <canvas id="content-popup4" width="" height="150"></canvas>');
    getOsAbertaPorMes();
});
$("#grafico6").click(function(){
    $(".popup").fadeIn();
    $(".main-popup").append('<h1 class="titulo-popup"></h1>');
    $(".main-popup").append('<canvas id="content-popup5" width="" height="150"></canvas>');
    getOsPorEstado();
});

$(".header-popup>span").click(function(){
    $(".popup").fadeOut();
    $(".main-popup").html("");
});

function pesquisar(txt){

    if(txt.length > 0) {
        $(".popup").fadeIn();
        $(".main-popup").append('<h1 class="titulo-popup"></h1>');
        $(".main-popup").append(`
            <table id="tbl-1" class="table">
                <thead>
                    <tr>
                        <th scope="col">Número OS</th>
                        <th>Tipo garantia</th>
                        <th class='wth'>Assistência técnica</th>
                        <th class='wth'>Data abertura</th>
                        <th>Modelo produto</th>
                        <th class='wth'>Cidade consumidor</th>
                        <th class='wth'>Último status</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);

        $.ajax({
            type: "POST",
            url: "controller/consulta.php",
            data:{op:"pesquisar", palavra:txt},
            success: function(retorno) {
                var lista = JSON.parse(retorno);
                console.log(lista);

                $(".titulo-popup").html('Resutados para :"'+txt+'"');
                $.each(lista, function(index, obj) {
                    html = `<tr>
                    <td clas='item-tb'>${obj.numero_os}</td>
                    <td clas='item-tb'>${obj.tipo_garantia}</td>
                    <td clas='item-tb'>${obj.assistencia_tecnica}</td>
                    <td clas='item-tb'>${obj.data_abertura}</td>
                    <td clas='item-tb'>${obj.model_produto}</td>
                    <td clas='item-tb'>${obj.cidade_consumidor} - ${obj.estado_consumidor}</td>
                    <td clas='item-tb'>${obj.data_ultimo_status}</td>
                    <td clas='item-tb'>${obj.status}</td>
                    </tr>`;
                    $("#tbl-1 tbody").append(html);
                });
            }
        });
    }
}

function getOSAssistenciaTecnica(){
    $.ajax({
        type: "POST",
        url: "controller/consulta.php",
        data:{op:"getOSAssistenciaTecnica"},
        success: function(retorno) {
            var lista = JSON.parse(retorno);
            var i=0;
            var qtd = [];
            var assistencia = [];
            var color = []
            $.each(lista, function(index, obj) {
                qtd[i] = obj.qtd;
                assistencia[i] = obj.assistencia;
                if(i%2 == 0)
                    color[i] = getRandomColor();//'rgba(54, 162, 235, 0.8)';
                else 
                    color[i] = getRandomColor();//'rgba(153, 102, 255, 0.8)';

                i++;
            });
            $(".titulo-popup").html('OS por assistência técnica');
            drawChart('OS por assistência técnica', 'content-popup1', 'pie', assistencia, qtd, color);
        }
    });
}

function getQtdStatus(){
    $.ajax({
        type: "POST",
        url: "controller/consulta.php",
        data:{op:"getQtdStatus"},
        success: function(retorno) {
            var lista = JSON.parse(retorno);
            var i=0;
            var qtd = [];
            var status = [];
            var color = []
            $.each(lista, function(index, obj) {
                qtd[i] = obj.qtd;
                status[i] = obj.status;
                if(i%2 == 0)
                    color[i] = getRandomColor();//'rgba(54, 162, 235, 0.8)';
                else 
                    color[i] = getRandomColor();//'rgba(153, 102, 255, 0.8)';

                i++;
            });
            $(".titulo-popup").html('OS por status');
            drawChart('OS por status', 'content-popup2', 'doughnut', status, qtd, color);
        }
    });
}

function getTipoGarantia(){
    $.ajax({
        type: "POST",
        url: "controller/consulta.php",
        data:{op:"getTipoGarantia"},
        success: function(retorno) {
            var lista = JSON.parse(retorno);
            
            $(".titulo-popup").html('Tipos de garantia');
            $(".table").fadeIn();
            $.each(lista, function(index, obj) {
                html = `<tr>
                            <td>${obj.tipo_garantia}</td>
                        </tr>`;
                $("#tbl-1 tbody").append(html);
            });
            
        }
    });
}

function getOsAbertaGarantia(){
    $.ajax({
        type: "POST",
        url: "controller/consulta.php",
        data:{op:"getOsAbertaGarantia"},
        success: function(retorno) {
            var lista = JSON.parse(retorno);
            var i=0;
            var qtd = [];
            var tipo_garantia = [];
            var color = []
            $.each(lista, function(index, obj) {
                qtd[i] = obj.qtd;
                tipo_garantia[i] = obj.tipo_garantia;
                if(i%2 == 0)
                    color[i] = 'rgba(54, 162, 235, 0.8)';
                else 
                    color[i] = 'rgba(153, 102, 255, 0.8)';

                i++;
            });
            $(".titulo-popup").html('OS abertas por garantia');
            drawChart('OS abertas por garantia', 'content-popup3', 'bar', tipo_garantia, qtd, color);
        }
    });
}

function getOsAbertaPorMes(){
    $.ajax({
        type: "POST",
        url: "controller/consulta.php",
        data:{op:"getOsAbertaPorMes"},
        success: function(retorno) {
            var lista = JSON.parse(retorno);
            var i=0;
            var qtd = [];
            var mes = [];
            var color = []
            $.each(lista, function(index, obj) {
                qtd[i] = obj.qtd;
                mes[i] = getMes(obj.mes);
                if(i%2 == 0)
                    color[i] = 'rgba(54, 162, 235, 0.8)';
                else 
                    color[i] = 'rgba(153, 102, 255, 0.8)';

                i++;
            });
            $(".titulo-popup").html('Quantidade de OS abertas por mês');
            drawChart('Quantidade de OS abertas por mês', 'content-popup4', 'bar', mes, qtd, color);
        }
    });
}

    function getOsPorEstado(){
    $.ajax({
        type: "POST",
        url: "controller/consulta.php",
        data:{op:"getOsPorEstado"},
        success: function(retorno) {
            var lista = JSON.parse(retorno);
            var i=0;
            var qtd = [];
            var estado = [];
            var color = []
            $.each(lista, function(index, obj) {
                qtd[i] = obj.qtd;
                estado[i] = obj.estado;
                if(i%2 == 0)
                    color[i] = getRandomColor();
                else 
                    color[i] = getRandomColor();

                i++;
            });
            $(".titulo-popup").html('Quantidade de OS por estado');
            drawChart('Quantidade de OS por estado', 'content-popup5', 'bar', estado, qtd, color);
        }
    });
}

function drawChart(titulo, id, tipo, index, value, color)
{
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: tipo,
        data: {
            labels: index,
            datasets: [{
                label: titulo,
                data: value,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function getRandomColor() {
    var letters = 'ABCD456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getMes(value){
    var mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    return mes[value];
}