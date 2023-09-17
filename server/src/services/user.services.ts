import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

const get_users = async (searchQuery: any) => {
  const searchResults: { fileName: string; results: any[] }[] = [];

  const uploadFolderPath = path.join(__dirname, "../uploads");

  try {
    const files = fs.readdirSync(uploadFolderPath);

    for (const file of files) {
      if (file.endsWith(".csv")) {
        const filePath = path.join(uploadFolderPath, file);

        const fileData = await new Promise<any[]>((resolve, reject) => {
          const results: any[] = [];
          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
        });

        const filteredResults = fileData.filter((row) => {
          return Object.values(row).some(
            (value: any) =>
              value
                .toString()
                .toLowerCase()
                .indexOf(searchQuery.toLowerCase()) !== -1
          );
        });

        if (filteredResults.length > 0) {
          searchResults.push({ fileName: file, results: filteredResults });
        }
      }
    }

    if (searchResults.length > 0) {
      return {
        status: 200,
        message: "Search successfully",
        data: searchResults,
      };
    } else {
      return { status: 400, message: "No matching results found." };
    }
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

export { get_users };
