import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { ProductCardModule } from './product-card/product-card.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaginationModule } from '../../shared/pagination/pagination.module';
import { FilterByParamModule } from '../../shared/filter-by-param/filter-by-param.module';
import { RouterModule } from '@angular/router';
import { ProductsListRoutingModule } from './products-list-routing.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [ProductsListComponent],
	imports: [
		CommonModule,
		ProductCardModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatButtonModule,
		PaginationModule,
		FilterByParamModule,
		RouterModule,
		ProductsListRoutingModule,
		MatInputModule,
	],
	exports: [ProductsListComponent],
})
export class ProductsListModule {}
