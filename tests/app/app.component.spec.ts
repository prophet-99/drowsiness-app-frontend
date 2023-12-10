import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../../src/app/app.component';
import { AppRoutingModule } from '../../src/app/app-routing.module';
import { PagesModule } from '../../src/app/pages/pages.module';
import { ComponentsModule } from '../../src/app/components/components.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        PagesModule,
        ComponentsModule,
      ],
      providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    })
  );

  test('Should create the app.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Should preserve the layout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toMatchSnapshot();
  });
});
