import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Content from "../../../../components/Content"

function App({ onSubmit, isLoading }) {

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    // process CSV data
    const processData = dataString => {
        try {
            const dataStringLines = dataString.split(/\r\n|\n/);
            const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

            const list = [];
            for (let i = 1; i < dataStringLines.length; i++) {
                const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
                if (headers && row.length == headers.length) {
                    const obj = {};
                    for (let j = 0; j < headers.length; j++) {
                        let d = row[j];
                        if (d.length > 0) {
                            if (d[0] == '"')
                                d = d.substring(1, d.length - 1);
                            if (d[d.length - 1] == '"')
                                d = d.substring(d.length - 2, 1);
                        }
                        if (headers[j]) {
                            obj[headers[j]] = d;
                        }
                    }

                    // remove the blank rows
                    if (Object.values(obj).filter(x => x).length > 0) {
                        list.push(obj);
                    }
                }
            }

            // prepare columns list from headers
            const columns = headers.map(c => ({
                name: c,
                selector: c,
            }));

            setData(list);
            setColumns(columns);
        }
        catch (e) {
            alert(`Could not process file: ${error}`)
        }
    }

    // handle file upload
    const handleFileUpload = e => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                /* Parse data */
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                processData(data);
            };
            reader.readAsBinaryString(file);
        }
        catch (e) {
            alert(`Could not process file: ${error}`)
        }

    }

    const importHandler = () => {
        if (data.length) {
            const students = data.map((obj) => {
                const studentId = ["id", "student id", "id number"];
                const department = ["department", "dept", "departments"];
                const section = ["section", "sec"];
                const n = ["name", "student name", "full name", "student full name"];
                const keys = Object.keys(obj);
                const keyMap = {};
                keys.forEach((k) => {

                    if (studentId.includes(k.toLowerCase())) {
                        keyMap[k] = "studentId";
                    }
                    if (department.includes(k.toLowerCase())) {
                        keyMap[k] = "department";
                    }
                    if (section.includes(k.toLowerCase())) {
                        keyMap[k] = "section";
                    }

                    if (n.includes(k.toLowerCase())) {
                        keyMap[k] = "fullname";
                    }
                });
                const newObj = { ...obj };
                delete newObj.id;
                Object.keys(keyMap).forEach((m) => {
                    newObj[keyMap[m]] = obj[m];
                })
                return newObj;

            });
            if (onSubmit) {
                onSubmit({ students });
            }
        }
        else {
            alert("No data found for import. Make sure to upload spreadsheet first!")
        }
    }

    return (
        <Content isLoading={isLoading} title="Upload Spreadsheet file" actions={[{ name: "Import", handler: importHandler }]}>
            <p>Make sure the spreadsheet you upload contains the following fields:</p>
            <ul>
                <li>id</li>
                <li>fullname</li>
                <li>section</li>
                <li>department</li>
            </ul>
            <input
                type="file"
                onChange={handleFileUpload}
            />
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
            />
        </Content>
    );
}

export default App;