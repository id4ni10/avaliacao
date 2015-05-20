//variavel que vai diferenciar as linhas da tabela, serve como base para montar os ids dos campos, e depois para poder encontrar os campos.
var idLinha = 0;

$(document).ready(function () {

    /******************Consulta ao carregar**************************/
    $(window).bind("load", function () {
        listarPedidos();
		buscarProdutos();
    });

    /******************Selecionar**************************/
    $("select#adicionar-produto").change(function () {
        selecionarProduto();
    });

    /******************Multiplicar Quantidade Preço**************************/

    $("#adicionar-quantidade").click(function () {
        multiplicarQuantidade();
    });

	$("body").on("click", "#listagem-acoes", function () {
		var idProduto = $(this).closest("tr").attr("id");
		detalharPedido(idProduto);
		$(".visualizacao").trigger("click");
	});

	$("#cadastro-adicionar").click(function(event){
        validateRows();
    });
	
    /******************Trata o negocio no EJB (DAO)***********************/
   /*  $("#cadastro-adicionar").click(function(){
        buscarProdutos();
    }); */
    
    $("#cadastro-salvar").click(function(){
        incluir();
    });
	
	$("#cadastro-cancelar").click(function(){
        limparFormulario();
    });
    
    
    /******************Datepicker**************************/
    $(".date").datepicker({
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
            'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set',
            'Out', 'Nov', 'Dez'
        ],
        nextText: 'Próximo',
        prevText: 'Anterior'
    });
});

/******************Listar Pedidos**************************/
function listarPedidos() {

    $.getJSON("http://localhost:8080/restee/api/pedidos/", function (data) {
        var items = [];
        $.each(data['Content'], function (key, val) {
            items.push("<tr id='" + val.id + "' >" +
                "<td>" + val.id + "</td>" +
                "<td>" + val.cpf + "</td>" +
                "<td>" + val.solicitante + "</td>" +
                "<td>" + parseJsonDate(new Date(val.data_pedido).toJSON()) + "</td>" +
                "<td><div class=\"control-group\"><label class=\"control-label\" for=\"listagem-acoes\"></label><div class=\"controls\"><span id=\"listagem-acoes\" name=\"listagem-acoes\" class=\"btn btn-info \">Visualizar</span></div></div></td>" +
                "</tr>");
        });
        $("#listagem-tabela tbody").html(items);

        /*$(".btn-info").on("click", function () {
			var idProduto = $(this).closest("tr").attr("id");
			detalharPedido(idProduto);
		});*/

        $("span.excluir, .ui-icon-delete").on("click", function () {
            var idProduto = $(this).closest("tr").attr("id");
            deletar(idProduto);

        });

        /*Voltar a tela de adicação de pedido
        $("#listagem-acoes").click(function () {
            $(".visualizacao").trigger("click");
        });*/

    });
}

/******************Incluir pedido **************************/
function incluir() {
   
    var pedido = { 
                   'pedido.cpf': $("#cadastro-cpf").val(),
                   'pedido.solicitante': $("#cadastro-nome").val(),
                   'pedido.endereco': $("#cadastro-endereco").val(),
                   'pedido.data_pedido': $("#cadastro-data").datepicker( "getDate" )
                 };
    
   
    var selects = $( "select[id*='select-id-'] option:selected" );
   $.each(selects, function(key,val){
       var idItem = val.id;
       var quantidadeItem = $("input[id^=adicionar-quantidade-")[key].value;
       
       pedido['pedido.produto.id['+key+']'] = idItem;
       pedido['pedido.produto.quantidade['+ key +']']= quantidadeItem;
   });
   
   pedido['pedido.qtd_itens'] = selects.length;
   
    //imprime o json
    alert(JSON.stringify(pedido));
   
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/restee/api/pedidos/",
        mimeType: "multipart/form-data",
        data:pedido,
        dataType: "json",
        success: function (data) {
			if(data['Return'] != 0){
				alert(data['Exception']);
			} else {
				listarPedidos();
				limparFormulario();
				alert("Pedido cadastrado com sucesso.");
			}
         },
		 error: function(){
			alert('Exb exeption');
		 }
    });
   

}

function limparFormulario(){
	$('#frm').each (function(){
	  this.reset();
	});
}

