const fs = require("fs");
const path = require("path");
const folderDir = "./folder";
const newFolderDir = "./newFolder";



const readDir=(folderDir, level)=>{
    const files = fs.readdirSync(folderDir);
  
    files.forEach(item=>{
        
        let localDir = path.join(folderDir, item);
        let state = fs.statSync(localDir);
        
        if(state.isDirectory()){
            readDir(localDir, level +1);
        }else{
            let nameDir = item.slice(0,1);
            fs.mkdirSync(path.join(newFolderDir, nameDir), { recursive: true }, err=>{
                        if(err){
                            console.log(err);
                       }
                        console.log("Папка создана");
                   })
            let nameD = path.join(nameDir, item);
             fs.rename(localDir,path.join(newFolderDir, nameD), err => {
                  if(err) {
                       console.log(err);
                  }  
                  console.log('Файл успешно перемещён');
             });
           /* fs.rmdir('./1', err => {
                if(err) {
                    console.log(err);
                    return;
                  } 
                console.log('Папка успешно удалена');
              })*/
              console.log(__dirname);
        }
    })
}

readDir(folderDir,0);