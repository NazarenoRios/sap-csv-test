import Papa from "papaparse";

interface CsvData {
  status: number;
  message: string;
}

const add_csv = async (file: any): Promise<CsvData> => {
  if (!file) {
    return { status: 400, message: "No CSV file provided." };
  }

  try {
    return await new Promise<CsvData>((resolve, reject) => {
      let csvData = [];

      Papa.parse(file.path, {
        complete: (result) => {
          csvData = result.data;
          resolve({ status: 200, message: "File uploaded successfully!" });
        },
        error: () => {
          reject({ status: 500, message: "Error parsing the CSV file!" });
        },
      });
    });
  } catch (error) {
    throw error;
  }
};

export { add_csv };
