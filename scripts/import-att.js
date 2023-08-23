const fs = require("fs");
const YEAR = 2023;
loadFile("att.tab");
//console.log(fullDate("8/3"));
async function loadFile(fn)
{
    const lines = fs.readFileSync(fn, 'utf8').split("\n");
    const row1 = lines[0].split("\t");
  //  console.log(row1);
    
    const students = [];
    let id = 0;

    for (let i = 1; i < lines.length;i++) {
        //console.log(row);
        const row = lines[i];
        const data = row.split("\t");
        if (data.length > 1) {
            id++;
            const name = data[0];
            const att = [];
           // console.log ("NAME:",name)
            for (let y = 6; y < data.length; y++)
            {
                const dt = fullDate(row1[y]);
                const val = data[y];
                if(val==="x"||val==="X")
                    att.push(dt);
            }
            const s = {
                id:id,
                name: data[0],
                attendance:att
            }
            students.push(s);
        }
    }
    /*
    for (let s of students)
    {
        console.log(s.id, s.name);    
    }
    */
  console.log(JSON.stringify(students));
}

function fullDate(dt)
{
   // console.log("DATE:", dt);
    const parts = dt.split("/");
    const newDate = new Date();
    newDate.setYear(2023);
    const m = parseInt(parts[0]) - 1;
    const d = parseInt(parts[1]);
    newDate.setMonth(m);
    newDate.setDate(d);
   
    return newDate.toISOString().split("T")[0];
}