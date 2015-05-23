# Avaliacao Takenami
Atividade Node.js + MongoDB

Grupo: Aquiles Oliveira, Aziz Sault e Danilo Nascimento

Metadados Banco:avaliacao

	peças {nome:"Nobreak", descrição:"Fonte de energia", fabricante:"Itautec", valor_unitário:100.20}
	
    categoria { nome:"Periférico" }
	
	pedidos {nome:"Aquiles", email:"aquiles@gmail.com", endereco:"rua mizerê" , 
		pecas[
			{id:"10923812371", quantidade:2 ,valor_unitário:100.20 },
			{id:"38327492342", quantidade:3 ,valor_unitário:123.20 }
		],
		total:223.40
	}
    
    set DEBUG=myapp & node .\bin\www