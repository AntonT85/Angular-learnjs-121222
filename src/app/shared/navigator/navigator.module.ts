import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorDirective } from './navigator.directive';

@NgModule({
	declarations: [NavigatorDirective],
	imports: [CommonModule],
	exports: [NavigatorDirective],
})
export class NavigatorModule {}