function validateRows(){

    var adicionarLinha = true;
    var linhas = $("input[id^='adicionar-quantidade-']");

    $.each(linhas, function(chave, valor){
        if(valor.value == null || valor.value == ""){
            adicionarLinha = false;
        }
    });

    if(adicionarLinha){
        buscarProdutos();
    }
}

 /******************Visualizar Pedido**************************/
function detalharPedido(id) {

    $.getJSON("http://localhost:8080/restee/api/pedidos/" + id, function (data) {

        var val = data['Content'];

		$(".visualizar-cpf").val(val.cpf);
		$(".visualizar-solicitante").val(val.solicitante);
		$(".visualizar-endereco").val(val.endereco);
		$(".visualizar-data").val(parseJsonDate(new Date(val.data_pedido).toJSON()));
		$(".visualizar-total").val(val.total);
		
		var produtos = [];
		var lista_produtos = val.itens;
		$.each(lista_produtos, function (chave, valor) {
			produtos.push("<tr id='" + valor.pk.produto.id + "' >" +
				"<td>" + valor.pk.produto.id + "</td>" +
				"<td>" + valor.pk.produto.nome + "</td>" +
				"<td>" + valor.pk.produto.descricao + "</td>" +
				"<td>" + valor.quantidade + "</td>" +
				"<td>" + valor.valor + "</td>" +
				"</tr>");

		});
		
		$("#visualizar-produto table").html(produtos);
        
        $("span.excluir, .ui-icon-delete").on("click", function () {
            var idProduto = $(this).closest("tr").attr("id");
            deletar(idProduto);

        });

    });
}

function selecionarProduto() {
    var selecionado = $("option:selected").attr("id");

    $.getJSON("http://localhost:8080/restee/api/produtos/" + selecionado, function (data) {

        $("#adicionar-descricao").val(data['Content'].descricao);
        $("#adicionar-valor").val(data['Content'].valor);

    });
    alert("Selecionar: Ok");
}

/*Voltar a tela de adicação de pedido*/
$("#listagem-novo").click(function () {
    $(".home").trigger("click");
});


/*Funções de navegação*/
$(function () {
    $('#home').tab('show')
});
/*$('#rootwizard').bootstrapWizard({
    'tabClass': 'nav nav-pills'
});*/

function buscarProdutos(){
	jQuery.ajax({	
			type: "GET",
			url: "http://localhost:8080/restee/api/produtos/disponiveis",
			mimeType: "multipart/form-data",
			dataType: "json",
			success: function (data) {
				adicionarProduto(data['Content']);
			}
		});
}

//Método que adiciona uma linha de produto na tela.
function adicionarProduto(data){
   
    // atributo que é uma string que vai ser concatenada do <tr> ao </tr>
    var linha;
    //começando a linha, e adicionando o select. É um select por linha, a quantidade de options é que vai depender da quantidade de produtos.    
    linha = "<tr id='"+idLinha+"'><td><div class='form-group'>"+
        "<select id='select-id-"+ idLinha +"' class='form-control' onchange='onChangeProduto("+idLinha+");'>";
    
    // para cada produto eu vou concatenar um option, observem o id do produto no id do option
    $.each(data, function (key, val) {
        linha+="<option id='" + val.id + "' >"+ val.nome + "</option>";
    });
    
    //terminei o select, vou continuar na proxima coluna
    linha+="</select></div></td>";
   
    //adicionando a descrição, valor, quantidade e total, cada coluna separada por um ENTER
    linha+="<td><div class='form-group'>"+                     
            "<textarea id='adicionar-descricao-"+idLinha+"' disabled class='form-control'></textarea></div></td>"+
        
            "<td><div class='form-group'>"+                     
            "<input type='text' id='adicionar-valor-"+idLinha+"' placeholder='Valor' disabled class='form-control'></div></td>"+


            "<td><div class='form-group'>"+                     
            "<input type='number' id='adicionar-quantidade-"+ idLinha + "' placeholder='Quantidade' class='form-control' onchange='onChangeQuantidade("+ idLinha +");' min='1'></div></td>"+

             "<td><div class='form-group'>"+                     
            "<input type='text' id='adicionar-total-"+idLinha+"' placeholder='Total' disabled class='form-control'></div></td>"+
            "<td><span class='btn btn-danger  glyphicon glyphicon-remove' name='remover-produto' id='remover-produto' onclick='removerProduto(this)'></span></td></tr>";
    // adiciono a linha no body da tabela OBS: COLOCAR O ID DA TABELA PARA: #listagem-produtos
    $("#listagem-produtos tbody").append(linha);
    //Chamando o evento do onChange (que também será chamado quando alterar no combo, observem que o id de cada input é concatenado com o idLinha, e o onchange do input de quantidade. 
    //Não somo a linha, pois a primeira linha é a linha 0, nesse método onchange é que será adicionado os valores nos campos de descrição e valor.
    onChangeProduto(idLinha);
    //agora sim, adiciono a linha
    idLinha++;
    	
    //});
}

