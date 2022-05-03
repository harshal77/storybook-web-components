import { AppComponent } from './app.component';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

// array of web components for exporting
const components = [
	{
		name: 'button',
		component: ButtonComponent,
	}
];

@NgModule({
	declarations: [
		AppComponent,
		ButtonComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		MatIconModule
	],
	providers: [],
	bootstrap: [AppComponent],
	// entryComponents: components.map((e) => e.component),
})
export class AppModule {
	constructor(private injector: Injector) {
		this.createWebComponents(components, injector);
	}

	createWebComponents(component: any, injector: Injector) {
		component.forEach((c: any) => {
			const ce = createCustomElement(c.component, { injector });
			customElements.define(c.name, ce);
			c['web-component'] = ce;
		});
	}
}
