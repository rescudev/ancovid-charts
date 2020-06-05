import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  var orientation = (screen.orientation || {}).type;

  if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
    window.location.href = "http://localhost:4200/assets/rotate.html";
  } else if (orientation === undefined) {
    console.log("The orientation API isn't supported in this browser :(");
  }

  window.addEventListener("orientationchange", function() {
    console.log("the orientation of the device is now " + screen.orientation.angle);
    if(screen.orientation.angle < 45){
      window.location.href = "http://localhost:4200/assets/rotate.html";
      console.log('aaa');
    }else{
      window.location.href = "http://localhost:4200/";
    }
  });
