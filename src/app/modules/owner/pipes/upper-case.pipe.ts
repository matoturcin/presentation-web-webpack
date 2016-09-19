import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'UPPER'
})

export class UpperCasePipe implements PipeTransform {
    
    transform(value: string, args: any[]): string {
        return value.toUpperCase();
    }
}
