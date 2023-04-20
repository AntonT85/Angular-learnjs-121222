import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

interface INavigatorContext<T> {
	$implicit: T[];
	next: () => void;
	back: () => void;
	appNavigator: T[] | undefined;
}

@Directive({
	selector: '[appNavigator]',
})
export class NavigatorDirective<T> implements OnChanges, OnInit {
	@Input() appNavigator: T[] | undefined;
	@Input() appNavigatorSize = 2;

	private readonly currentIndex$ = new BehaviorSubject<number>(0);

	constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<INavigatorContext<T>>) {}

	ngOnChanges({ appNavigator }: SimpleChanges) {
		if (appNavigator) {
			this.updateView();
		}
	}

	ngOnInit() {
		this.listenCurrentIndexChange();
	}

	private updateView() {
		if (!this.appNavigator?.length) {
			this.viewContainerRef.clear();

			return;
		}

		this.currentIndex$.next(0);
	}

	private listenCurrentIndexChange() {
		this.currentIndex$.pipe(map(currentIndex => this.getCurrentContext(currentIndex))).subscribe(context => {
			this.viewContainerRef.clear();
			this.viewContainerRef.createEmbeddedView(this.templateRef, context);
		});
	}

	private getCurrentContext(currentIndex: number): INavigatorContext<T> {
		const data: T[] | undefined = this.appNavigator?.slice(
			currentIndex * this.appNavigatorSize,
			currentIndex * this.appNavigatorSize + this.appNavigatorSize,
		);
		return {
			$implicit: data as T[],
			appNavigator: this.appNavigator,
			next: () => {
				this.next();
			},
			back: () => {
				this.back();
			},
		};
	}

	private next() {
		const nextIndex = this.currentIndex$.value + 1;
		const newIndex = nextIndex < (this.appNavigator as T[]).length ? nextIndex : 0;

		this.currentIndex$.next(newIndex);
	}

	private back() {
		const previousIndex = this.currentIndex$.value - 1;
		const newIndex = previousIndex >= 0 ? previousIndex : (this.appNavigator as T[]).length - 1;

		this.currentIndex$.next(newIndex);
	}
}
