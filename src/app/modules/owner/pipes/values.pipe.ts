import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'values'
})

export class ValuesPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        // create instance vars to store keys and final output        
        let keyArr: any[] = Object.keys(value);
        console.log(keyArr);
        let dataArr: any[] = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            if (!(value[key] instanceof Array)){
                dataArr.push(value[key]);
            }
        });

        // return the resulting array
        return dataArr;
    }
}
