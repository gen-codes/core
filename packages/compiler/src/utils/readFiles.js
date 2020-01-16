import fs from 'fs-extra';
import listFiles from './listFiles';
export default function readFiles(dir,options) {
    const filelist=listFiles(dir);
    return filelist.reduce((files,filename) => {
        if(options) {
            if(options.notContain&&filename.includes(options.notContain)) {
                return files;
            }
            if(options.contain&&!filename.includes(options.contain)) {
                return files;
            }
        }
        files.push({
            filename: filename.replace(dir,""),
            text: fs.readFileSync(filename,"utf8")
        });
        return files;
    },[]);
}
