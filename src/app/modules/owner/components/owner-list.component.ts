import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../services/owner.service.ts';
import { CarService } from '../services/car.service.ts';
import { CommonServiceImpl } from '../services/common.service.ts';
import { Owner } from '../models/owner';
import { Car } from '../models/car';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';


@Component({
    selector: 'owner-list',
    templateUrl: './owner-list.component.html',
    providers: [
        OwnerService,
        CarService,
        CommonServiceImpl
    ]
    
})
export class OwnerListComponent implements OnInit {

    private owners: Owner[];

    constructor(private ownerService: OwnerService, private carService: CarService) {

    }

    ngOnInit() {
        this.ownerService.getList()
            .mergeMap((owners: Array<Owner>) => owners)
            .map((owner: Owner) => {
                this.carService.getList(owner.name)
                    .subscribe((cars: Array<Car>) => owner.cars = cars);
                return owner})
            .toArray()
            .subscribe((owners: Array<Owner>) => this.owners = owners);
    }

    testingObservables() {
        let obs: Observable<any> = Observable.create((observer: Observer<number>) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
        });
        obs.map(x => x + 1).subscribe(x => console.log(x));

        let obs2: Observable<any> = Observable.create((observer: Observer<number[]>) => {
            observer.next([1, 2, 3]);
            observer.next([2, 4, 6]);
        });
        obs2.mergeMap((x: Array<number>) => x).map((x: number) => x * 2).subscribe(x => console.log(x.toString()));
        console.log('==========================');
        let obs3: Observable<any> = Observable.create((observer: Observer<Observable<number>>) => {
            observer.next(Observable.of(1));
            observer.next(Observable.of(2));
            observer.next(Observable.of(3));
        });
        //        obs3.map((x: Observable<number>) => x.map(z => z + 1)).subscribe(x => console.log(x));
        obs3.map((x: Observable<number>) => x.map(z => z + 1)).subscribe(x => x.subscribe(v => console.log(v)));
//        obs3.map((x: Observable<number>) => x.concatMap(z => Observable.of(z)).map((n: number) => n + 1)).subscribe(v => console.log(v));

        console.log('==========================');
        let obs4: Observable<number> = Observable.of(1);
        obs4.map(x => x + 1).subscribe(x => console.log(x));

        console.log('==========================');

        let numbers: Array<number> = [6, 5, 4];
        let obs5: Observable<any> = Observable.create((observer: Observer<number>) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
        });
        let obs6: Observable<any> = Observable.create((observer: Observer<number>) => {
        });
        obs5.map(x => x + 1).subscribe(x => {

            console.log(x)
        });
        let eventStream = new Subject<string>();

        let subscription = eventStream.subscribe(
            function(x) {
                console.log('Next: ' + x);
            },
            function(err) {
                console.log('Error: ' + err);
            },
            function() {
                console.log('Completed');
            });
        eventStream.next('foo');

        //        eventStream.subscribe(x => x.on)
        //        var my_function = function() {
        //          eventStream.onNext('foo'); 
        //        }
    }


}


