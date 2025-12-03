# CSV to JSON Converter

Este projeto converte o arquivo CSV `AnexoVIII-CorrelacaoItemNBSIndOpCClassTrib_IBSCBS_V1.00.00.csv` em um arquivo JSON estruturado.

## Requisitos

- Node.js (versão 14 ou superior)
- npm

## Instalação

```bash
npm install
```

## Uso

1. Certifique-se de que o arquivo CSV `AnexoVIII-CorrelacaoItemNBSIndOpCClassTrib_IBSCBS_V1.00.00.csv` está no diretório raiz do projeto.

2. Execute o script de conversão:

```bash
npm run convert
```

3. O arquivo JSON será gerado com o nome `AnexoVIII-CorrelacaoItemNBSIndOpCClassTrib_IBSCBS_V1.00.00.json`.

## Estrutura do JSON

O arquivo JSON gerado contém um array de objetos com a seguinte estrutura:

```json
[
  {
    "itemLC": "01.01",
    "descricaoItem": "string",
    "codigo": "1.1502.10.00",
    "descricao": "string",
    "psOnerosa": "S",
    "adqExterior": "N",
    "indop": "100301",
    "localIncidencia": "string",
    "cClassTrib": "000001",
    "nomecClassTrib": "string"
  }
]
```

## Mapeamento de Colunas

| Coluna CSV | Campo JSON |
|------------|------------|
| Item LC 116 | itemLC |
| Descrição Item | descricaoItem |
| NBS | codigo |
| DESCRIÇÃO NBS | descricao |
| PS ONEROSA? (S/N) | psOnerosa |
| ADQ EXTERIOR? (S/N) | adqExterior |
| INDOP | indop |
| Local incidência IBS | localIncidencia |
| cClassTrib | cClassTrib |
| nome cClassTrib | nomecClassTrib |

## Características

- ✓ Preserva caracteres especiais (acentos, cedilha, etc.)
- ✓ Mantém valores vazios como strings vazias
- ✓ Formatação JSON com indentação
- ✓ Encoding UTF-8
- ✓ Mantém a ordem original dos registros
