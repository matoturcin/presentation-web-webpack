import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';

@Directive({ selector: '[anuHighlight]' })
export class AnuHighlightDirective {

    @Input('anuHighlight') highlightColor: string;
    _defaultColor: string = "yellow";

    constructor(private el: ElementRef, private renderer: Renderer) {
//        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
    
    

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor || this._defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}
