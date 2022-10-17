import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather';
  weatherData?:WeatherData;
  isDay:boolean=false;
  dayCondition:string='';
  cityName:string="Delhi";
  constructor(private appService:AppService){}
  ngOnInit(){
    this.getWeatherData(this.cityName);
    this.cityName="";
  }
  getNewData(){
      this.getWeatherData(this.cityName);
      this.cityName="";
  }
  private getWeatherData(cityName:string){
    this.appService.getWeatherData(cityName).subscribe({
      next:(response)=>{
        this.weatherData=response;
        if(response.current.is_day==0){
          this.isDay=false;
        } else{
          this.isDay=true;
        }
        this.dayCondition=this.weatherData.current.condition.text.toLowerCase();
        if(this.dayCondition.includes('mist')){
          this.dayCondition ="mist";
        }
        else if(this.dayCondition.includes('clear')){
          this.dayCondition ="clear";
        }
        else if(this.dayCondition.includes('cloudy')){
          this.dayCondition ="cloudy";
        }
        else if(this.dayCondition.includes('rain')){
          this.dayCondition ="rain";
        }
        else if(this.dayCondition.includes('rain')&&this.isDay){
          this.dayCondition ="rain-night";
        }
        else if(this.dayCondition.includes('snow')){
          this.dayCondition ="snow";
        }
        else if(this.dayCondition.includes('thunderstorm')){
          this.dayCondition ="thunderstorm";
        }
      }
    })
  }
}
