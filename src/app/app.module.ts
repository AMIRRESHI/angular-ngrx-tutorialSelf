import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { TutorialsComponent } from './containers/tutorials/tutorials.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { environment } from 'environments/environment';

import * as fromStore from '@appStore/index';
import { TutorialService } from '@appServices/tutorial.service';
import { AppRoutingModule } from './app-routing.module';
import { TutorialDetailComponent } from '@appContainers/tutorial-detail/tutorial-detail.component';
import { DashboardComponent } from '@appContainers/dashboard/dashboard.component';
import { TutorialSearchComponent } from '@appComponents/tutorial-search/tutorial-search.component';
import { MessageService } from '@appServices/message.service';
import { MessagesComponent } from '@appComponents/messages/messages.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromStore.reducers),
    EffectsModule.forRoot(fromStore.effects),
    !environment.production
    ? StoreDevtoolsModule.instrument({ maxAge: 50 })
    : [],
  // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
  // and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    TutorialsComponent,
    TutorialDetailComponent,
    TutorialSearchComponent,
    MessagesComponent,
    TutorialSearchComponent
  ],
  
  providers: [ TutorialService, MessageService ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