//Metodo que retorna se a linha existe, o idLinhas será sempre somado, mesmo que uma linha seja removida, para sempre gerar id diferentes,
// com isso eu posso tentar pegar uma linha que não existe mais, pois ela foi removida, criei esse método para retornar se encontrei a linha ou não.
function hasLinha(idLinha){
    return $("select[id*='select-id-"+idLinha+"'] option:selected")[0] != null;
}

//Método chamado quando uma linha é adicionada ou quando o combo é alterado.
// Com a linha, ele pega o produto e solicita o carregamento dos dados do produto selecionado.
function onChangeProduto(idLinha){
    
    //Testo para saber se a linha existe
    if(hasLinha(idLinha)){
        
        buscarProduto(idLinha);
    }
    
}

/*Método o produto a partir da linha, o ítem: "select[id*='select-id-"+idLinha+"'] option:selected" pega o option selecionado do select alterado, com isso eu pego o id do option (que é o id do produto).
Com o id do produto, no ligar do if, vocês devem colocar a consulta que pega o produto a partir do id.
Não esqueçam de colocar uma constante para cada URL.
Simulei a consulta no servidor com o if.
*/
function buscarProduto(idLinha){
    var idProduto = $("select[id*='select-id-"+idLinha+"'] option:selected")[0].id;  
    jQuery.ajax({
            type: "GET",
            url: "http://localhost:8080/restee/api/produtos/"+idProduto,
            mimeType: "multipart/form-data",
            dataType: "json",
            success: function (data) {
                carregarProduto(idLinha, data['Content']);
            }
        });
}
//Método que coloca nos inputs de descricao e o valor, os dados do produto.
function carregarProduto(idLinha, produto){
    $("#adicionar-descricao-"+idLinha).val(produto.descricao);
    $("#adicionar-valor-"+idLinha).val(produto.valor);
    
}

/* function carregarQuantidade(idLinha){
    var idProduto = $("select[id*='select-id-"+idLinha+"'] option:selected")[0].id;  
    
       jQuery.ajax({
            type: "GET",
            url: "http://localhost:8080/restee/api/produtos/"+idProduto,
            mimeType: "multipart/form-data",
            dataType: "json",
            success: function (data) {
                calcularLinha(idLinha, data['Content']);
            }
        });
}
 */
/*Método chamado quando é alterado o valor da quantidade, ele pega o produto, pega a quantidade que o usuário digitou e multiplica.
Acho que como o capo de quantidade é um split (number), náo precisamos fazer a validação desse campo, mas, é bom testar.
criei um if para saber se é Zero para remover a linha, AINDA NÃO FEITO, MAS, É PARA FAZER.
Após calcular o valor, chamo o método que calcula o total do pedido.
*/
function onChangeQuantidade(idLinha){
    //Testo para saber se a linha existe
    if(hasLinha(idLinha)){
       // carregarQuantidade(idLinha);
       calcularLinha(idLinha); 
    }
    
}

function calcularLinha(idLinha){
    var quantidade = $("#adicionar-quantidade-"+idLinha).val();
	var valor = $("#adicionar-valor-"+idLinha).val();
	$("#adicionar-total-"+idLinha).val(valor * quantidade);
	calcularTotal();
}

/*
Método que pega todos os inputs com o id começados pelo valor:"adicionar-total-"
e soma cada um deles, passando esse valor para float (se não, ele concatena tudo como se fosse string.
E adiciona o valor somado no campo:pedido-total
*/
function calcularTotal(){
    
    var quantidadesParciais = $("input[id^='adicionar-total-']");
    var soma = 0;
    $.each(quantidadesParciais, function(chave,valor){
        soma = (soma + parseFloat(valor.value));
    });
    
    $("#pedido-total").val(soma);
}

/******************Formatar Data do JSON**************************/
function parseJsonDate(jsonDate) {

    var d = new Date(jsonDate);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return (curr_date + "/" + curr_month + "/" + curr_year);

};

function removerProduto(event){
   
    $(event).closest("tr").remove();
}