import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';  // Import the AppRoutingModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Add AppRoutingModule here
    HttpClientModule,
    IonicModule.forRoot()  // Ensure IonicModule is correctly imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }