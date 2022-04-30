const fs = require("fs");
const path = require("path");
const folderDir = "./folder";
const newFolderDir = "./newFolder";



const readDir = (folderDir, level) => {
    const files = fs.readdir(folderDir, (err, files) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        files.forEach(item => {

            let localDir = path.join(folderDir, item);
            let state = fs.stat(localDir, (err, state) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (state.isDirectory()) {
                    readDir(localDir, level + 1);
                } else {
                    let nameDir = item.slice(0, 1);
                    let NewDirName = path.join(newFolderDir, nameDir);
                    fs.mkdirSync(NewDirName, { recursive: true }, (err) => {
                        if (err) {
                            trow(err);
                        }
                    })
                    let nameD = path.join(nameDir, item);
                    let dirForCopy = path.join(newFolderDir, nameD);
                    fs.copyFile(localDir, dirForCopy, (err) => {
                        if (err) {
                            trow(err);
                        }
                        console.log('Файл успешно перемещён');
                    });
                }
            });

        })
    });
}

readDir(folderDir, 0);