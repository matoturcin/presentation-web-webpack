import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero }    from '../../model/hero';

@Component({
    selector: 'hero-form',
    templateUrl: 'product-registration-form.component.html',
    styleUrls: ['product-registration-form.component.css'],
    providers: [FormsModule]
})

export class ProductRegistrationFormComponent {
    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    submitted = false;
    active = true;

    onSubmit() {
        this.submitted = true;
    }

    newHero() {
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}
