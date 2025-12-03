import fs from 'fs';
import csvParser from 'csv-parser';
import { pipeline } from 'stream/promises';

const INPUT_FILE = 'AnexoVIII-CorrelacaoItemNBSIndOpCClassTrib_IBSCBS_V1.00.00.csv';
const OUTPUT_FILE = 'AnexoVIII-CorrelacaoItemNBSIndOpCClassTrib_IBSCBS_V1.00.00.json';

// Column mapping from CSV to JSON
const COLUMN_MAPPING = {
  'Item LC 116': 'itemLC',
  'Descrição Item': 'descricaoItem',
  'NBS': 'codigo',
  'DESCRIÇÃO NBS': 'descricao',
  'PS ONEROSA? (S/N)': 'psOnerosa',
  'ADQ EXTERIOR? (S/N)': 'adqExterior',
  'INDOP': 'indop',
  'Local incidência IBS': 'localIncidencia',
  'cClassTrib': 'cClassTrib',
  'nome cClassTrib': 'nomecClassTrib'
};

async function convertCsvToJson() {
  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_FILE)) {
      console.error(`Error: Input file '${INPUT_FILE}' not found.`);
      process.exit(1);
    }

    const records = [];
    
    // Read and parse CSV file with UTF-8 encoding
    const stream = fs.createReadStream(INPUT_FILE, { encoding: 'utf8' })
      .pipe(csvParser({
        separator: ',',
        skipEmptyLines: false,
        trim: false, // Don't trim to preserve original data
        relax_column_count: true // Allow rows with different column counts
      }));

    for await (const row of stream) {
      // Map CSV columns to JSON structure
      const record = {};
      
      for (const [csvColumn, jsonKey] of Object.entries(COLUMN_MAPPING)) {
        // Get value from row, default to empty string if not found
        const value = row[csvColumn];
        record[jsonKey] = value !== undefined ? value : '';
      }
      
      records.push(record);
    }

    // Write JSON file with proper formatting and UTF-8 encoding
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(records, null, 2),
      { encoding: 'utf8' }
    );

    console.log(`✓ Successfully converted ${records.length} records`);
    console.log(`✓ Output file: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error during conversion:', error.message);
    process.exit(1);
  }
}

// Run the conversion
convertCsvToJson();
