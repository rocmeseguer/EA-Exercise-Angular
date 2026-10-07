import { Component, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * ============================================
 * TWO-WAY BINDING - model() (Angular 17.2+)
 * ============================================
 * model() creates a signal that is at the same time:
 * - an INPUT:  the parent sends the value  -> [value]
 * - an OUTPUT: the child notifies changes  -> (valueChange)
 *
 * The parent can combine both with the "banana in a box" syntax:
 *   <app-description-input [(value)]="mySignal" />
 * which is just shorthand for:
 *   <app-description-input [value]="mySignal()" (valueChange)="mySignal.set($event)" />
 */
@Component({
    selector: 'app-description-input',
    imports: [MatFormFieldModule, MatInputModule],
    templateUrl: './description-input.component.html',
    styleUrl: './description-input.component.css'
})
export class DescriptionInputComponent {

    /**
     * ============================================
     * MODEL SIGNAL - model<T>(initialValue)
     * ============================================
     * Read:  this.value()
     * Write: this.value.set(x) -> also emits 'valueChange' to the parent
     */
    value = model<string>('');

    /**
     * ============================================
     * EVENT BINDING - View -> Component
     * ============================================
     * Called on every keystroke. Updating the model signal
     * propagates the new value to the parent.
     */
    onInput(event: Event): void {
        this.value.set((event.target as HTMLInputElement).value);
    }
}
